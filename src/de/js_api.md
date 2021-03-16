# Javascript-API

Klaro bietet eine kleine, aber leistungsstarke Javascript-API, mit der Sie die Zustimmung Ihrer eigenen Anwendungen kontrollieren und überwachen können. Wenn sie als normales Skript geladen wird, kann auf die API über das globale `klaro` Projekt zugegriffen werden. Sie können Klaro auch als Modul importieren, um es innerhalb Ihres Node.js-Projekts zu verwenden. Um mehr darüber zu erfahren, sehen Sie sich unser [Beispiel auf Github](https://github.com/kiprotect/klaro/tree/master/examples/klaro-and-webpack) an.

## `klaro`

Wenn Klaro als reguläres Skript auf einer Website geladen wird, erstellt es eine globale `klaro` Variable, die die öffentliche Klaro-API offen legt. Die folgenden Abschnitte beschreiben jede Funktion dieser API.

#### `klaro.show(config, modal)` <a id="show"></a>

Zeigt die Einverständniserklärung für die gegebene Konfiguration an. Wenn dies der Fall `config` ist `undefined`, wird Klaro die durch das `data-config` Attribut des Klaro-Tags `script` definierte Konfigurationsvariable laden. Wenn auch diese nicht definiert ist, fällt sie auf `klaroConfig`.

#### `klaro.version()` <a id="version"></a>

Gibt die Klaro-Version zurück. Meistens nützlich für Debugging-Zwecke.

#### `klaro.getManager(config)` <a id="getManager"></a>

Geben Sie die [`ConsentManager`](#ConsentManager) Instanz für die gegebene Konfiguration. Der `config` Parameter wird genauso behandelt wie bei der [`show`](#show) Funktion. Wenn für die gegebene Konfiguration kein Zustimmungsmanager existiert, wird dieser erstellt. Wenn einer existiert, gibt die Funktion immer dieselbe Instanz zurück, so dass es sicher ist, die Funktion mehrmals oder aus verschiedenen Kontexten aufzurufen.

#### `klaro.resetManagers()` <a id="resetManagers"></a>

Löscht alle Zustimmungsbeauftragte.

#### `klaro.initialize()` <a id="initialize"></a>

Initialisiert Klaro: Wenn der Benutzer noch keine Einverständniserklärung eingereicht hat, wird die Einverständniserklärung (oder modal, je nach Ihrer Konfiguration) angezeigt. Die Funktion hat keine Auswirkung, wenn das `data-no-auto-load` Attribut auf dem Klaro-Skript-Tag auf `true`.

#### `klaro.render(config, opts)` <a id="renderKlaro"></a>

Rendert die Klaro-Benutzeroberfläche. Wenn keine `config` angegeben wird, hat die Funktion keine Wirkung. Optionen ist eine Karte mit Optionen: Wenn `opts.show` gleich `true` ist, wird die Einverständniserklärung (wenn der Benutzer keine Einverständniserklärung abgegeben hat und wenn die Modalität nicht durch die Konfiguration erzwungen wird) oder die Einverständniserklärung (wenn der Benutzer bereits Einverständniserklärungen abgegeben hat) angezeigt. Wenn `opts.modal` `true` ist, wird immer die Modalversion anstelle der Einverständniserklärung angezeigt, auch wenn der Benutzer keine Einverständniserklärung eingereicht hat.

#### `klaro.getConfigTranslations(config)` <a id="getTranslations"></a>

Gibt ein Javascript `Map` zurück, das die Übersetzungen für die angegebene `config` enthält.

#### `klaro.language()` <a id="language"></a>

Beeinflusst die UI-Sprache für Klaro. Verwendet entweder den durch die globale `lang` Variable angegebenen Wert oder die im Fenster oder HTML-Dokument definierte Sprache.

## `ConsentManager` <a id="ConsentManager"></a>

Die `ConsentManager` Klasse verwaltet Einverständnisinformationen für Klaro. Sie können sie verwenden, um Einverständniserklärungen einzusehen oder zu aktualisieren. Sie speichert die aktuellen Zustimmungsentscheidungen, die ein Benutzer in der Benutzeroberfläche getroffen hat, synchronisiert sie mit dem Speicher und wendet sie durch Aktivieren oder Deaktivieren von HTML-Elementen und Löschen von Cookies an.

#### `get storageMethod()` <a id="ConsentManager.storageMethod"></a>

Gibt die für die Speicherung von Einwilligungsinformationen verwendete Speichermethode zurück. Derzeit ist dies entweder `cookie` oder `localStorage`.

#### `get storageName()` <a id="ConsentManager.storageName"></a>

Gibt den Namen des Speichers zurück, der zur Speicherung der Zustimmungsinformationen verwendet wird. Für den `cookie` Speicher ist es der Name des Cookies. Für den `localStorage` Speicher ist es der Schlüssel des Speichers.

#### `get cookieDomain()` <a id="ConsentManager.cookieDomain"></a>

Gibt die Domäne des Zustimmungs-Cookies für die `cookie` Speicherung zurück.

#### `get cookieExpiresAfterDays()` <a id="ConsentManager.cookieExpiresAfterDays"></a>

Gibt die Anzahl der Tage zurück, nach denen das Zustimmungs-Cookie abläuft.

#### `get defaultConsents()` <a id="ConsentManager.defaultConsents"></a>

Gibt die Standardeinwilligungen für alle konfigurierten Anwendungen als Javascript-Objekt zurück.

#### `watch(watcher)` <a id="ConsentManager.watch"></a>

Registrieren Sie einen neuen Beobachter. Ein Wächter muss eine `update(obj, name, data)` Funktion implementieren, die Informationen über Zustandsaktualisierungen vom Zustimmungsverwalter erhält. Derzeit veröffentlicht der Zustimmungsvorsitzende nur Ereignisse mit einem Namen `consents`, der den aktuellen Zustimmungsstatus für alle Anwendungen enthält.

#### `unwatch(watcher)` <a id="ConsentManager.unwatch"></a>

Heben Sie die Registrierung eines Beobachters auf, der zuvor registriert war.

#### `notify(name, data)` <a id="ConsentManager.notify"></a>

Informieren Sie alle Beobachter über ein Ereignis mit einer vorgegebenen `name` und zusätzlichen Information `data`.

#### `getApp(name)` <a id="ConsentManager.getApp"></a>

Gibt die Konfiguration einer Anwendung nach ihrer `name`, oder `undefined` falls keine solche Anwendung existiert, zurück.

#### `getDefaultConsent(app)` <a id="ConsentManager.getDefaultConsent"></a>

Gibt den Standardwert der Zustimmung für den angegebenen `app`, entweder `true` oder zurück `false`.

#### `changeAll(value)` <a id="ConsentManager.changeAll"></a>

Ändert **alle** Zustimmungen auf den angegebenen Wert (`true` oder `false`). Bitte beachten Sie, dass Anwendungen, die als erforderlich markiert sind, weiterhin aktiviert werden.

#### `updateConsent(name, value)` <a id="ConsentManager.updateConsent"></a>

Ändern Sie die Zustimmung von app `name` zu `value`.

#### `restoreSavedConsents()` <a id="ConsentManager.restoreSavedConsents"></a>

Wiederherstellen von Zustimmungen, die gespeichert wurden, als der Benutzer sie akzeptiert hat. Dadurch können Sie den Zustand des Zustimmungs-Managers auf die letzte Zustimmungs-Wahl des Benutzers zurücksetzen. 

#### `resetConsents()` <a id="ConsentManager.resetConsents"></a>

Setzt alle Zustimmungen auf ihre konfigurierten Standardwerte zurück, wendet die Zustimmungsoptionen an und löscht alle gespeicherten Zustimmungsinformationen.

#### `getConsent(name)` <a id="ConsentManager.getConsent"></a>

Gibt den Zustimmungsstatus für die Anwendung mit dem angegebenen `name`.

#### `loadConsents()` <a id="ConsentManager.loadConsents"></a>

Lädt die Zustimmungsoptionen aus dem Laden.

#### `saveAndApplyConsents()` <a id="ConsentManager.saveAndApplyConsents"></a>

Speichert die aktuellen Zustimmungsentscheidungen für den Laden und wendet sie an. Ruft  an.
`saveConsents()` und `applyConsents()`.

#### `saveConsents()` <a id="ConsentManager.saveConsents"></a>

Speichern Sie die aktuellen Zustimmungsentscheidungen im Speicher (ohne sie anzuwenden).

#### `applyConsents()` <a id="ConsentManager.applyConsents"></a>

Wenden Sie die aktuellen Zustimmungsentscheidungen an.

#### `updateAppElements(app, consent)` <a id="ConsentManager.updateAppElements"></a>

Aktualisieren Sie alle HTML-Elemente für das Gegebene, `app` um die `consent` Auswahl widerzuspiegeln. Dadurch werden entweder Elemente für Anwendungen, die aktiviert wurden, initialisiert oder aktive Elemente für Anwendungen, die deaktiviert wurden, entfernt.

#### `updateAppCookies(app, consent)` <a id="ConsentManager.updateAppCookies"></a>

Aktualisieren Sie alle Cookies für die gegebenen `app`, um die Wahl der Zustimmung widerzuspiegeln. Dadurch wird versucht, Cookies für Anwendungen zu entfernen, die deaktiviert wurden.
