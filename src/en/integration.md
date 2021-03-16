# Integrating Klaro

There are several ways to integrate Klaro with your website, which we explain in the following paragraphs.

## Deferred Loading


To load Klaro in a deferred way, you add a script tag of the following form to your website:

<div class="highlight">
    {%filter highlight(strip=True, language='html')%}
        <script defer src=".../klaro.js"></script>
    {%endfilter%}
</div>

This will cause the browser to download the Klaro script in the background and only execute it after the remaining page has been parsed and loaded. This loading mode is the preferred way to integrate Klaro as it won't cause any delays on your page, regardless of how long it takes the script to load. Furthermore, all deferred scripts are executed in the original order in which they appear in the source code of your page (contrary to e.g. asynchronous scripts, which can be executed in arbitrary order). This makes it possible to load multiples scripts like your Klaro config file and main script in a deferred way and still be sure that they will be executed in the right order. 

## Synchronous Loading

To load Klaro synchronously, you add a script tag of the following form to your website:

<div class="highlight">
    {%filter highlight(strip=True, language='html')%}
        <script src=".../klaro.js"></script>
    {%endfilter%}
</div>

This will cause the browser to pause the parsing of the remaining page until the script has been loaded and executed. In general, we do not recommend embedding Klaro like this as it will cause a loading delay of around 50-100 ms. However, if you want to use Klaro to manage third-party services without modifying their code on your site (which we do not recommend either but which can be necessary) you should load Klaro synchronously to ensure it can properly intercept these scripts (if that's possible given the browser environment).

## Asynchronous Loading

To load Klaro asynchronously, you add a script tag of the following form to your website:

<div class="highlight">
    {%filter highlight(strip=True, language='html')%}
        <script async src=".../klaro.js"></script>
    {%endfilter%}
</div>

This will cause the browser to continue loading the remaining page while fetching the Klaro script in the background. It will then execute the script as soon as it is loaded (which can happen at any time during or after the parsing of the remaining page). If you use this kind of integration you need to ensure that all scripts which depend on the Klaro script only execute after the script has been loaded, e.g. by using the `onload` event handler on the script. Asynchronous loading can be advantageous as it can reduce the delay in displaying the consent notice to the user, although deferred loading of the Klaro script normally also only incurs a small, nearly impercetible delay.