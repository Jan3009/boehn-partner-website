import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Baut die statischen Demo-Seiten direkt ins Hauptrepo unter /demo/<slug>/,
// damit sie ganz normal über das bestehende GitHub Pages "Deploy from branch"
// mit ausgeliefert werden. Kein separates Hosting, kein CI/CD nötig.
export default defineConfig({
  outDir: '../demo',
  // Die Demos leben unter böhnpartner.de/demo/<slug>/, nicht an der
  // Domain-Wurzel -- ohne "base" verlinkt Astro sein eigenes CSS/JS
  // root-relativ (/_astro/...) und es entsteht ein 404, weil die Dateien
  // tatsächlich unter /demo/_astro/... liegen.
  base: '/demo',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
