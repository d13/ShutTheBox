{% extends '../layouts/raw.swig' %}

{% block content %}
<h1>{{message}}</h1>
<h2>{{error.status}}</h2>
<pre>
    {% autoescape false %}{{error.stack}}{% endautoescape %}
</pre>
{% endblock %}
