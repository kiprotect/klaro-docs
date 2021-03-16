# Kontextuelle Zustimmung

In diesem Lernprogramm wird die Verwendung von Klaros "kontextbezogener Zustimmung" erläutert, mit der Sie die Zustimmung der Benutzer einholen können, bevor Sie z.B. eingebettete Youtube-Videos oder andere Inhalte zeigen. Die Einverständniserklärung, die Sie auf dieser Seite sehen, zeigt, wie dieser Mechanismus funktioniert. Sie können den Zustimmungsmechanismus testen und die Seite einfach neu laden, um den Status des Zustimmungsmanagers zurückzusetzen. Hier ist der Zustimmungsmanager (sehen Sie sich unbedingt die folgenden Beispiele an, bevor Sie mit ihm interagieren):

<div id="klaroTutorial">
</div>



## Beispiel: Lass uns Rick Roll machen!

Nehmen wir an, wir möchten ein Youtube-Video in unsere Website einbetten. Dies können wir tun, indem wir den unten / rechts gezeigten Code `iframe` einbetten. Um die kontextbezogene Zustimmung zu ermöglichen, ersetzen wir einfach
das `src` -Attribut mit `data-src` und fügen Sie ein `data-name` -Attribut hinzu. Darüber hinaus erstellen wir auch einen Dienst mit demselben Namen in unserer Konfigurationsdatei (siehe Konfiguration unten), und Klaro erledigt den Rest. Los geht's!

<aside>
    <div class="highlight">
        {%filter highlight(strip=True, language='html')%}
            <iframe
                width="560"
                height="315"
                data-name="demo-youtube"
                data-src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameborder="0"
                allow="accelerometer;
                       autoplay;
                       clipboard-write;
                       encrypted-media;
                       gyroscope;
                       picture-in-picture"
                allowfullscreen>
            </iframe>
        {%endfilter%}
    </div>
</aside>


<iframe width="560" height="315" data-name="demo-youtube" data-id="rick-astley" data-src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Beispiel: Lasst uns twittern!

Dieselbe Technik funktioniert auch mit anderen HTML-Elementen wie `div` s: Fügen Sie einfach einen Eintrag `data-name` zu dem Element hinzu, fügen Sie einen entsprechenden Dienst mit dem gleichen Namen zu Ihrer Konfiguration hinzu und lassen Sie Klaro einen Platzhalter hinzufügen.

<aside>
    <div class="highlight">
        {%filter highlight(strip=True, language='html')%}
            <div data-name="demo-twitter">
                <a
                href="https://twitter.com/kiprotect?ref_src=twsrc%5Etfw"
                class="twitter-follow-button"
                data-show-count="false">Follow @kiprotect</a>
            </div>
            <script
                data-type="application/javascript"
                async
                data-name="demo-twitter"
                data-src="https://platform.twitter.com/widgets.js"
                charset="utf-8">
            </script>
        {%endfilter%}
    </div>
</aside>


<div data-name="demo-twitter">
    <a href="https://twitter.com/kiprotect?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @kiprotect</a>
</div>
<script data-type="application/javascript" async data-name="demo-twitter" data-src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


<script>
    var tutorialConfig = {
        storageMethod: 'test',
        embedded: true,
        elementID: 'klaroTutorial',
        acceptAll: true,
        services: [
            {
                purposes: ['marketing'],
                name: "demo-youtube",
                contextualConsentOnly: true,
            },
            {
                purposes: ['marketing'],
                name: "demo-twitter",
            }
        ]
    }
    window.addEventListener("DOMContentLoaded", function(e){
        klaro.show(tutorialConfig)
    })
</script>


## Beispiel Config

Hier ist die entsprechende Beispiel-Klaro-Konfiguration. Wir haben den "Accept All"-Fluss verwendet, aber den eingebetteten Youtube-Inhalt davon ausgenommen, indem wir `contextualConsentOnly` auf `true` setzen. Im Gegensatz dazu werden Twitter-Links automatisch aktiviert, wenn der Benutzer über die Einverständniserklärung seine Zustimmung erteilt. 

<div class="highlight">
    {%filter highlight(strip=True, language='javascript')%}
        var klarConfig = {
            acceptAll: true,
            services: [
                {
                    purposes: ['marketing'],
                    name: "demo-youtube",
                    contextualConsentOnly: true,
                },
                {
                    purposes: ['marketing'],
                    name: "demo-twitter",
                }
            ]
        }
    {%endfilter%}
</div>


