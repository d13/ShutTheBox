define(['underscore','app','backbone', 'models/boxItem'], function(_, App, Backbone, BoxItemModel) {
    var statics = {
        getValues: function(models) {
            var values = _.map(models, function(model) {
                return model.get('value');
            });
            return values;
        },
        addAll: function(arr) {
            return (_.reduce(arr, function(sum, n) {
                return sum + n;
            })) || 0;
        },
        getNumberData: function(models) {
            var numbers = this.getValues(models);
            var total = this.addAll(numbers);
            return {
                numbers: numbers,
                total: total
            };
        },
        filterNumbersThatSum: function(list, sum) {
            var results = [];

            var me = this;
            var listRecurse = function (numList, partial) {
                partial || (partial = []);

                if (partial.length) {
                    var total = me.addAll(partial);

                    if (total === sum) {
                        results = _.union(results, partial);
                    } else if (total > sum) {
                        return;
                    }
                }

                var numLen = numList.length;
                for (var i = 0; i < numLen; i++) {
                    var num = numList[i];

                    var remaining = numList.slice(i + 1);

                    var partialCopy = partial.slice();
                    partialCopy.push(num);
                    listRecurse(remaining, partialCopy);
                }
            };

            listRecurse(list);

            return results;
        }
    };
    var BoxItems = Backbone.Collection.extend({
        model: BoxItemModel,
        initialize: function() {

            this.scoreToMatch = 0;
            this.diceRolled = false;

            this.listenTo(App.vent, 'game:dice:rolled', this.onDiceRolled);
            this.listenTo(this, 'change:mode', this.onNumberModeChanged);
            this.listenTo(App.vent, 'game:turn:end', this.onTurnEnd);
        },
        onDiceRolled: function(data) {
            this.scoreToMatch = data.total;
            this.updateNumberState();
            this.diceRolled = true;

            var selectedNumbers = this.getSelectedNumbers();
            var selectedTotal = selectedNumbers.total;
            var validNumbers = this.filterChoosableNumbers(this.scoreToMatch);
            if (!validNumbers.length) {
                var remainingNumbers = this.getRemainingNumbers();
                App.vent.trigger('game:player:done', {
                    score: remainingNumbers.total,
                    brokeBox: !remainingNumbers.numbers.length
                });
            }
        },
        onNumberModeChanged: function() {
            if (!this.diceRolled) {
                return;
            }
            var pendingNumbers = this.getPendingNumbers();
            var pendingTotal = pendingNumbers.total;

            var matchDiff = this.scoreToMatch - pendingTotal;

            var validNumbers = this.filterChoosableNumbers(matchDiff);

            this.updateNumberState(validNumbers);

            var remainingNumbers = this.getRemainingNumbers();
            var data = {
                validNumbers: validNumbers,
                remainingNumbers: remainingNumbers.numbers,
                remainingTotal: remainingNumbers.total,
                scoreToMatch: this.scoreToMatch,
                matchDiff: matchDiff,
                isMatched: (matchDiff === 0)
            };
            App.vent.trigger('game:turn:state:changed', data);

            if (!remainingNumbers.numbers.length || (!data.isMatched && remainingNumbers.numbers.length && !validNumbers.length)) {
                App.vent.trigger('game:player:done', {
                    score: remainingNumbers.total,
                    brokeBox: !remainingNumbers.numbers.length
                });
            }
        },
        onTurnEnd: function() {
            this.diceRolled = false;
            this.commitSelections();
        },

        commitSelections: function() {
            _.each(this.models, function(model) {
                var mode = model.get('mode');
                if (mode === 'selected') {
                    return;
                }
                if (mode === 'pending') {
                    model.set({
                        mode: 'selected'
                    });
                } else {
                    model.set('mode', 'default');
                }
            });
        },
        updateNumberState: function(validNumbers) {
            validNumbers || (validNumbers = this.filterChoosableNumbers());

            _.each(this.models, function(model) {
                var mode = model.get('mode');
                if (mode === 'selected' || mode === 'pending') {
                    return;
                }
                var value = model.get('value');
                if (_.contains(validNumbers, value)) {
                    model.set('mode', 'selectable');
                } else {
                    model.set('mode', 'default');
                }
            });

        },
        getSelectedNumbers: function() {
            var models = this.where({ mode: 'selected' });

            return statics.getNumberData(models);
        },
        getPendingNumbers: function() {
            var models = this.where({ mode: 'pending' });

            return statics.getNumberData(models);
        },
        getUnselectedNumbers: function() {
            var models = this.reject({ mode: 'selected' });

            return statics.getNumberData(models);
        },
        getRemainingNumbers: function() {
            var models = this.filter(function(model) {
                var mode = model.get('mode');
                return mode === 'selectable' || mode === 'default';
            });

            return statics.getNumberData(models);
        },
        filterChoosableNumbers: function(toMatch) {
            if (toMatch === undefined) {
                toMatch = this.scoreToMatch;
            }

            var numbers = this.getRemainingNumbers().numbers;
            return statics.filterNumbersThatSum(numbers, toMatch);
        }
    });

    return BoxItems;
});