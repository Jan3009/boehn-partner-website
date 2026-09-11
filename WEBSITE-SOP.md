# SOP: Website bauen, ohne dass es nach KI aussieht

Verfahren für Kundenprojekte bei Böhn & Partner. Ziel ist nicht, KI zu
vermeiden — sondern dass am Ende eine Seite steht, die **du** verantworten und
im Kundengespräch Zeile für Zeile begründen kannst.

## Das Grundprinzip

Eine Seite wirkt „KI-generiert", wenn sie **in einem Rutsch** entstanden ist.
Dann stimmt zwar alles formal, aber nichts ist entschieden: austauschbare
Bilder, symmetrische Raster, Texte ohne konkrete Aussage.

Dagegen helfen drei Regeln:

1. **Inhalt vor Design.** Erst steht fest, was auf der Seite gesagt wird —
   dann erst, wie es aussieht. Nie umgekehrt.
2. **Entscheidungen einzeln treffen, mit Begründung.** Jede Schriftwahl, jede
   Farbe, jeder Abschnitt bekommt einen Satz „warum". Wer das nicht sagen
   kann, hat es nicht entschieden, sondern bekommen.
3. **In Etappen bauen und jede Etappe ansehen.** Im Browser, auf dem Handy.
   Nicht am Ende einmal, sondern nach jedem Schritt.

## Rollenverteilung

| Phase | Jan | Claude |
|---|---|---|
| 0 Briefing | führt das Kundengespräch | liefert den Fragenkatalog |
| 1 Struktur | entscheidet und streicht | schlägt Seitenplan vor |
| 2 Design | wählt aus, begründet mit | legt Optionen mit Vor-/Nachteilen vor |
| 3 Bau | sieht jede Etappe an, sagt Stopp | baut etappenweise |
| 4 Texte | liest gegen, schreibt um | entwirft, markiert Unsicheres |
| 5 Abnahme | prüft am eigenen Gerät | liefert Checkliste und Messwerte |

Der wichtigste Teil ist Spalte „Jan". Ohne die ist es wieder ein Generat.

---

## Phase 0 — Briefing (Kundengespräch, vor jeder Zeile Code)

Fragen, die vor dem Bauen beantwortet sein müssen:

