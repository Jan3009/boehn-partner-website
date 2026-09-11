# Bildliste: Fliesen Bergfeld

8 Bildplätze. Jeder Platz nennt Motiv, Format und was das Bild leisten soll.

> **Wichtiger Hinweis vorweg:** KI-generierte Bilder sind bei Fliesen das
> größte Risiko. Ein Fliesenleger erkennt in Sekunden, wenn Fugenraster nicht
> aufgehen, Fugenbreiten innerhalb einer Fläche wechseln, Fliesenschnitte an
> Ecken unmöglich sind oder Armaturen keine funktionierende Anschlussführung
> haben. Genau das würde den Eindruck erzeugen, den wir vermeiden wollen.
>
> **Reihenfolge der Empfehlung:**
> 1. Echte Fotos von einem Fliesenbetrieb (mit schriftlicher Erlaubnis)
> 2. Lizenzfreie echte Fotografie (Unsplash, Pexels) — Suchbegriffe unten
> 3. KI-generiert — nur wenn 1 und 2 ausscheiden, und dann ohne erkennbares
>    Fugenraster im Bildvordergrund

## Die acht Plätze

| Nr | Seite | Format | Motiv | Aufgabe |
|---|---|---|---|---|
| 1 | Start, Hero | Quer, mind. 2000 px breit | Fertig saniertes Bad, Totale. Dunkle Bildstimmung, damit weiße Schrift darauf lesbar bleibt | Der erste Eindruck. Muss Qualität zeigen, nicht Katalog |
| 2 | Start, Betrieb | Quer, 16:9 | Inhaber bei der Arbeit oder Team vor dem Firmenwagen | Gesicht zum Betrieb. Kein Studioporträt |
| 3 | Start, Referenz | Hoch, 3:4 | Das alte Bad **vorher**, aus der Türposition | Ausgangslage. Darf unschön sein |
| 4 | Start, Referenz | Hoch, 3:4 | Gleiche Position **nachher** | Der Vergleich ist das Verkaufsargument |
| 5 | Start, Abdichtung | Quer, 16:9 | Aufgetragene Verbundabdichtung im Rohbau (türkis/grau), vor dem Verfliesen | Belegt Fachlichkeit. Genau dieses Bild hat sonst niemand |
| 6 | Leistungen, Sanierung | Quer, 16:9 | Laufende Baustelle: Staubschutzwand, abgedeckter Flur, Werkzeug | Ehrlichkeit. Bewusst nicht aufgeräumt |
| 7 | Leistungen, Dusche | Quer, 16:9 | Fertige bodengleiche Dusche mit sichtbarer Rinne oder Punktablauf | Die meistgefragte Leistung |
| 8 | Leistungen, Naturstein | Quer, 16:9 | Naturstein in Nahaufnahme, Maserung erkennbar | Materialgefühl |

**Wichtig bei 3 und 4:** Gleicher Standpunkt, gleiche Brennweite, gleicher
Bildausschnitt. Ein Vorher/Nachher aus zwei verschiedenen Perspektiven
funktioniert nicht — man vergleicht dann zwei Räume statt einen.

## Suchbegriffe für Unsplash und Pexels

Englisch suchen, dort liegt das Material:

| Platz | Suchbegriffe |
|---|---|
| 1 | `modern bathroom interior dark`, `bathroom renovation finished`, `walk in shower tiles` |
| 2 | `craftsman working`, `tiler at work`, `construction worker portrait van` |
| 3 | `old bathroom 1970s`, `outdated bathroom tiles`, `bathroom before renovation` |
| 4 | `bathroom after renovation`, `renovated bathroom small` |
| 5 | `waterproofing membrane bathroom`, `shower waterproofing`, `bathroom rough construction` |
| 6 | `construction dust protection`, `renovation work in progress apartment` |
| 7 | `curbless shower drain`, `linear shower drain tile`, `barrier free shower` |
| 8 | `marble texture close up`, `natural stone slab`, `slate stone surface` |

Platz 5 und 6 sind erfahrungsgemäß am schwersten zu finden — genau deshalb
wirken sie, wenn du sie hast. Notfalls dort auf ein anderes Motiv ausweichen,
aber niemals ein generisches Katalogbad einsetzen.

## Technische Anforderungen

- **Format:** WebP, Qualität 80
- **Größe:** Platz 1 mindestens 2000 px breit, die übrigen 1400 px
- **Dateigröße:** unter 200 KB je Bild
- **Ablage:** `demo-vorlage/public/images/demos/fliesen-bergfeld/`
- **Benennung:** `hero.webp`, `betrieb.webp`, `vorher.webp`, `nachher.webp`,
  `abdichtung.webp`, `baustelle.webp`, `dusche.webp`, `naturstein.webp`

Umwandeln und verkleinern:

```bash
# ImageMagick
magick original.jpg -resize 2000x -quality 80 hero.webp
```

## Bildquellen dokumentieren

Für jedes Bild festhalten: Quelle, Urheber, Lizenz, Datum. Bei Fotos von einem
Betrieb: schriftliche Erlaubnis per Mail, und klären, ob der Eigentümer der
fotografierten Wohnung zugestimmt hat. Das gehört in eine `BILDQUELLEN.md`
neben den Bildern.

**Nicht wiederholen, was bei den Maler-Demos passiert ist:** Dort ist dasselbe
Porträt in zwei verschiedenen Betrieben eingesetzt — und es zeigt einen
Bergmann mit Grubenlampe, keinen Maler.
