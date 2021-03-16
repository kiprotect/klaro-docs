# Contextual Consent

This tutorial explains how to use Klaro's "contextual consent" feature, which enables you to ask for the users' consent before showing e.g. embedded Youtube videos or other content. The consent notice you see on this page demonstrates how this mechanism works. You can test the consent mechanism and simply reload the page to reset the state of the consent manager. Here's the consent manager (make sure to check out the examples below before before interacting with it):

<!--translate:ignore-->
<div id="klaroTutorial">
</div>
<!--translate:ignore-->


## Example: Let's Rick Roll!

Let's assume we want to embed a Youtube video in our website. We can do this by embedding the `iframe` code shown below / on the right. To enable the contextual consent, we simply replace
the `src` attribute with `data-src` and add a `data-name` attribute. In addition, we also create a service with the same name in our config file (see config below), and Klaro will do the rest. Let's roll!

<!--translate:ignore-->
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
<!--translate:ignore-->

<!--translate:ignore-->
<iframe width="560" height="315" data-name="demo-youtube" data-id="rick-astley" data-src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!--translate:ignore-->

## Example: Let's tweet!

The same technique works with other HTML elements like `div`s: Simply add a `data-name` entry to the element, add a corresponding service with the same name to your config, and let Klaro add a placeholder.

<!--translate:ignore-->
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
<!--translate:ignore-->

<!--translate:ignore-->
<div data-name="demo-twitter">
    <a href="https://twitter.com/kiprotect?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @kiprotect</a>
</div>
<script data-type="application/javascript" async data-name="demo-twitter" data-src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<!--translate:ignore-->

<!--translate:ignore-->
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
<!--translate:ignore-->

## Example Config

Here's the corresponding example Klaro config. We used the "Accept All" flow but exempted the embedded Youtube content from it by setting `contextualConsentOnly` to `true`. Contrary to that, Twitter links will be automatically enabled when the user grants consent via the consent notice. 

<!--translate:ignore-->
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
<!--translate:ignore-->
