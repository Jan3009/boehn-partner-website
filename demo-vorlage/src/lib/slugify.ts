// Konsistent für Routing (getStaticPaths) und Links (Services.astro) genutzt
// -- muss exakt dasselbe Ergebnis liefern, sonst zeigen Links auf 404.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
