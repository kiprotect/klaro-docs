# How To Test The Klaro Integration

Before enabling Klaro! on your website you might want to test it. Here's how to do that:

* If you use Klaro with a local configuration file, simply add `testing: true` to the config. 
* If you use Klaro with an API-backed configuration, simply deactivate your configuration via the web interface.

This will ensure that Klaro doesn't automatically show the consent notice or modal dialog. You can enable these by appending `#klaro-testing` to the URL and reloading the page (requires Klaro &ge;0.7.2). This will cause Klaro to show the cosent notice in test mode. For example, to test a Klaro installation on `https://example.com`, we simply change the URL in the browser address bar to `https://example.com#klaro-testing` and reload the page.