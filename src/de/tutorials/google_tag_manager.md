# Google Tag Manager (GTM)

<div class="message is-warning">
    <div class="message-body">
        Diese Funktionalität befindet sich noch in aktiver
Entwicklung und wird sich wahrscheinlich weiterentwickeln.
    </div>
</div>

<div class="message is-info">
    <div class="message-body">
        Wenn Sie die gehostete Version von Klaro verwenden,
kann die GTM-Unterstützung automatisch aktiviert werden, indem Sie den Dienst "Google Tag Manager" über die Registerkarte "Konfigurationen" oder den Einrichtungsassistenten zu Ihrer Konfiguration hinzufügen. Sie müssen jedoch weiterhin den erforderlichen Ereignisauslöser in der GTM-Web-Benutzeroberfläche erstellen.
    </div>
</div>

Diese Anleitung erklärt, wie Sie Klaro in den Google Tag Manager (GTM) integrieren können, um die Zustimmung für Dienste zu verwalten, die innerhalb des GTM verwaltet werden. Die Einverständniserklärung, die Sie unten sehen, steuert eine Beispiel-GTM-Installation, die einen Google Analytics-Tag verwaltet. Klaro kann GTM-Tags vollständig verwalten und unterstützt auch den neuen "Zustimmungsmodus" von Google. Beispielsweise steuert die unten stehende Einverständniserklärung einen GTM-Tag, der auf dieser Website installiert ist und beim Laden einen Google Analytics-Tag lädt, aber nur, wenn Sie die Verwendung von Google Analytics über Klaro akzeptiert haben.

<div id="klaroTutorial">
</div>



    <script data-type="application/javascript" type="text/plain" data-name="google-tag-manager">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MZTF9XR');</script>
    <noscript><iframe data-name="google-tag-manager" data-src="https://www.googletagmanager.com/ns.html?id=GTM-MZTF9XR"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->


## Beispiel

Nehmen wir an, wir möchten GTM verwenden, um ein Google Analytics-Tag in unsere Website einzubetten. Dazu binden wir zunächst den GTM in unsere Website ein und modifizieren ihn so, dass er von Klaro verwaltet werden kann.

<div class="highlight">
    {%filter highlight(strip=True, language='html')%}
    <head>
        ...
        <!-- Google Tag Manager -->
        <script data-type="application/javascript" type="text/plain" data-name="google-tag-manager">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MZTF9XR');</script>
        <!-- End Google Tag Manager -->
    </head>
    <body>
         <!-- Google Tag Manager (noscript) -->
        <noscript><iframe data-name="google-tag-manager" data-src="https://www.googletagmanager.com/ns.html?id=GTM-MZTF9XR"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        ...
    </body>
    {%endfilter%}
</div>


Dann erstellen wir ein Google Analytics-Tag in der GTM-Web-Benutzeroberfläche. Als Trigger erstellen wir einen benutzerdefinierten Ereignis-Trigger [^1] mit dem Namen `klaro-google-analytics-accepted`. Dadurch wird sichergestellt, dass GTM Google Analytics nur dann lädt, wenn der Benutzer über Klaro seine Zustimmung dazu erteilt hat. Und das ist alles! Klaro wird nun GTM verwalten und sicherstellen, dass GTM nur Dienste lädt, für die der Benutzer seine Zustimmung über Klaro erteilt hat. **Wichtig:** Um einen weiteren Dienst über GTM hinzuzufügen, fügen Sie ihn zuerst Ihrer Klaro-Konfiguration hinzu und definieren Sie dann einfach einen benutzerdefinierten Ereignisauslöser des Formulars `klaro-[service-name] -accepted`, wo `[service-name]` ist der Name des Dienstes in der Klaro-Konfiguration.

