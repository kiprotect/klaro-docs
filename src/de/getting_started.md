
# Erste Schritte

<div class="message is-info">
    <div class="message-body">
        Dieses Dokument beschreibt den Setup-Prozess für die
Open-Source-Version von Klaro. Um mit der gehosteten Version zu beginnen, melden Sie sich einfach <a href="https://kiprotect.com/klaro/prices">für ein Paket</a> an und folgen Sie den Anweisungen des Installationsassistenten (es ist ganz einfach).
    </div>
</div>

Die Einrichtung von Klaro auf Ihrer Website ist einfach und dauert in der Regel weniger als 10 Minuten. Alles, was Sie tun müssen, ist eine kleine Konfigurationsdatei zu schreiben, das <code>klaro.js</code> Skript zu laden und ein paar kleine Änderungen an den Skripten von Drittanbietern auf Ihrer Seite vorzunehmen, damit Klaro diese verwalten kann. **Fangen wir also an!**

### 1. Schreiben Sie die Konfigurationsdatei

<aside>
    <div class="highlight">
        {%filter highlight(strip=True, language='javascript')%}
            window.klaroConfig = {
                apps : [...],
            }
        {%endfilter%}
    </div>
</aside>


Zuerst müssen Sie Klaro über die Apps und Tracker von Drittanbietern auf Ihrer Website informieren. Um dies zu tun, schreiben Sie eine einfache Javascript-Konfiguration. Am einfachsten beginnen Sie, indem Sie sich die [kommentierte Klaro-Konfigurationsdatei]({{'annotated-config'|href}}) ansehen, die so gestaltet ist, dass sie selbsterklärend ist. Weitere Beispiele finden Sie auf der Klaro [Github-Seite](https://github.com/KIProtect/klaro/blob/master/dist/configs/).

### 2. Ändern Sie Ihre Skripts von Drittanbietern

<aside>
    <div class="highlight">
        {%filter highlight(strip=True, language='html')%}
            <script type="text/plain"
            data-type="application/javascript"
            data-name="google-analytics">
            //...
            </script>

            # External scripts and resources (img, link, ...):
            <script type="text/plain"
            data-type="application/javascript"
            data-src="https://analytics.7scientists.com/matomo.js"
            data-name="matomo">
            </script>
        {%endfilter%}
    </div>
</aside>


Um sicherzustellen, dass keine Skripte Dritter ohne Zustimmung geladen werden, müssen Sie Ihren HTML-Code ein wenig modifizieren: Ersetzen Sie bei Inline-Skripten den Wert des <code>type</code> Attributs durch (dies <code>text/plain</code> verhindert, dass der Browser das Skript ausführt) und fügen Sie ein Datenattribut mit dem ursprünglichen Typ hinzu, z.B. <code>data-type="application/javascript"</code>. Fügen Sie auch ein <code>data-name</code> Attribut hinzu, das dem Namen der gegebenen Anwendung in Ihrer Konfiguration entspricht, z.B. <code>data-name="googleAnalytics"</code>.

Für externe Skripte tun Sie dasselbe, benennen Sie das <code>src</code> Attribut jedoch zusätzlich um in (dies <code>data-src</code> stellt sicher, dass der Browser das Skript nicht ohne die Zustimmung des Benutzers lädt). Dies funktioniert auch für andere Tags wie Bilder oder Zählpixel. Denken Sie nur daran, immer ein <code>data-name</code> Attribut hinzuzufügen, das mit dem Namen der Anwendung in Ihrer Konfiguration übereinstimmt, damit Klaro weiß, welches Element zu welcher Anwendung gehört.

### 3. Laden Sie die Konfiguration und das Skript

<aside>
    <div class="highlight">
        {%filter highlight(strip=True, language='html')%}
            <script defer type="application/javascript"
            src="config.js"></script>
            <script 
                defer
                data-config="klaroConfig"
                type="application/javascript"
                src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js">
            </script>
        {%endfilter%}
    </div>
</aside>


Fügen Sie schließlich sowohl das Konfigurationsskript als auch den Klaro-Code auf Ihrer Seite ein. Sie können das Laden der Skripte verzögern, wenn Sie möchten. Stellen Sie nur sicher, dass die Konfiguration initialisiert ist, wenn Klaro geladen wird. Schauen Sie sich unsere <a href="https://github.com/kiprotect/klaro/tree/master/examples">Beispiele</a> an, um sich inspirieren zu lassen.

Wir bieten auch eine Version von Klaro ohne Stile an, was praktisch ist, falls Sie unsere eigene Version mitbringen oder unsere anpassen möchten. Laden Sie einfach <a href="https://cdn.kiprotect.com/klaro/v0.7/klaro-no-css.js" download>klaro-no-css.js</a> und das Mini-Stylesheet <a href="https://cdn.kiprotect.com/klaro/v0.7/klaro.min.css" download>klaro.min.css</a> herunter und fügen Sie beide in Ihr HTML ein. Wir haben auch ein unminifiziertes Stylesheet <a href="https://cdn.kiprotect.com/klaro/v0.7/klaro.css" download>klaro.css</a>, das sich hervorragend eignet, wenn Sie Änderungen daran vornehmen möchten. Sie können sich auch die <a href="https://github.com/KIProtect/klaro/blob/master/src/scss/klaro.scss">SCSS-Datei</a> ansehen.

Wenn Sie Klaro selbst aufnehmen möchten, können Sie es hier herunterladen.

<div style="display:inline-block">
    <a id="versionLink" href="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"
download class="button is-medium is-warning">
        klaro.js herunterladen
    </a>
    <div class="select">
        <select onChange="versionLink.href='https://cdn.kiprotect.com/klaro/'+versionSelect.value+'/klaro.js'"
id="versionSelect" class="select" name="klaro-version">
        </select>
    </div>
</div>

### Probleme, Fragen, Anregungen?

Wenn Sie bei der Einrichtung von Klaro auf Schwierigkeiten stoßen oder wenn Sie eine neue Funktion vorschlagen oder einen Fehler melden möchten, <a href="https://github.com/kiprotect/klaro/issues">öffnen Sie</a> bitte <a href="https://github.com/kiprotect/klaro/issues">eine Github-<tr-ignore>Issue</tr-ignore></a> oder setzen <a href="mailto:klaro@kiprotect.com">Sie</a> sich mit uns in Verbindung, wir freuen uns, von Ihnen zu hören!

<script>
    window.addEventListener("DOMContentLoaded", function(e){
        // we download the version list from the CDN
        var request = new XMLHttpRequest();
        request.addEventListener("load", function(e){
            var versions = JSON.parse(e.target.response).sort(function(a,b){
                var regex = /^v(\d+)\.(\d+)(?:\.(\d+))?$/
                var matchA = regex.exec(a.name);
                var matchB = regex.exec(b.name);
                if (matchA === null || matchB === null)
                    return 0;
                var dMajor = parseInt(matchA[1]) - parseInt(matchB[1])
                if (dMajor != 0)
                    return -dMajor;
                var dMinor = parseInt(matchA[2]) - parseInt(matchB[2])
                if (dMinor != 0)
                    return -dMinor;
                if (matchA[3] !== undefined && matchB[3] !== undefined){
                    var dPatch = parseInt(matchA[3]) - parseInt(matchB[3])
                    if (dPatch != 0)
                        return -dPatch;                    
                }
                return 0;
            });
            for(var i=0;i<versions.length;i++){
                var option = document.createElement('option', {value: versions[i].name});
                option.innerHTML = versions[i].name;
                versionSelect.appendChild(option);
            }
        });
        request.open("GET", "https://cdn.kiprotect.com/klaro");
        request.send();

    })
</script>


