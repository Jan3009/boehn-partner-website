# Demo-Vorlage

Astro-Projekt zum schnellen Bauen von unverbindlichen, mehrseitigen Website-Entwürfen
für Kaltakquise-Leads (Betriebe ohne Website oder mit schlechter Website). Baut nach
der internen SOP ("Website-Projekte", v1.0) in Sektionen statt in einem Rutsch zu
prompten, mit fünf echten Unterseiten und eigenständigen Theme-Presets pro Kunde --
kein generischer KI-Template-Look.

Dieses Projekt wird **nicht selbst deployed** — `npm run build` erzeugt fertige,
statische HTML-Dateien direkt im Hauptrepo unter `../demo/<slug>/…`, die dann ganz
normal mit committet werden und über das bestehende GitHub Pages "Deploy from branch"
mit ausgeliefert werden.

## Seiten pro Kunde

Jede Demo bekommt fünf Seiten (nicht nur einen Onepager):

| Route | Inhalt |
|---|---|
| `/demo/<slug>/` | Startseite: Hero, Leistungen-Teaser, Geschichte-Teaser, Galerie-Teaser, Vergleichs-Sektion, Kontakt-CTA |
| `/demo/<slug>/leistungen/` | Alle Leistungen im alternierenden Layout |
| `/demo/<slug>/leistungen/<leistung>/` | Foto-Ordner einer einzelnen Leistung (nur wenn Fotos hinterlegt sind) |
| `/demo/<slug>/ueber-uns/` | Firmengeschichte ausführlich |
| `/demo/<slug>/galerie/` | Alle Fotos fertiger Arbeiten |
| `/demo/<slug>/kontakt/` | Kontaktdaten |

## Neue Demo in 6 Schritten (ca. 30–50 Min.)

1. `_vorlage.example.yaml` (im Projekt-Root) kopieren nach
   `src/content/demos/<kunden-slug>.yaml`. Der Dateiname ohne `.yaml` wird
   die URL: `böhnpartner.de/demo/<kunden-slug>/`.
2. Felder ausfüllen mit öffentlich verfügbaren Infos (Google-
   Unternehmensprofil, Facebook-Seite, ggf. bestehende Website): Firmenname,
   Branche, Ort, Tagline, Gründungsjahr, 3–6 Leistungen, Geschichte,
   Kontaktdaten.
3. **Preset wählen** — jedes Preset ist eine komplett eigene Farbwelt +
   Schriftpaarung, nicht nur eine Akzentfarbe:
   - `editorial` — warmes Creme, Newsreader-Serifen-Headline, ruhig/seriös
     (Handwerk, Fahrschule, Boutique-Dienstleister)
   - `schwarzgold` — nahezu schwarz + Gold-/Metallakzent, Playfair-Display-
     Headline, luxuriös/selbstbewusst (Premium-Handwerk, Gastronomie, Beauty)
   - `kontrast` — reinweiß + kräftiges Schwarz, Space-Grotesk-Headline,
     scharfe Ecken, modern/direkt (Bau, Reinigung, Fitness)
4. **Akzentfarbe** (Hex) wählen als Signalfarbe innerhalb der gewählten
   Palette (z. B. bei `schwarzgold` der konkrete Metallton).
5. Fotos des Betriebs (Hero + Porträt für Über-uns) und fertiger Arbeiten
   (mind. 3, für die Galerie) nach `public/images/demos/<kunden-slug>/`
   legen und verlinken. **Pfad immer mit `/demo/` beginnen**
   (`/demo/images/demos/<kunden-slug>/...`), weil die Demos unter
   `böhnpartner.de/demo/` liegen. **Kein Foto vorhanden?** `src` einfach
   weglassen — wird automatisch als beschriftete Platzhalter-Fläche gezeigt.
   Nur eigene Fotos des Betriebs verwenden (Google-Profil, eigene
   Facebook-Seite) — Fotos vom alten Webdesigner oder Stockbilder besser
   nicht ungeprüft übernehmen. Optional: `altesScreenshot` setzen für eine
   Vorher/Nachher-Sektion mit der bisherigen Website.
6. `npm run build` ausführen, Ergebnis unter `../demo/<kunden-slug>/` prüfen
   (alle 5 Unterseiten), dann ganz normal committen und pushen.