[^1:] [https://support.google.com/tagmanager/answer/7679219?hl=](https://support.google.com/tagmanager/answer/7679219?hl={{lang}}) [{{lang}}](https://support.google.com/tagmanager/answer/7679219?hl={{lang}})

<script>
    var tutorialConfig = {
        storageMethod: 'test',
        embedded: true,
        elementID: 'klaroTutorial',
        acceptAll: true,
        services: [
            {
                name: 'google-tag-manager',
                purposes: ['marketing'],
                onAccept: `
                    // we notify the tag manager about all services that were accepted. You can define
                    // a custom event in GTM to load the service if consent was given.
                    for(let k of Object.keys(opts.consents)){
                        if (opts.consents[k]){
                            let eventName = 'klaro-'+k+'-accepted'
                            dataLayer.push({'event': eventName})
                        }
                    }
                    // if consent for Google Analytics was granted we enable analytics storage
                    if (opts.consents[opts.vars.googleAnalyticsName || 'google-analytics']){
                        console.log("Google analytics usage was granted")
                        gtag('consent', 'update', {'analytics_storage': 'granted'})
                    }
                    // if consent for Google Ads was granted we enable ad storage
                    if (opts.consents[opts.vars.adStorageName || 'google-ads']){
                        console.log("Google ads usage was granted")
                        gtag('consent', 'update', {'ad_storage': 'granted'})
                    }
                `,
                onInit: `
                    // initialization code here (will be executed only once per page-load)
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = function(){dataLayer.push(arguments)}
                    gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'})
                    gtag('set', 'ads_data_redaction', true)
                `,
                onDecline: `
                    // initialization code here (will be executed only once per page-load)
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = function(){dataLayer.push(arguments)}
                    gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'})
                    gtag('set', 'ads_data_redaction', true)
                `,
                vars: {
                    googleAnalytics: 'google-analytics'
                }
            },
            {
                // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
                name: 'google-analytics',
                cookies: [
                    /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
                ],
                purposes: ['marketing'],
            }
        ]
    }
    window.addEventListener("DOMContentLoaded", function(e){
        klaro.show(tutorialConfig)
    })
</script>


## Beispiel Config

Hier ist die Beispiel-Klaro-Konfiguration, die wir auf dieser Seite verwendet haben. Wir definieren sowohl einen "Google Tag Manager"-Dienst als auch einen "Google Analytics"-Dienst. Die verschiedenen Event-Handler (`onInit`, `onAccept`, `onDecline`) sorgen dafür, dass GTM über die vom Benutzer getroffenen Zustimmungsentscheidungen informiert wird, was wiederum GTM in die Lage versetzt, die entsprechenden Tags zu laden.

<div class="highlight">
    {%filter highlight(strip=True, language='javascript')%}
        var klarConfig = {
            acceptAll: true,
            services: [
                {
                    name: 'google-tag-manager',
                    purposes: ['marketing'],
                    onAccept: `
                        // we notify the tag manager about all services that were accepted. You can define
                        // a custom event in GTM to load the service if consent was given.
                        for(let k of Object.keys(opts.consents)){
                            if (opts.consents[k]){
                                let eventName = 'klaro-'+k+'-accepted'
                                dataLayer.push({'event': eventName})
                            }
                        }
                        // if consent for Google Analytics was granted we enable analytics storage
                        if (opts.consents[opts.vars.googleAnalyticsName || 'google-analytics']){
                            console.log("Google analytics usage was granted")
                            gtag('consent', 'update', {'analytics_storage': 'granted'})
                        }
                        // if consent for Google Ads was granted we enable ad storage
                        if (opts.consents[opts.vars.adStorageName || 'google-ads']){
                            console.log("Google ads usage was granted")
                            gtag('consent', 'update', {'ad_storage': 'granted'})
                        }
                    `,
                    onInit: `
                        // initialization code here (will be executed only once per page-load)
                        window.dataLayer = window.dataLayer || [];
                        window.gtag = function(){dataLayer.push(arguments)}
                        gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'})
                        gtag('set', 'ads_data_redaction', true)
                    `,
                    onDecline: `
                        // initialization code here (will be executed only once per page-load)
                        window.dataLayer = window.dataLayer || [];
                        window.gtag = function(){dataLayer.push(arguments)}
                        gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'})
                        gtag('set', 'ads_data_redaction', true)
                    `,
                    vars: {
                        googleAnalytics: 'google-analytics'
                    }
                },
                {
                    // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
                    name: 'google-analytics',
                    purposes: ['marketing'],
                    cookies: [
                        /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
                    ],
                }
            ]
        }
    {%endfilter%}
</div>


