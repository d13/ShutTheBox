define(['../app', 'modernizr'], function(App, Modernizr) {


    Modernizr.addTest('mediaqueries', Modernizr.mq('only all'));


    return Modernizr;
});