**Foto-Ordner pro Leistung (optional):** Wenn eine Leistung eigene Fotos hat
(z. B. "WDVS" mit Fotos speziell davon), das `bilder`-Feld bei genau dieser
Leistung in der YAML setzen (siehe `_vorlage.example.yaml`). Die Karte wird
dann automatisch klickbar und führt zu einer eigenen Unterseite
`leistungen/<titel-als-slug>/` mit allen Fotos dazu. Leistungen ohne eigenes
`bilder`-Feld bleiben normale Text-Karten, ohne Klick-Funktion.

## Lokal ansehen

```bash
npm install
npm run dev
```

Öffnet unter `http://localhost:4321/<kunden-slug>/`.

## Rechtliches (automatisch abgedeckt, nicht extra machen)

- Jede Seite bekommt automatisch `<meta name="robots" content="noindex,nofollow">`
  und ist zusätzlich in der Haupt-`robots.txt` unter `Disallow: /demo/` gesperrt.
- Jede Seite zeigt automatisch eine nicht schließbare Entwurf-Leiste
  ("Unverbindlicher Entwurf von Böhn & Partner") mit Link auf `impressum.html`.
- Die Kontakt-Seite hat ein echtes Formular (Name/E-Mail/Nachricht,
  Formspree-Honeypot gegen Spam) — aber **ohne Sende-Ziel, solange
  `formspreeEndpoint` in der YAML nicht gesetzt ist**. Ohne Endpoint zeigt das
  Formular beim Absenden einen ehrlichen Hinweis ("Teil des Entwurfs, noch
  nicht angeschlossen") statt eine Nachricht stillschweigend zu verschlucken
  oder beim falschen Empfänger landen zu lassen. Details siehe unten.

## Kontaktformular für einen echten Kunden aktivieren

1. In deinem eigenen Formspree-Konto ein neues Formular für den Kunden
   anlegen (wie beim Formular auf böhnpartner.de selbst, siehe
   PROJEKT-KONTEXT.md) und die Endpoint-URL kopieren
   (`https://formspree.io/f/<id>`).
2. In der YAML des Kunden `formspreeEndpoint: "https://formspree.io/f/<id>"`
   setzen.
3. `npm run build` — ab jetzt sendet das Formular auf der Kontakt-Seite
   per AJAX (kein Redirect, sichtbare Erfolgsmeldung), genau wie auf der
   Hauptseite.

Bis dahin bleibt das Formular bewusst inaktiv, damit keine echten Anfragen
ins Leere laufen oder beim falschen Empfänger landen, während es noch ein
unverbindlicher Entwurf ist.

## Neue Fonts self-hosten

Alle Fonts liegen self-hosted unter `public/fonts/` (kein Runtime-CDN). Neue
Google-Font-Datei nachladen z. B. so:

```bash
curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=FONTNAME:wght@700&display=swap" \
  | grep -o "https://fonts.gstatic.com/[^)]*\.woff2"
```

Die zurückgegebene URL dann mit `curl -o public/fonts/fontname-700.woff2 <URL>`
laden und einen `@font-face`-Block in `src/styles/global.css` ergänzen (der
`-A`-User-Agent ist wichtig, sonst liefert Google kein woff2 aus).

## Struktur

- `src/content/demos/*.yaml` — ein File pro Kunde (Content Collection, Schema
  in `src/content.config.ts`)
- `src/presets.ts` — die drei Theme-Presets (volle Paletten, nicht nur Fonts)
- `src/layouts/PageLayout.astro` — Grundgerüst, setzt Preset-Palette +
  Akzentfarbe als CSS-Variablen, bekommt `slug` für Navigation
- `src/components/` — Header, Footer, EntwurfBar, Button, Hero, Services,
  Geschichte, Gallery, Comparison, BeforeAfter, ContactCta, ContactForm, PageHeader
- `src/pages/[slug]/{index,leistungen,ueber-uns,galerie,kontakt}.astro` —
  eine Datei pro Unterseite, jede mit eigenem `getStaticPaths`
- `src/pages/[slug]/leistungen/[leistung].astro` — Foto-Ordner-Seite pro
  Leistung, wird nur für Leistungen mit eigenem `bilder`-Feld erzeugt
- `src/lib/slugify.ts` — wandelt Leistungs-Titel in URL-Segmente um (für
  Routing und Links konsistent genutzt)
