# Google Tag Manager (GTM)

<div class="message is-warning">
    <div class="message-body">
        This functionality is still under active development and will likely evolve.
    </div>
</div>

<div class="message is-info">
    <div class="message-body">
        If you're using the hosted version of Klaro, GTM support can be automatically enabled by adding the "Google Tag Manager" service to your configuration via the "Configs" tab or setup wizard. You will still need to create the required event trigger in the GTM web UI, however.
    </div>
</div>

This tutorial explains how you can integrate Klaro with Google Tag Manager (GTM) to manage consent for services that are manged within GTM. The consent notice you see below controls an example GTM installation that manages a Google Analytics Tag. Klaro can fully manage GTM tags and also support Google's new "Consent Mode". As an example, the consent notice below controls a GTM tag that's installed on this site, which will load a Google Analytics tag when loaded, but only if you accepted the use of Google Analytics via Klaro.

<!--translate:ignore-->
<div id="klaroTutorial">
</div>
<!--translate:ignore-->


<!--translate:ignore-->
    <script data-type="application/javascript" type="text/plain" data-name="google-tag-manager">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MZTF9XR');</script>
    <noscript><iframe data-name="google-tag-manager" data-src="https://www.googletagmanager.com/ns.html?id=GTM-MZTF9XR"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
<!--translate:ignore-->

## Example

Let's assume we want to use GTM to embed a Google Analytics tag in our website. To do that, we first include the GTM on our website, modifying it so that it can be managed by Klaro.

<!--translate:ignore-->
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
<!--translate:ignore-->

Then, we create a Google Analytics tag in the GTM web UI. As a trigger, we create a custom event trigger [^1] with name `klaro-google-analytics-accepted`. This ensures that GTM will only load Google Analytics if the user has granted consent for it via Klaro. And that's it! Klaro will now manage GTM and ensure that it only loads services for which the user has given consent via Klaro. **Important:** To add another service via GTM, first add it to your Klaro config and then simply define a custom event trigger of the form `klaro-[service-name]-accepted`, where `[service-name]` is the name of the service in the Klaro config.

[^1]: [https://support.google.com/tagmanager/answer/7679219?hl={{lang}}](https://support.google.com/tagmanager/answer/7679219?hl={{lang}})

<!--translate:ignore-->
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
<!--translate:ignore-->

## Example Config

Here's the example Klaro config that we've used on this page. We define a "Google Tag Manager" service as well as a "Google Analytics" service. The different event handlers (`onInit`, `onAccept`, `onDecline`) take care of telling GTM about the consent choices the user has made, which in turn enables GTM to load the corresponding tags.

<!--translate:ignore-->
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
<!--translate:ignore-->