**Betrieb**
- Wer ist der Inhaber, seit wann gibt es den Betrieb, wie viele Leute?
- Was macht ihr, was die Konkurrenz nicht macht? (Konkret, nicht „Qualität".)
- Welche Arbeiten macht ihr am liebsten, welche nur widerwillig?
- Gibt es einen Meistertitel, Zertifikate, Fortbildungen?

**Kunden**
- Wer ruft an — Privatleute, Hausverwaltungen, Bauträger?
- Welchen Umkreis bedient ihr?
- Was fragen Kunden am Telefon immer wieder?
- Warum springen Interessenten ab?

**Ziel der Seite**
- Was soll der Besucher tun: anrufen, Formular, WhatsApp, vorbeikommen?
- Was passiert nach dem Kontakt? (Bestimmt, was das Formular abfragen muss.)
- Gibt es Aufträge, die ihr *nicht* wollt? (Dann muss die Seite die abwehren.)

**Material**
- Projektfotos: vorhanden, in welcher Qualität, wer hat sie gemacht?
- Logo als Vektordatei?
- Bestehende Texte, Flyer, Fahrzeugbeschriftung?

> **Nie ohne Antwort weiterbauen.** Fehlt etwas, schriftlich nachfragen —
> nicht raten und später „falls das nicht stimmt, ändern wir es".

**Fotorechte klären:** Wer hat die Bilder gemacht, dürfen sie verwendet
werden? Sind Personen erkennbar? Fremde Wohnungen fotografiert — hat der
Eigentümer zugestimmt? Schriftlich festhalten.

## Phase 1 — Struktur

Ergebnis ist ein Markdown-Dokument, **kein Code**: Seitenplan plus je Seite
die Abschnitte in Reihenfolge, mit einem Satz, was jeder Abschnitt leisten
soll.

Erst wenn das steht und vom Kunden abgenickt ist, wird gebaut. Struktur
ändern kostet fünf Minuten, gebautes Layout ändern kostet Stunden.

Faustregel für kleine Betriebe: **3 Seiten reichen.** Start, Leistungen,
Kontakt. Mehr Seiten heißt mehr Pflege und mehr Stellen, an denen etwas
veraltet.

## Phase 2 — Designentscheidungen

Jede Entscheidung wird notiert, mit Begründung:

- **Schrift:** Welche Headline-, welche Fließtextschrift, warum diese?
- **Farbe:** Woher kommt sie? (Logo, Fahrzeug, Material — nicht „sieht gut aus".)
- **Raster:** Symmetrisch oder asymmetrisch? Wo bricht es bewusst?
- **Bildsprache:** Was zeigen die Fotos, was bewusst nicht?
- **Kanten und Ecken:** Radien, Linien, Schatten — sparsam und einheitlich.

Die Notizen wandern in einen Kommentarblock am Anfang der Seitendatei.
Beim nächsten Mal weiß jeder — du eingeschlossen — warum es so ist.

## Phase 3 — Bau in Etappen

Bauen in dieser Reihenfolge, nach jeder Etappe im Browser ansehen:

1. **Gerüst**: HTML-Struktur, Überschriftenhierarchie, Navigation, Footer.
   Noch ohne Styling. Liest sich die Seite als reiner Text sinnvoll?
2. **Typografie und Farbe**: Das Design-System aus Phase 2 anwenden.
3. **Eine Seite fertig**: Nur die Startseite, komplett. Ansehen, korrigieren.
4. **Restliche Seiten**: Erst jetzt, mit den Korrekturen aus Schritt 3.
5. **Mobil**: Auf dem echten Handy, nicht nur im Browser-Simulator.

Lokal ansehen:

```bash
cd demo-vorlage
npm install     # nur beim ersten Mal
npm run dev     # dann http://localhost:4321/demo/<slug>/ öffnen
```

## Phase 4 — Texte

Texte entstehen **getrennt vom Layout**, sonst liest sie niemand genau.

Was einen Text echt klingen lässt:
- **Zahlen und Namen**: Gründungsjahr, Ortsnamen, Materialbezeichnungen
- **Fachbegriffe richtig benutzt**: zeigt, dass jemand vom Fach dahintersteht
- **Einschränkungen**: „Das machen wir nicht" ist glaubwürdiger als „alles aus
  einer Hand"
- **Normale Satzlängen**: kurze und lange gemischt, nicht alle gleich lang

Was nach KI klingt:
- „Ihr zuverlässiger Partner für höchste Qualität"
- Dreierfiguren überall („schnell, sauber, zuverlässig")
- Jeder Absatz gleich lang, jeder Abschnitt gleich aufgebaut
- Superlative ohne Beleg („die beste Wahl in der Region")

> **Regel:** Jeder Satz, der auch bei einem anderen Betrieb derselben Branche
> stehen könnte, wird gestrichen oder konkretisiert.

## Phase 5 — Abnahme-Check

Vor dem Livegang abhaken:

**Technik**
- [ ] Auf dem Handy geprüft, nicht nur am Rechner
- [ ] Kein horizontales Scrollen bei 360 px Breite
- [ ] Bilder komprimiert (WebP, unter 200 KB je Bild)
- [ ] Alle Links funktionieren, auch Telefon- und Mail-Links
- [ ] Formular getestet — kommt eine Mail wirklich an?

**Inhalt**
- [ ] Kein Platzhaltertext mehr („Lorem", „Beispiel", „hier Text")
- [ ] Alle Bilder zeigen, was die Bildunterschrift behauptet
- [ ] Kein Bild doppelt in zwei verschiedenen Projekten
- [ ] Telefonnummer und Adresse stimmen wirklich

**Recht**
- [ ] Impressum vollständig (eRecht24-Agenturpaket)
- [ ] Datenschutzerklärung passend zu den tatsächlich eingesetzten Diensten
- [ ] Cookie-Banner, falls Tracking aktiv ist
- [ ] Bildrechte geklärt und dokumentiert
- [ ] Keine erfundenen Bewertungen oder Kennzahlen

**Zugänglichkeit**
- [ ] Alt-Texte beschreiben das Bild, nicht „Bild1"
- [ ] Textkontrast ausreichend (4,5:1 im Fließtext)
- [ ] Mit der Tastatur bedienbar

## Anhang — Woran man eine KI-Seite erkennt

Als Gegenprobe am eigenen Ergebnis:

| Merkmal | Woran es liegt |
|---|---|
| Bilder passen nicht zur Branche | Material irgendwo zusammengesucht |
| Dasselbe Foto in zwei Projekten | Bestand recycelt statt beschafft |
| Drei gleich große Kacheln mit Icons | Standardraster ohne Entscheidung |
| Texte ohne Ortsnamen oder Zahlen | Keine Recherche dahinter |
| Jede Sektion gleich aufgebaut | In einem Rutsch generiert |
| Verlaufsfarben, überall gleiche Rundungen | Voreinstellungen nicht angefasst |
| Personenfotos wirken zu perfekt | Generierte oder Stock-Porträts |

Fällt einer dieser Punkte im eigenen Projekt auf: nicht kaschieren, sondern
die Ursache beheben.
