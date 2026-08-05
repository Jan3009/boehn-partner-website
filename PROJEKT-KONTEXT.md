# Projekt-Kontext: Böhn & Partner Website

Diese Datei fasst alle bisherigen Entscheidungen zusammen, damit die Weiterarbeit
an diesem Projekt konsistent bleibt — egal in welchem Tool.

## Unternehmen

- **Name:** Böhn & Partner GbR
- **Gesellschafter:** Jan Böhn & Tim Böhn (50/50, gleiches Stimmrecht), Brüder, 19 und 24 Jahre alt
- **Social Media:**
  - TikTok: https://www.tiktok.com/@bhnundpartner
  - Instagram: https://www.instagram.com/boehn_partner
  - Facebook: https://www.facebook.com/share/1BWRCaupyg/
  - LinkedIn: noch kein Konto — Icon ist als ausgegrauter Platzhalter auf der
    Website eingebaut, Link nachtragen sobald Profil existiert
- **Sitz:** Sieverdinger Kirchweg 1, 29664 Walsrode
- **Domain:** böhnpartner.de (Punycode: xn--bhnpartner-ecb.de)
- **Gegründet:** 01.07.2026
- **Tätigkeit:** Webdesign, Online-Marketing und Werbung (insbesondere Social-Media-
  und Suchmaschinenwerbung), Gestaltung und Betreuung von Internetauftritten,
  Beratung zu digitaler Sichtbarkeit — schwerpunktmäßig für Handwerks- und
  Dienstleistungsbetriebe

## Positionierung (final entschieden)

**Zielgruppe:** Handwerksbetriebe + regionale Dienstleister mit Kundenkontakt vor
Ort (Fahrschulen, Kosmetikstudios, Friseure, Fitnessstudios, Gastronomie,
Einzelhandel, Reinigungsfirmen, Fotografen). Deutschlandweit tätig, aber die
Kunden der Kunden sind lokal/regional.

**Bewusst NICHT als Zielgruppe** (rechtlich anspruchsvollere Branchen):
Ärzte, Zahnärzte, Heilpraktiker, Physiotherapeuten (Heilmittelwerbegesetz),
Apotheken, Rechtsanwälte, Notare, Steuerberater (Standesrecht),
Versicherungsmakler, Finanzberater (BaFin), Bestattungsunternehmen,
Nahrungsergänzungsmittel-Verkäufer.

**Positionierungs-Zitat (wird auf der Website prominent gezeigt):**
> „Spezialisiert auf Handwerksbetriebe – und auf alle regionalen Dienstleister,
> die genauso wie Handwerker von echter Kundennähe leben.“

## Design-System

### Farben
| Rolle | Hex | Einsatz |
|---|---|---|
| Primärfarbe Marineblau | `#163A5C` | Logo, Header, Footer, Badges |
| Primärfarbe dunkel | `#0F2740` | Footer-Hintergrund, dunkle Headlines |
| Akzent Orange (Standard) | `#E07A2E` | Referenz-/Grundton |
| Akzent Orange — auf hellem Hintergrund | `#C2541F` | CTA-Buttons, Logo-Unterstrich auf Weiß |
| Akzent Orange — auf dunklem Hintergrund | `#F4A65C` | Logo-Unterstrich auf Navy |
| Hintergrund Haupt | `#FFFFFF` | Seitenhintergrund |
| Hintergrund Karten | `#F1F4F8` | Kartenflächen, abgesetzte Bereiche |
| Text Fließtext | `#14202E` | Haupttext |
| Text gedämpft | `#57647A` | Sekundärtext |

**Wichtig:** Zwei verschiedene Orange-Töne, je nach Hintergrund, aus
Kontrastgründen (WCAG-Lesbarkeit) — nicht versehentlich vereinheitlichen.

### Schriften
- **Headline-Font:** Fraunces (Bold/700), Google Font
  - Alternative falls nicht verfügbar: Playfair Display oder Lora
- **Body-Font:** Work Sans (Regular/400, Medium/500, SemiBold/600)
  - Alternative falls nicht verfügbar: Inter oder Source Sans 3

