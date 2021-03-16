
# Getting Started

<div class="message is-info">
    <div class="message-body">
        This document describes the setup process for the open-source version of Klaro. To get started with the hosted version, simply <a href="https://kiprotect.com/klaro/prices">sign up for a plan</a> and follow the instructions given by the installation wizard (it's easy).
    </div>
</div>

Setting up Klaro on your website is easy and usually takes less than 10 minutes. All you need to do is write a small config file, load the <code>klaro.js</code> script and make a few small changes to your third-party scripts on your page so that Klaro can manage them. **So let's get started!**

### 1. Write the config file

<!--translate:ignore-->
<aside>
    <div class="highlight">
        {%filter highlight(strip=True, language='javascript')%}
            window.klaroConfig = {
                apps : [...],
            }
        {%endfilter%}
    </div>
</aside>
<!--translate:ignore-->

First, you need to tell Klaro about the third-party apps and trackers on your site. To do this, you write a simple Javascript config. The easiest way to get started is by looking at the [annotated Klaro config file]({{'annotated-config'|href}}), which is designed to be self-explaining. You can find more examples on the Klaro [Github page](https://github.com/KIProtect/klaro/blob/master/dist/configs/).

### 2. Modify your third-party scripts

<!--translate:ignore-->
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
<!--translate:ignore-->

To make sure that no third-party scripts are loaded without consent, you need to modify your HTML code a tiny bit: For inline scripts, replace the value of the <code>type</code> attribute with <code>text/plain</code> (this keeps the browser from executing the script) and add a data attribute with the original type, e.g. <code>data-type="application/javascript"</code>. Also add a <code>data-name</code> attribute that matches the name of the given app in your config, e.g. <code>data-name="googleAnalytics"</code>.

For external script do the same, but in addition rename the <code>src</code> attribute to <code>data-src</code> (this ensures that the browser won't load the script without the consent of the user). This also works for other tags such as images or tracking pixels. Just remember to always add a <code>data-name</code> attribute that matches the name of the app in your config so that Klaro knows which element belongs to which app.

### 3. Load the config and the script

<!--translate:ignore-->
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
<!--translate:ignore-->

Finally, include both the config script as well as the Klaro code on your page. You can defer the loading of the scripts if you like, just make sure the config is initialized when Klaro loads. You can have a look at our <a href="https://github.com/kiprotect/klaro/tree/master/examples">examples</a> to get some inspiration.

We also provide a version of Klaro without styles, which is handy in case you want to bring our own or customize ours. Simply download <a href="https://cdn.kiprotect.com/klaro/v0.7/klaro-no-css.js" download>klaro-no-css.js</a> and the minified stylesheet <a href="https://cdn.kiprotect.com/klaro/v0.7/klaro.min.css" download>klaro.min.css</a> and include both of them in your HTML. We also have an unminified <a href="https://cdn.kiprotect.com/klaro/v0.7/klaro.css" download>klaro.css</a> stylesheet, which is great if you want to make modifications to it. You can also look at the <a href="https://github.com/KIProtect/klaro/blob/master/src/scss/klaro.scss">SCSS file</a>.

If you want to host Klaro yourself, you can download it here.

<div style="display:inline-block">
    <a id="versionLink" href="https://cdn.kiprotect.com/klaro/v0.7/klaro.js" download class="button is-medium is-warning">
        Download klaro.js
    </a>
    <div class="select">
        <select onChange="versionLink.href='https://cdn.kiprotect.com/klaro/'+versionSelect.value+'/klaro.js'" id="versionSelect" class="select" name="klaro-version">
        </select>
    </div>
</div>

### Problems, Questions, Suggestions?

If you encounter any difficulties when setting up Klaro or if you want to suggest a new feature or report a bug, please <a href="https://github.com/kiprotect/klaro/issues">open a Github-<tr-ignore>Issue</tr-ignore></a> or <a href="mailto:klaro@kiprotect.com">get in touch with us</a>, we love to hear from you!

<!--translate:ignore-->
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
<!--translate:ignore-->
