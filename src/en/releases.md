# Klaro Releases

This page contains release information parsed from the [release file](https://github.com/kiprotect/klaro/blob/master/releases.yml) on Github.It is generated automatically and we always try to keep it up to date, please also look at our Github page to check for information about new releases though.

{% if lang not in ('en', 'de') %}
**Please note**: The release summary is currently only available in English and German. We apologize for any inconvenience. If you need help understanding a particular release, please [contact us](mailto:klaro@kiprotect.com).
{% endif %}

<hr />

<!--translate:ignore-->
{% for release in page.releases%}<a href="#{{release.version}}">{{release.version}}</a>{% if not loop.last %} // {% endif %}{% endfor %}
<!--translate:ignore-->

<hr />

<!--translate:ignore-->
{% for release in page.releases %}
<!--translate:ignore-->

<!--translate:ignore-->
<h2>
    v{{release.version}} <a id="{{release.version}}"></a>
    {% if release.tags %}
        {% set tagClasses = {"breaking-changes" : "danger", "feature-update" : "success", "security-update": "warning"} %}
        {% for tag in release.tags %}<span class="tag is-{{tagClasses[tag] or 'primary'}}">{{tag}}</span> {%endfor%}
    {% endif %}
</h2>
<!--translate:ignore-->


Published on **{{release.date}}**.

#### Changes

<!--translate:ignore-->
<div class="box">
    {{(release.changelog[lang] or release.changelog.en)|markdown}}
</div>

{% endfor %}
<!--translate:ignore-->
