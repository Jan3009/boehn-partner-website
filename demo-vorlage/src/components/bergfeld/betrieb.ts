// Stammdaten des Musterbetriebs an einer Stelle, damit Telefonnummer und
// Anschrift nicht über drei Seiten hinweg auseinanderlaufen.
// ACHTUNG: Der Betrieb ist frei erfunden. Nummer und Anschrift sind
// Platzhalter und bewusst nicht plausibel gewählt -- eine "echt wirkende"
// Nummer könnte einem echten Anschluss gehören.
export const betrieb = {
  name: 'Fliesen Bergfeld',
  inhaber: 'Malte Bergfeld',
  titel: 'Fliesenlegermeister',
  ort: 'Verden (Aller)',
  plz: '27283',
  strasse: 'Musterweg 00',
  gegruendet: 2011,
  telefon: '0 42 31 / 00 00 00',
  email: 'info@fliesen-bergfeld.example',
} as const;

export const telefonHref = `tel:${betrieb.telefon.replace(/[^0-9+]/g, '')}`;
