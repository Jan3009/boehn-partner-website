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
    // Formspree-Endpoint fürs Kontaktformular (https://formspree.io/f/<id>).
    // Nicht gesetzt = Formular zeigt Felder + Validierung, aber sendet nicht
    // (ehrlicher Hinweis statt stillem Fehlschlag) -- erst setzen, wenn aus
    // dem Lead ein echter Kunde mit eigenem Formspree-Formular geworden ist.
    formspreeEndpoint: z.string().url().optional(),
    // Intern, wird nirgends gerendert — nur zur Nachvollziehbarkeit im Team.
    quelle: z.string().optional(),
  }),
});

export const collections = { demos };
