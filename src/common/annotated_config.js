/*
{{'annotated-config.intro'|translate|wordwrap(80)}}
*/
var klaroConfig = {
    /*
    {{'annotated-config.testing'|translate|wordwrap(80)|indent(4)}}
    */
    testing: false,

    /*
    {{'annotated-config.elementID'|translate|wordwrap(80)|indent(4)}}
    */
    elementID: 'klaro',

    /*
    {{'annotated-config.storageMethod'|translate|wordwrap(80)|indent(4)}}
    */
    storageMethod: 'cookie',

    /*
    {{'annotated-config.storageName'|translate|wordwrap(80)|indent(4)}}
    */
    storageName: 'klaro',

    /*
    {{'annotated-config.htmlTexts'|translate|wordwrap(80)|indent(4)}}
    */
    htmlTexts: false,

    /*
    {{'annotated-config.cookieDomain'|translate|wordwrap(80)|indent(4)}}
    */
    cookieDomain: '.example.com',

    /*
    {{'annotated-config.cookieExpiresAfterDays'|translate|wordwrap(80)|indent(4)}}
    */
    cookieExpiresAfterDays: 30,

    /*
    {{'annotated-config.default'|translate|wordwrap(80)|indent(4)}}
    */
    default: false,

    /*
    {{'annotated-config.mustConsent'|translate|wordwrap(80)|indent(4)}}
    */
    mustConsent: false,

    /*
    {{'annotated-config.acceptAll'|translate|wordwrap(80)|indent(4)}}
    */
    acceptAll: true,

    /*
    {{'annotated-config.hideDeclineAll'|translate|wordwrap(80)|indent(4)}}
    */
    hideDeclineAll: false,

    /*
    {{'annotated-config.hideLearnMore'|translate|wordwrap(80)|indent(4)}}
    */
    hideLearnMore: false,

    /*
    {{'annotated-config.translations.intro'|translate|wordwrap(80)|indent(4)}}
    */
    translations: {
        /*
        {{'annotated-config.translations.zz'|translate|wordwrap(80)|indent(12)}}
        */
        zz: {
            privacyPolicyUrl: '/privacy',

        }
        de: {
            /*
            {{'annotated-config.privacyPolicy'|translate|wordwrap(80)|indent(12)}}
            */
            privacyPolicyUrl: '/datenschutz',
            consentNotice: {
                description: 'Dieser Text wird in der Einwilligungsbox erscheinen.',
            },
            consentModal: {
                description:
                    'Hier können Sie einsehen und anpassen, welche Information wir über Sie ' + 
                    'sammeln. Einträge die als "Beispiel" gekennzeichnet sind dienen lediglich ' + 
                    'zu Demonstrationszwecken und werden nicht wirklich verwendet.',
            },
            /*
            {{'annotated-config.translations.purposes'|translate|wordwrap(80)|indent(12)}}
            */
            purposes: {
                analytics: {
                    title: 'Besucher-Statistiken'
                },
                security: {
                    title: 'Sicherheit'
                },
                livechat: {
                    title: 'Live Chat'
                },
                advertising: {
                    title: 'Anzeigen von Werbung'
                },
                styling: {
                    title: 'Styling'
                },
            },
        },
        en: {
            privacyPolicyUrl: '/privacy',
            consentModal: {
                description:
                    'Here you can see and customize the information that we collect about you. ' + 
                    'Entries marked as "Example" are just for demonstration purposes and are not ' + 
                    'really used on this website.',
            },
            purposes: {
                analytics: {
                    title: 'Analytics'
                },
                security: {
                    title: 'Security'
                },
                livechat: {
                    title: 'Livechat'
                },
                advertising: {
                    title: 'Advertising'
                },
                styling: {
                    title: 'Styling'
                },
            },
        },
    },

    /*
    {{'annotated-config.services.intro'|translate|wordwrap(80)|indent(4)}}
    */
    services: [
        {

            /*
            {{'annotated-config.services.name'|translate|wordwrap(80)|indent(12)}}
            */
            name: 'matomo',

            /*
            {{'annotated-config.services.default'|translate|wordwrap(80)|indent(12)}}
            */
            default: true,

            /*
            {{'annotated-config.services.translations'|translate|wordwrap(80)|indent(12)}}
            */
            translations: {
                zz: {
                    title: 'Matomo/Piwik'
                },
                en: {
                    description: 'Matomo is a simple, self-hosted analytics service.'
                },
                de: {
                    description: 'Matomo ist ein einfacher, selbstgehosteter Analytics-Service.'
                },
            },
            /*
            {{'annotated-config.services.purposes'|translate|wordwrap(80)|indent(12)}}
            */
            purposes: ['analytics'],

            cookies: [
                /*
                {{'annotated-config.services.cookies.intro'|translate|wordwrap(80)|indent(16)}}
                */

                /*
                {{'annotated-config.services.cookies.fully-qualified'|translate|wordwrap(80)|indent(16)}}
                */
                [/^_pk_.*$/, '/', 'klaro.kiprotect.com'],

                /*
                {{'annotated-config.services.cookies.fully-qualified-2'|translate|wordwrap(80)|indent(16)}}
                */
                [/^_pk_.*$/, '/', 'localhost'],

                /*
                {{'annotated-config.services.cookies.simple'|translate|wordwrap(80)|indent(16)}}
                */
                'piwik_ignore',
            ],

            /*
            {{'annotated-config.services.callback'|translate|wordwrap(80)|indent(12)}}
            */
            callback: function(consent, service) {
                console.log(
                    'User consent for service ' + service.name + ': consent=' + consent
                );
            },

            /*
            {{'annotated-config.services.required'|translate|wordwrap(80)|indent(12)}}
            */
            required: false,

            /*
            {{'annotated-config.services.optOut'|translate|wordwrap(80)|indent(12)}}
            */
            optOut: false,

            /*
            {{'annotated-config.services.onlyOnce'|translate|wordwrap(80)|indent(12)}}
            */
            onlyOnce: true,
        },
        {
            name: 'youtube',
            /*
            {{'annotated-config.services.contextualConsentOnly'|translate|wordwrap(80)|indent(12)}}
            */
            contextualConsentOnly: true,
        },
    ],

    /*
    {{'annotated-config.callback'|translate|wordwrap(80)|indent(4)}}
    */
    callback: function(consent, service) {
        console.log(
            'User consent for service ' + service.name + ': consent=' + consent
        );
    },

};