### Logo
- Wortmarke: "BÖHN & PARTNER" in Versalien, Fraunces Bold
- Kennzeichnend: oranger Unterstrich unter dem Schriftzug
- 4 Varianten nötig: horizontal/quadratisch × hell/dunkel, jeweils transparent
- Bewusst KEIN Icon/Symbol — reine Wortmarke

## Leistungen (für die Website, OHNE öffentliche Preise)

1. **Website-Entwicklung** — von Onepager bis mehrseitige Website, inkl.
   On-Page-SEO-Grundlage, mobile Optimierung
2. **Google & Social-Media-Ads** — Setup + laufende Nachjustierung, kontrolliertes
   Budget, keine "Top-Ranking"-Versprechen
3. **Laufende Betreuung** — Hosting/Updates + optionaler Social-Media-
   Redaktionsplan (Kunde postet selbst, wir liefern Themen/Struktur)
4. **Branding** — Logo, Farb- und Schriftwelt, einzeln oder mit Website gebündelt

**Bewusst nicht im Angebot:** Vor-Ort-Foto-/Videoproduktion (noch nicht, erst
eigene Personal Brand aufbauen). Social Media nur als Redaktionsplan, nicht als
Einzelprodukt.

## Website-Struktur (aktueller Stand)

5 Seiten: `index.html` (Start), `leistungen.html`, `kontakt.html`,
`impressum.html` + `datenschutz.html` (beide nur Entwurf/Platzhalter),
dazu `style.css` und `main.js` (Mobile-Menü, Scroll-Animationen).

- **Keine Preise öffentlich** — überall "Angebot anfordern" / "Erstgespräch" als CTA
- Hauptziel: Lead-Gewinnung UND Seriosität/Glaubwürdigkeit gleichgewichtig
- Kontaktformular zeigt clientseitige Erfolgsmeldung — braucht noch echtes Backend

### Design-Richtung (entschieden 07/2026)

- **Stil-Referenz: https://mariushau.de/** — viel Weißraum, große Serifen-
  Typografie, Zahlen-Cards, Vergleichstabelle, Prozess-Schritte, FAQ-Akkordeon,
  CTAs nach jeder Sektion. Farbwelt bleibt Navy/Orange (Design-System gilt weiter).
- **Ansprache: Du** (statt Sie) — durchgehend auf allen Seiten.
- **Social Proof:** Keine erfundenen Erfolgszahlen. Stattdessen allgemeine
  Branchen-Fakten (0,05 Sek. erster Eindruck, 3 von 4 googeln zuerst, 60 %+
  mobil, 88 % kehren nicht zurück) mit ehrlichem Hinweis "Branchenwerte aus
  öffentlichen Studien". Referenzen-Sektion kommt, sobald das Fahrschul-Projekt
  live ist.
- **Bild-Platzhalter** (gestrichelte Boxen, beschriftet) sind eingebaut für:
  Teamfoto (Hero), Porträts Jan & Tim, Referenz-Screenshot, Kampagnen-Grafik,
  Redaktionsplan-Beispiel, Branding-Beispiel. Vor Livegang durch echte
  Fotos/Grafiken ersetzen.
