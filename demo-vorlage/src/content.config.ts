import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const demos = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/demos' }),
  schema: z.object({
    firmenname: z.string(),
    branche: z.string(),
    ort: z.string(),
    tagline: z.string(),
    gruendungsjahr: z.string().optional(),
    // Optional: blendet Kicker/Headline/Tagline im Hero aus, nur das Bild
    // (samt CTA-Button) bleibt sichtbar. Für Fälle, in denen das Hero-Foto
    // selbst schon Text/Slogan enthält und die normale Seiten-Headline sich
    // sonst optisch damit überlappen würde.
    heroTextAusblenden: z.boolean().optional(),
    // Optional: Header-Leiste (Logo/Nav/Button) in dunkler Fläche mit hellem
    // Text statt der normalen hellen Fläche -- eigene Farblogik, unabhängig
    // vom "hintergrund"-Override, weil der Header sonst dieselbe Fläche wie
    // die Seite selbst nutzt.
    headerDunkel: z.boolean().optional(),
    // Optional: blendet die großen "01/02/03"-Nummern vor jeder Leistung aus.
    leistungenOhneNummern: z.boolean().optional(),
    // Optional: erzeugt keine eigenständige /leistungen/-Seite -- für Fälle,
    // in denen die Startseite die Leistungen bereits 1:1 vollständig zeigt
    // und eine separate Seite nur eine Dopplung wäre. Nav/Footer verlinken
    // dann stattdessen auf den #leistungen-Anker der Startseite. Die
    // einzelnen Foto-Unterseiten je Leistung (/leistungen/<name>/) bleiben
    // davon unberührt, weil sie NICHT auf der Startseite dupliziert sind.
    leistungenSeiteAusblenden: z.boolean().optional(),
    // Optional: zeigt zwei dekorative Farbklecks-Grafiken (Akzentfarbe) hinter
    // der "Unsere Geschichte"-Sektion, angelehnt an verspielte Referenzseiten
    // mit Farbspritzer-Motiv (z. B. Malerbetriebe). Reine Deko, kein Foto.
    farbkleckse: z.boolean().optional(),
    // Optional: überschreibt bg/surface/dark des gewählten Presets (z. B.
    // reines Weiß statt des warmen Cremes im "editorial"-Preset, oder reines
    // Schwarz statt des warmbraunen "dark"-Tons), ohne das ganze Preset
    // (Fonts/Radius/Buttonstil) zu wechseln. bg+surface zusammen setzen,
    // sonst wirkt eine der beiden Flächen inkonsistent zur anderen.
    hintergrund: z
      .object({
        bg: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        surface: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        dark: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
      })
      .optional(),
    style: z.enum(['editorial', 'schwarzgold', 'kontrast']),
    akzentfarbe: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Muss ein Hex-Farbcode sein, z. B. #C7A252'),
    leistungen: z
      .array(
        z.object({
          titel: z.string(),
          text: z.string(),
          // Eigener Foto-"Ordner" für diese Leistung -- wenn gesetzt, wird die
          // Leistungskarte klickbar und führt auf eine eigene Seite mit allen
          // Fotos dazu. Ohne dieses Feld bleibt die Karte ein reiner Text-Eintrag.
          bilder: z
            .array(
              z.object({
                src: z.string().optional(),
                alt: z.string(),
              })
            )
            .optional(),
        })
      )
      .min(3)
      .max(6),
    geschichte: z.string(),
    kontakt: z.object({
      telefon: z.string(),
      adresse: z.string(),
      oeffnungszeiten: z.string().optional(),
      email: z.string().optional(),
    }),
    socialMedia: z
      .object({
        instagram: z.string().optional(),
        facebook: z.string().optional(),
      })
      .optional(),
    // src leer lassen, wenn noch kein echtes Foto vorliegt -- wird dann als
    // beschriftete Platzhalter-Fläche gerendert statt ein falsches Bild zu zeigen.
    bilder: z
      .array(
        z.object({
          src: z.string().optional(),
          alt: z.string(),
        })
      )
      .min(1),
    // Fotos fertiger Arbeiten -- Referenz-/Portfolio-Bereich.
    galerie: z
      .array(
        z.object({
          src: z.string().optional(),
          alt: z.string(),
        })
      )
      .min(3),
    altesScreenshot: z
      .object({
        src: z.string().optional(),
        alt: z.string(),
      })
      .optional(),
    // Optional: eigener Screenshot der fertigen Entwurfsseite fürs
    // "Nachher" -- fällt sonst automatisch auf bilder[0] (Hero-Bild) zurück.
    neuerScreenshot: z
      .object({
        src: z.string().optional(),
        alt: z.string(),
      })
      .optional(),
    // Formspree-Endpoint fürs Kontaktformular (https://formspree.io/f/<id>).
    // Nicht gesetzt = Formular zeigt Felder + Validierung, aber sendet nicht
    // (ehrlicher Hinweis statt stillem Fehlschlag) -- erst setzen, wenn aus
    // dem Lead ein echter Kunde mit eigenem Formspree-Formular geworden ist.
    formspreeEndpoint: z.string().url().optional(),
    // Optional: passt die Beschriftung des Galerie-Bereichs an, wenn
    // "Arbeiten" / "Fertige Arbeiten" nicht zur Branche passt (z. B.
    // Gastronomie -- da geht's um Fotos, nicht um abgeschlossene Auftraege).
    // Ohne dieses Feld bleiben die bisherigen Standardtexte unveraendert.
    galerieLabel: z
      .object({
        nav: z.string(),
        kicker: z.string(),
        titel: z.string(),
      })
      .optional(),
    // Optional: passt die Beschriftung des Leistungen-Bereichs an (z. B.
    // "Speisekarte" statt "Leistungen" fuer Gastronomie). Ohne dieses Feld
    // bleiben die bisherigen Standardtexte unveraendert.
    leistungenLabel: z
      .object({
        nav: z.string(),
        kicker: z.string(),
        titel: z.string(),
      })
      .optional(),
    // Optional: echte Kundenstimmen (Google/Facebook-Bewertungen), die auf
    // der Startseite und der Kontaktseite als Social Proof gezeigt werden.
    // Nur echte, oeffentlich nachlesbare Bewertungen eintragen -- nichts
    // erfinden. "quelle" z. B. "Google-Bewertung" oder "Facebook".
    bewertungen: z
      .array(
        z.object({
          text: z.string(),
          autor: z.string(),
          sterne: z.number().min(1).max(5),
          quelle: z.string(),
        })
      )
      .optional(),
    // Optional: aggregierte Bewertungswerte fuer Badges (z. B. "4,6 bei
    // Google, 423 Bewertungen"). Rein informativ, verlinkt nirgendwohin.
    bewertungenBadges: z
      .array(
        z.object({
          quelle: z.string(),
          wert: z.string(),
          anzahl: z.string().optional(),
        })
      )
      .optional(),
    // Optional: ersetzt den normalen Hero durch eine gepinnte GSAP-Scroll-
    // Story aus nummerierten Vollbild-Kapiteln (Foto + Zahl + Titel), die
    // sich beim Scrollen ueberblenden. Nur setzen, wenn der Betrieb starke,
    // grossflaechige Fotos hat -- sonst normalen Hero (bilder[0]) nutzen.
    kinoKapitel: z
      .array(
        z.object({
          nummer: z.string(),
          titel: z.string(),
          text: z.string().optional(),
          bild: z.object({
            src: z.string(),
            alt: z.string(),
          }),
          // Optional: eigenes Video statt Foto fuer dieses Kapitel (mp4, self-
          // hosted). "bild" bleibt Pflicht und dient als poster-Bild, bis das
          // Video geladen hat / falls Video nicht abspielt.
          video: z.string().optional(),
        })
      )
      .min(2)
      .max(6)
      .optional(),
    // Optional: Google-Maps-Kartenausschnitt auf der Kontaktseite (ohne API-
    // Key, per öffentlichem "output=embed"-Link). Auf true setzen, um die
    // Karte automatisch aus kontakt.adresse zu erzeugen.
    googleMaps: z.boolean().optional(),
    // Optional: vollstaendige, kategorisierte Speisekarte mit echten Preisen
    // fuer den Speisekarten-Flipbook (DoenerMenuBook.astro) -- eine Kategorie
    // pro Buchseite. Nur setzen, wenn eine echte, aktuelle Preisliste
    // vorliegt (z. B. abfotografiert) -- sonst bleibt die einfache
    // Leistungen-Liste ohne Preise die bessere, ehrlichere Wahl.
    speisekarteKategorien: z
      .array(
        z.object({
          kategorie: z.string(),
          hinweis: z.string().optional(),
          bild: z
            .object({
              src: z.string().optional(),
              alt: z.string(),
            })
            .optional(),
          gerichte: z
            .array(
              z.object({
                nummer: z.string().optional(),
                name: z.string(),
                beschreibung: z.string().optional(),
                preis: z.string(),
              })
            )
            .min(1),
        })
      )
      .min(1)
      .optional(),
    // Intern, wird nirgends gerendert — nur zur Nachvollziehbarkeit im Team.
    quelle: z.string().optional(),
  }),
});

export const collections = { demos };
