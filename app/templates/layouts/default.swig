{% extends './base.swig' %}

{% block title %}{% parent %}{{title}}{% endblock %}

{% block styles %}
    <link rel="stylesheet" href="/styles/css/site.css" />
{% endblock %}