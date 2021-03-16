# Javascript API

Klaro offers a small but powerful Javascript API that allows you to control and monitor consent from your own apps. When loaded as an ordinary script, the API can be accessed via the global `klaro` project. You can also import Klaro as a module to use it from within your Node.js project. To learn more about this, have a look at our [example on Github](https://github.com/kiprotect/klaro/tree/master/examples/klaro-and-webpack).

## `klaro`

When loading Klaro as a regular script on a website, it will create a global `klaro` variable that exposes the public Klaro API. The following sections describe each function of this API.

#### `klaro.show(config, modal)` <a id="show"></a>

Shows the consent notice for the given config. If `config` is `undefined`, Klaro will load the config variable defined by the `data-config` attribute of the Klaro `script` tag. If that is undefined as well, it will fall back to `klaroConfig`.

#### `klaro.version()` <a id="version"></a>

Returns the Klaro version. Mostly useful for debugging purposes.

#### `klaro.getManager(config)` <a id="getManager"></a>

Return the [`ConsentManager`](#ConsentManager) instance for the given configuration. The `config` parameter is handled exactly as for the [`show`](#show) function. If no consent manager exists for the given config, it will be created. If one exists, the function will always return the same instance, so it is safe to call the function multiple times or from different contexts.

#### `klaro.resetManagers()` <a id="resetManagers"></a>

Deletes all consent managers.

#### `klaro.initialize()` <a id="initialize"></a>

Initializes Klaro: If the user has not yet submitted consent preferences, the consent notice (or modal, depending on your configuration) will be shown. The function has no effect if the `data-no-auto-load` attribute on the Klaro script tag is set to `true`.

#### `klaro.render(config, opts)` <a id="renderKlaro"></a>

Renders the Klaro UI. If no `config` is given, the function has no effect. Options is a map containing options: If `opts.show` is `true`, the consent notice (if the user hasn't submitted consent preferences and if the modal isn't forced by the configuration) or the consent modal (if the user has already submitted consent preferences) will be shown. If `opts.modal` is `true`, the modal will always be shown instead of the consent notice, even if the user hasn't submitted any consent preferences.

#### `klaro.getConfigTranslations(config)` <a id="getTranslations"></a>

Returns a Javascript `Map` containing the translations for the given `config`.

#### `klaro.language()` <a id="language"></a>

Infers the UI language for Klaro. Either uses the value given by the global `lang` variable, or the language defined in the window or HTML document.

## `ConsentManager` <a id="ConsentManager"></a>

The `ConsentManager` class manages consent information for Klaro. You can use it to view or update consent preferences. It stores the current consent choices that a user has made in the UI, synchronizes them to/from storage and applies them by enabling or disabling HTML elements and deleting cookies.

#### `get storageMethod()` <a id="ConsentManager.storageMethod"></a>

Returns the storage method used for storing consent information. Currently this is either `cookie` or `localStorage`.

#### `get storageName()` <a id="ConsentManager.storageName"></a>

Returns the name of the storage used for storing consent information. For the `cookie` store, it is the name of the cookie. For the `localStorage` store, it is the key of the storage.

#### `get cookieDomain()` <a id="ConsentManager.cookieDomain"></a>

Returns the domain of the consent cookie for the `cookie` storage.

#### `get cookieExpiresAfterDays()` <a id="ConsentManager.cookieExpiresAfterDays"></a>

Returns the number of days after which the consent cookie expires.

#### `get defaultConsents()` <a id="ConsentManager.defaultConsents"></a>

Returns the default consents for all configured apps as a Javascript object.

#### `watch(watcher)` <a id="ConsentManager.watch"></a>

Register a new watcher. A watcher must implement an `update(obj, name, data)` function, which will receive information about state updates from the consent manager. Currently, the consent manager only publishes events with name `consents` that contains the current consent state for all apps.

#### `unwatch(watcher)` <a id="ConsentManager.unwatch"></a>

Unregister a watcher that was previously registered.

#### `notify(name, data)` <a id="ConsentManager.notify"></a>

Notify all watchers about an event with a given `name` and additional information `data`.

#### `getApp(name)` <a id="ConsentManager.getApp"></a>

Returns the configuration of an app by its `name`, or `undefined` if no such app exists.

#### `getDefaultConsent(app)` <a id="ConsentManager.getDefaultConsent"></a>

Returns the default consent value for the given `app`, either `true` or `false`.

#### `changeAll(value)` <a id="ConsentManager.changeAll"></a>

Changes **all** consents to the given value (`true` or `false`). Please note that apps which are marked as required will still be enabled.

#### `updateConsent(name, value)` <a id="ConsentManager.updateConsent"></a>

Change the consent of app `name` to `value`.

#### `restoreSavedConsents()` <a id="ConsentManager.restoreSavedConsents"></a>

Restore consents that were saved when the user accepted them. This allows you to reset the state of the consent manager to the last consent choice of the user. 

#### `resetConsents()` <a id="ConsentManager.resetConsents"></a>

Resets all consents to their configured default values, applies the consent choices and deletes all stored consent information.

#### `getConsent(name)` <a id="ConsentManager.getConsent"></a>

Returns the consent state for the app with the specified `name`.

#### `loadConsents()` <a id="ConsentManager.loadConsents"></a>

Loads the consent choices from the store.

#### `saveAndApplyConsents()` <a id="ConsentManager.saveAndApplyConsents"></a>

Saves the current consent choices to the store and applies them. Calls
`saveConsents()` and `applyConsents()`.

#### `saveConsents()` <a id="ConsentManager.saveConsents"></a>

Save the current consent choices to the store (without applying them).

#### `applyConsents()` <a id="ConsentManager.applyConsents"></a>

Apply the current consent choices.

#### `updateAppElements(app, consent)` <a id="ConsentManager.updateAppElements"></a>

Update all HTML elements for the given `app` to reflect the `consent` choice. This will either initialize elements for apps that have been enabled and remove active elements for apps that have been disabled.

#### `updateAppCookies(app, consent)` <a id="ConsentManager.updateAppCookies"></a>

Update all cookies for the given `app` to reflect the consent choice. This will try to remove cookies for apps that have been disabled.