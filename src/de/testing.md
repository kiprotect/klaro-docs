# Wie Sie die Klaro-Integration testen können

Bevor Sie Klaro! auf Ihrer Website aktivieren, sollten Sie es vielleicht testen. Hier erfahren Sie, wie Sie das tun können:

* Wenn Sie Klaro mit einer lokalen Konfigurationsdatei verwenden, fügen Sie einfach `testing: true` zur Konfiguration hinzu. 
* Wenn Sie Klaro mit einer API-gestützten Konfiguration verwenden, deaktivieren Sie Ihre Konfiguration einfach über die Webschnittstelle.

Dadurch wird sichergestellt, dass Klaro nicht automatisch die Einverständniserklärung oder den modalen Dialog anzeigt. Sie können diese aktivieren, indem Sie `#klaro-testing` an die URL anhängen und die Seite neu laden (erfordert Klaro ≥0.7.2). Dies veranlasst Klaro, die Einverständniserklärung im Testmodus anzuzeigen. Um zum Beispiel eine Klaro-Installation auf `https://example.com` zu testen, ändern wir einfach die URL in der Browser-Adressleiste in `https://example.com#klaro-testing` und laden die Seite neu.
