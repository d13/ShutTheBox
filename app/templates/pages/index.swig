{% extends '../layouts/default.swig' %}

{% block content %}
{% endblock %}

{% block scripts-body %}
    <!--  envMode: {{envMode}} -->
    {% if envMode === 'development' %}
        <script data-main="/scripts/app/main" src="/scripts/libs/require/require-2.1.16.js"></script>
    {% else %}
        <script data-main="/scripts/app/main-built" src="/scripts/libs/require/require-2.1.16.js"></script>
    {% endif %}
{% endblock %}