- Startseite ist eine lange Conversion-Seite mit Anker-Navigation
  (#warum, #ablauf, #team, #faq).

## Offene / noch zu erledigende Punkte

1. **Impressum & Datenschutzerklärung**: Entwürfe stehen (mit Hinweisbox, klar
   als nicht rechtsverbindlich markiert), Name jetzt an die Gewerbeanmeldung
   angeglichen ("Böhn und Partner", Inhaber: Jan Kevin Maximilian Böhn & Tim
   Jonas Fabian Böhn GbR). Vor Livegang weiterhin zwingend über eRecht24 oder
   Anwalt final prüfen/ersetzen lassen (§5 TMG, DSGVO) — inkl. neuer Abschnitte
   zu Cookies/Google Analytics/Google Ads, die noch befüllt werden müssen.
2. ~~Kontaktformular braucht echtes Backend~~ — erledigt (07/2026): läuft über
   Formspree (Endpoint `mlgqpqzw`, Formular-Name "Kontaktformular" im
   Formspree-Konto von Jan), per fetch()/AJAX ohne Redirect. Live getestet,
   Zustellung bestätigt.
3. **Telefonnummer** im Kontaktbereich ist noch Platzhalter
4. ~~Bildmaterial fehlt komplett~~ — erledigt (07/2026): Hero- und Team-Fotos
   sind echte Aufnahmen von Jan &amp; Tim, Leistungen-Bilder sind KI-generiert
   (Website-Mockup, Kampagnen-Grafik, Redaktionsplan) bzw. aus echtem Logo/
   Farbcode gebaut (Branding). Alle Dateien liegen in `images/`. Vor
   Livegang noch komprimieren (aktuell ca. 5 MB gesamt, siehe Punkt unten).
5. **Reale Fixkosten** (Domain, Workspace, Tools, Hosting) noch nicht in
   Preiskalkulation eingearbeitet
6. **Erster Kunde:** Fahrschule als Referenzprojekt geplant — Leistungsumfang
   (Seitenanzahl, ggf. Terminbuchungssystem) noch zu klären
7. Domain böhnpartner.de ist eine Umlaut-Domain (IDN) — manche Drittanbieter-
   Formulare/Dienste akzeptieren sie nicht direkt (z. B. TikTok-Registrierung
   scheiterte daran). Ggf. zusätzlich boehnpartner.de (ausgeschrieben) als
   Ausweich-Domain registrieren.
8. ~~Website läuft noch auf GitHub Pages~~ — erledigt (07/2026): läuft live auf
   der echten Domain https://böhnpartner.de (DNS bei GoDaddy umgestellt, HTTPS
   aktiv, Punycode-Form `xn--bhnpartner-ecb.de` funktioniert als Fallback).
9. ~~Tracking-Setup~~ — erledigt (07/2026): GA4 (Measurement-ID `G-TZX8KG2VQV`)
   läuft, `contact_form_submit` als Schlüsselereignis markiert und in Google
   Ads als Conversion importiert. Google-Ads-Konto (583-085-5921) mit GA4
   verknüpft, Identitätsprüfung (Dun & Bradstreet) noch offen (3–5 Werktage,
   automatisch, keine Aktion nötig). Meta Pixel (ID `1600523948405792`) auf
   der Live-Domain eingebaut und verifiziert (PageView + Lead-Events kommen
   nachweislich bei Facebook an, Fehlerdiagnose zeigt keine Fehler). Beides
   gated hinter dem Cookie-Banner (Notwendig/Statistik/Marketing). Noch keine
   aktive Ads-Kampagne (bewusst — Budget-Entscheidung steht noch aus).
10. **Google Business Profil**: in Erstellung, Verifizierung läuft separat
    beim Nutzer. Website-Feld dort auf https://böhnpartner.de aktualisieren,
    sobald zugänglich.
11. **Formular-E-Mail-Benachrichtigung**: in Formspree unter Workflow → Aktionen
    bereits aktiv ("E-mail — für jede Formulareinreichung"), Empfänger-Adresse
    sollte nochmal geprüft werden.

## Fixkosten-Übersicht (Software, Stand aktuell)

| Kategorie | Anbieter | Betrag/Monat |
|---|---|---|
| Software | Claude Pro | 20,00 € |
| Software | Google Workspace Business Starter | 16,20 € |
| Domain & E-Mail | GoDaddy (Domain + Microsoft 365) | ca. 4,00 € (Schätzung, exakten Betrag prüfen) |

## Hinweis zur Nutzung dieser Datei

Diese Datei ist eine Zusammenfassung aus einem separaten Chat mit Claude
(claude.ai). Sie dient als Gedächtnisstütze für Claude Code oder andere Tools,
die keinen Zugriff auf den ursprünglichen Chat-Verlauf haben. Bei Rückfragen
zu Entscheidungen, die hier nicht abgedeckt sind, bitte beim Nutzer nachfragen
statt anzunehmen.
