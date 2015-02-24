<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{% block title %}{% if devMode %}(local) {% endif %}{% endblock %}</title>
    {% block meta %}{% endblock %}
    <meta name="viewport" content="{% block meta-viewport %}width=device-width, initial-scale=1.0{% endblock %}">
    {% block styles %}{% endblock %}
    {% block styles-secondary %}{% endblock %}
    {% block scripts-head %}{% endblock %}
    {% block scripts-head-secondary %}{% endblock %}
</head>
<body class="{% block body-classname %}{% endblock %}">
{% block content %}{% endblock %}
{% block scripts-body %}{% endblock %}
</body>
</html>