// Jedes Preset ist ein vollständiges Theme (eigene Palette + eigene Fonts +
// eigener Button-Charakter), nicht nur eine Akzentfarbe auf einer fixen
// Navy/Card-Basis. Das ist bewusst so, nachdem das v1-Ergebnis mit fixer
// Struktur + wechselnder Akzentfarbe zu nah an böhnpartner.de selbst wirkte.
// `akzentfarbe` bleibt pro Kunde frei wählbar und wirkt als Signalfarbe
// innerhalb der jeweiligen Palette (z. B. der Metallton bei "schwarzgold").

export type PresetName = 'editorial' | 'schwarzgold' | 'kontrast' | 'kontrast-dunkel';
export type ButtonStyle = 'outline-ink' | 'outline-accent' | 'solid-sharp';

export interface Preset {
  label: string;
  headingFont: string;
  headingWeight: string;
  headingTracking: string;
  bodyFont: string;
  heroScale: string;
  bg: string;
  surface: string;
  ink: string;
  inkSoft: string;
  line: string;
  dark: string;
  darkInk: string;
  darkInkSoft: string;
  radiusSm: string;
  radiusCard: string;
  radiusLg: string;
  buttonStyle: ButtonStyle;
}

export const presets: Record<PresetName, Preset> = {
  editorial: {
    label: 'Editorial',
    headingFont: "'Newsreader', serif",
    headingWeight: '600',
    headingTracking: '-0.005em',
    bodyFont: "'Inter', sans-serif",
    heroScale: 'clamp(2.8rem, 6.4vw, 5rem)',
    bg: '#FBF7EF',
    surface: '#F2EAD9',
    ink: '#241E17',
    inkSoft: '#6B6153',
    line: 'rgba(36, 30, 23, 0.12)',
    dark: '#2B221A',
    darkInk: '#F5EFE2',
    darkInkSoft: 'rgba(245, 239, 226, 0.65)',
    radiusSm: '6px',
    radiusCard: '6px',
    radiusLg: '10px',
    buttonStyle: 'outline-ink',
  },
  schwarzgold: {
    label: 'Schwarz/Gold',
    headingFont: "'Playfair Display', serif",
    headingWeight: '800',
    headingTracking: '-0.01em',
    bodyFont: "'Inter', sans-serif",
    heroScale: 'clamp(3rem, 7vw, 5.6rem)',
    bg: '#0E0D0C',
    surface: '#1C1712',
    ink: '#F5EFE2',
    inkSoft: '#B8AE9C',
    line: 'rgba(245, 239, 226, 0.14)',
    dark: 'color-mix(in srgb, var(--accent) 8%, black)',
    darkInk: '#F5EFE2',
    darkInkSoft: 'rgba(245, 239, 226, 0.6)',
    radiusSm: '2px',
    radiusCard: '2px',
    radiusLg: '2px',
    buttonStyle: 'outline-accent',
  },
  kontrast: {
    label: 'Kontrast',
    headingFont: "'Space Grotesk', sans-serif",
    headingWeight: '700',
    headingTracking: '-0.02em',
    bodyFont: "'Inter', sans-serif",
    heroScale: 'clamp(3.2rem, 8vw, 6rem)',
    bg: '#FFFFFF',
    surface: '#F2F2F0',
    ink: '#0A0A0A',
    inkSoft: '#5B5B57',
    line: 'rgba(10, 10, 10, 0.12)',
    dark: '#0A0A0A',
    darkInk: '#FFFFFF',
    darkInkSoft: 'rgba(255, 255, 255, 0.65)',
    radiusSm: '0px',
    radiusCard: '0px',
    radiusLg: '0px',
    buttonStyle: 'solid-sharp',
  },
  // Dieselbe Space-Grotesk/"solid-sharp"-Struktur wie "kontrast", aber die
  // dunkle Palette (statt Weiß) -- eigenes Preset statt Override, damit
  // "kontrast" fuer andere Kunden (z. B. Malerbetrieb Müller) weiß bleibt.
  // Walsroder Döners eigenes Branding/Feedback: bewusst dunkel, kein Weiß.
  'kontrast-dunkel': {
    label: 'Kontrast Dunkel',
    headingFont: "'Space Grotesk', sans-serif",
    headingWeight: '700',
    headingTracking: '-0.02em',
    bodyFont: "'Inter', sans-serif",
    heroScale: 'clamp(3.2rem, 8vw, 6rem)',
    bg: '#141210',
    surface: '#1C1917',
    ink: '#F2EDE4',
    inkSoft: 'rgba(242, 237, 228, 0.6)',
    line: 'rgba(242, 237, 228, 0.14)',
    dark: '#0A0908',
    darkInk: '#F2EDE4',
    darkInkSoft: 'rgba(242, 237, 228, 0.65)',
    radiusSm: '3px',
    radiusCard: '6px',
    radiusLg: '10px',
    buttonStyle: 'solid-sharp',
  },
};
