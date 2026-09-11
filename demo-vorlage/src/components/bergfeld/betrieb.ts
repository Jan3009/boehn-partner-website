// Stammdaten der Musterbetriebe an einer Stelle, damit Telefonnummer und
// Anschrift nicht über drei Seiten hinweg auseinanderlaufen.
//
// ACHTUNG: Beide Betriebe sind frei erfunden. Nummern und Anschriften sind
// Platzhalter und bewusst nicht plausibel gewählt -- eine "echt wirkende"
// Nummer könnte einem echten Anschluss gehören.

export interface Betrieb {
  name: string;
  /** Kurzform für die Wortmarke im Kopf. */
  marke: string;
  inhaber: string;
  titel: string;
  ort: string;
  plz: string;
  strasse: string;
  gegruendet: number;
  telefon: string;
  email: string;
  /** Basispfad der Seiten, z. B. /demo/maler-allerufer/ */
  basis: string;
  /** Unterordner in public/images/demos/ */
  bildordner: string;
}

export const fliesenBergfeld: Betrieb = {
  name: 'Fliesen Bergfeld',
  marke: 'Fliesen Bergfeld',
  inhaber: 'Malte Bergfeld',
  titel: 'Fliesenlegermeister',
  ort: 'Verden (Aller)',
  plz: '27283',
  strasse: 'Musterweg 00',
  gegruendet: 2011,
  telefon: '0 42 31 / 00 00 00',
  email: 'info@fliesen-bergfeld.example',
  basis: '/demo/fliesen-bergfeld/',
  bildordner: 'fliesen-bergfeld',
};

export const malerAllerufer: Betrieb = {
  name: 'Malerwerkstatt Allerufer',
  marke: 'Allerufer',
  inhaber: 'Jonas Allerufer',
  titel: 'Malermeister',
  ort: 'Verden (Aller)',
  plz: '27283',
  strasse: 'Musterweg 00',
  gegruendet: 2009,
  telefon: '0 42 31 / 00 00 00',
  email: 'info@maler-allerufer.example',
  basis: '/demo/maler-allerufer/',
  bildordner: 'maler-allerufer',
};

export const telHref = (b: Betrieb) => `tel:${b.telefon.replace(/[^0-9+]/g, '')}`;

// Rückwärtskompatibel für die bestehenden Fliesen-Seiten.
export const betrieb = fliesenBergfeld;
export const telefonHref = telHref(fliesenBergfeld);
