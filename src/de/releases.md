# Klaro Veröffentlichungen

Diese Seite enthält Versionsinformationen, die aus der [Veröffentlichungsdatei](https://github.com/kiprotect/klaro/blob/master/releases.yml) auf Github geparst wurden. Sie wird automatisch generiert und wir versuchen, sie immer auf dem neuesten Stand zu halten, bitte schauen Sie auch auf unserer Github-Seite nach, um Informationen über neue Versionen zu erhalten.

{% if lang not in ('en', 'de') %}
**Bitte beachten Sie** : Die Versionszusammenfassung ist derzeit nur auf Englisch und Deutsch verfügbar. Wir entschuldigen uns für etwaige Unannehmlichkeiten. Wenn Sie Hilfe beim Verständnis einer bestimmten Version benötigen, [kontaktieren Sie uns](mailto:klaro@kiprotect.com) bitte.
{% endif %}

<hr />

{% for release in page.releases%}<a href="#{{release.version}}">{{release.version}}</a>{% if not loop.last %} // {% endif %}{% endfor %}


<hr />

{% for release in page.releases %}


<h2>
    v{{release.version}} <a id="{{release.version}}"></a>
    {% if release.tags %}
        {% set tagClasses = {"breaking-changes" : "danger", "feature-update" : "success", "security-update": "warning"} %}
        {% for tag in release.tags %}<span class="tag is-{{tagClasses[tag] or 'primary'}}">{{tag}}</span> {%endfor%}
    {% endif %}
</h2>



Veröffentlicht am **{{release.date}}**.

#### Änderungen

<div class="box">
    {{(release.changelog[lang] or release.changelog.en)|markdown}}
</div>

{% endfor %}


