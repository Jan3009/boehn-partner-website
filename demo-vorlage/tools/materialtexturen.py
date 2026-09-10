#!/usr/bin/env python3
"""
Erzeugt prozedurale Materialtexturen (Holz, Stein, Kork, WPC) als WebP.

Warum ueberhaupt gerechnete Texturen statt Fotos?
-------------------------------------------------
Fuer einen unverbindlichen Kaltakquise-Entwurf liegen typischerweise noch
keine Fotos des Betriebs vor. Fotos aus dem Google-Profil oder von der alten
Website zu uebernehmen ist rechtlich heikel (Nutzungsrechte liegen oft beim
damaligen Dienstleister oder beim Bodenhersteller), Stockfotos sehen nach
Baukasten aus, und graue Platzhalterflaechen ruinieren einen Premium-Entwurf.

Bodenbelag ist aber ein *Material* -- und Material laesst sich rechnen. Die
Ergebnisse sind bewusst als Materialdarstellung erkennbar und werden auf der
Seite auch so beschriftet; sie geben NICHT vor, Referenzobjekte des Betriebs
zu sein. Sobald echte Fotos vorliegen, ersetzt man sie eins zu eins.

Aufruf:
    python3 tools/materialtexturen.py

Schreibt nach public/images/demos/fussbodenprojekte-walsrode/.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image

ZIEL = Path(__file__).resolve().parents[1] / "public/images/demos/fussbodenprojekte-walsrode"

# Ein fester Seed haelt die Texturen ueber Builds hinweg identisch -- sonst
# sieht die Seite nach jedem Lauf anders aus und Git bekommt bei jedem Build
# einen Diff auf allen Bilddateien.
SEED = 20260910


# ---------------------------------------------------------------------------
# Rausch-Grundlagen
# ---------------------------------------------------------------------------

def _glatt(rng: np.random.Generator, h: int, w: int, zellen_y: int, zellen_x: int) -> np.ndarray:
    """Ein Gitter aus Zufallswerten, bilinear auf (h, w) hochskaliert.

    Bewusst ohne scipy: das Grobgitter wird per Index-Interpolation gestreckt.
    Das ergibt weiches Value-Noise, das als fBm-Oktave voellig ausreicht.
    """
    zellen_y = max(2, zellen_y)
    zellen_x = max(2, zellen_x)
    grob = rng.random((zellen_y + 1, zellen_x + 1))

    # Zielkoordinaten auf das Grobgitter abbilden
    ys = np.linspace(0, zellen_y, h, endpoint=False)
    xs = np.linspace(0, zellen_x, w, endpoint=False)
    y0 = ys.astype(int)
    x0 = xs.astype(int)
    fy = (ys - y0)[:, None]
    fx = (xs - x0)[None, :]

    # Smoothstep statt linear -- ohne das bekommt man sichtbare Gitterkanten
    fy = fy * fy * (3 - 2 * fy)
    fx = fx * fx * (3 - 2 * fx)

    a = grob[np.ix_(y0, x0)]
    b = grob[np.ix_(y0, x0 + 1)]
    c = grob[np.ix_(y0 + 1, x0)]
    d = grob[np.ix_(y0 + 1, x0 + 1)]

    oben = a + (b - a) * fx
    unten = c + (d - c) * fx
    return oben + (unten - oben) * fy


def fbm(rng: np.random.Generator, h: int, w: int, zellen_y: int, zellen_x: int,
        oktaven: int = 5, persistenz: float = 0.5) -> np.ndarray:
    """Fraktales Rauschen: mehrere Oktaven mit halbierender Amplitude.

    zellen_y/zellen_x getrennt, damit sich die Textur in eine Richtung
    strecken laesst -- genau das macht aus isotropem Rauschen eine Holzmaserung
    (lang in Faserrichtung, fein quer dazu).
    """
    summe = np.zeros((h, w), dtype=np.float64)
    amplitude = 1.0
    gesamt = 0.0
    for i in range(oktaven):
        summe += amplitude * _glatt(rng, h, w, zellen_y * 2 ** i, zellen_x * 2 ** i)
        gesamt += amplitude
        amplitude *= persistenz
    return summe / gesamt


def _mische(dunkel: tuple[int, int, int], hell: tuple[int, int, int],
            t: np.ndarray) -> np.ndarray:
    """Farbverlauf zwischen zwei RGB-Toenen anhand einer 0..1-Maske."""
    d = np.array(dunkel, dtype=np.float64)
    he = np.array(hell, dtype=np.float64)
    return d[None, None, :] + (he - d)[None, None, :] * t[:, :, None]


def _speichern(arr: np.ndarray, name: str, qualitaet: int = 72) -> None:
    ZIEL.mkdir(parents=True, exist_ok=True)
    bild = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGB")
    pfad = ZIEL / name
    bild.save(pfad, "WEBP", quality=qualitaet, method=6)
    print(f"  {name:38s} {pfad.stat().st_size / 1024:6.1f} KB  ({bild.width}x{bild.height})")


# ---------------------------------------------------------------------------
# Holz
# ---------------------------------------------------------------------------

def holzflaeche(h: int, w: int, dunkel: tuple[int, int, int], hell: tuple[int, int, int],
                dielen: int = 5, ring_frequenz: float = 5.0, verzerrung: float = 3.2,
                versatz: float = 0.5, fuge: float = 0.16, seed: int = SEED) -> np.ndarray:
    """Ein Dielenboden von oben.

    Aufbau pro Diele: verzerrte Laengsmaserung (Jahresringe) + feine Poren +
    eigene Grundhelligkeit. Die Dielen sind reihenweise versetzt und durch
    eine dunkle Fuge getrennt -- ohne die liest das Auge die Flaeche nicht als
    verlegten Boden, sondern als abstraktes Muster.
    """
    rng = np.random.default_rng(seed)
    hoehe_diele = h / dielen

    ergebnis = np.zeros((h, w, 3), dtype=np.float64)
    yy = np.arange(h)[:, None].repeat(w, axis=1)
    xx = np.arange(w)[None, :].repeat(h, axis=0)

    # Maserung wird einmal fuer die ganze Flaeche gerechnet und dann pro Diele
    # angeschnitten -- billiger als pro Diele, und der Versatz sorgt trotzdem
    # dafuer, dass keine zwei Dielen gleich aussehen.
    turbulenz = fbm(rng, h, w, zellen_y=max(2, int(dielen * 3)), zellen_x=3, oktaven=5)
    poren = fbm(rng, h, w, zellen_y=h // 3, zellen_x=max(2, w // 90), oktaven=2)

    diele_idx = np.floor(yy / hoehe_diele).astype(int)

    # Phase pro Diele: verschiebt die Maserung, damit die Ringe nicht ueber die
    # Fuge hinweg durchlaufen.
    phasen = rng.random(dielen + 1) * 10.0
    helligkeiten = 1.0 + (rng.random(dielen + 1) - 0.5) * 0.13

    lokal_y = (yy - diele_idx * hoehe_diele) / hoehe_diele  # 0..1 in der Diele

    ring = np.sin(
        (lokal_y * ring_frequenz + phasen[diele_idx] + turbulenz * verzerrung) * math.pi
    )
    ring = np.abs(ring) ** 0.75                       # harte Ringe, weiche Zwischenraeume
    ring = ring * 0.82 + poren * 0.18                 # Poren daruebermischen

    ring = ring * helligkeiten[diele_idx]
    ring = np.clip(ring, 0.0, 1.0)

    ergebnis[:] = _mische(dunkel, hell, ring)

    # Quer-Stossfugen: pro Reihe versetzt, damit es nach echtem Verband aussieht
    breite_diele = w * 1.9
    stoss = np.mod(xx + diele_idx * breite_diele * versatz, breite_diele)
    ist_stoss = stoss < max(1.0, w * 0.0035)

    # Laengsfuge zwischen den Dielen
    rand = np.minimum(lokal_y, 1.0 - lokal_y) * hoehe_diele
    ist_fuge = rand < max(1.0, hoehe_diele * fuge * 0.25)

    schatten = np.where(ist_fuge | ist_stoss, 0.62, 1.0)[:, :, None]
    ergebnis *= schatten

    # Sanfter Lichtverlauf ueber die Flaeche -- ohne den wirkt die Textur flach
    licht = 0.90 + 0.20 * fbm(np.random.default_rng(seed + 1), h, w, 2, 2, oktaven=2)
    ergebnis *= licht[:, :, None]

    return ergebnis


# ---------------------------------------------------------------------------
# Weitere Materialien
# ---------------------------------------------------------------------------

def steinflaeche(h: int, w: int, dunkel: tuple[int, int, int], hell: tuple[int, int, int],
                 seed: int = SEED) -> np.ndarray:
    """Vinyl in Steinoptik: grossformatige Platten mit wolkiger Aderung."""
    rng = np.random.default_rng(seed)
    grund = fbm(rng, h, w, 3, 3, oktaven=6, persistenz=0.58)

    # Adern entstehen an den Nulldurchgaengen eines verzerrten Sinus
    verzerrung = fbm(rng, h, w, 2, 2, oktaven=4)
    adern = np.abs(np.sin((grund * 3.0 + verzerrung * 2.0) * math.pi * 2))
    adern = 1.0 - np.clip(adern * 2.2, 0, 1)

    t = np.clip(grund * 0.72 + adern * 0.42, 0, 1)
    ergebnis = _mische(dunkel, hell, t)

    # Plattenraster
    yy = np.arange(h)[:, None]
    xx = np.arange(w)[None, :]
    plat_h, plat_w = h / 2.0, w / 2.0
    fuge = (np.mod(yy, plat_h) < max(1, h * 0.004)) | (np.mod(xx, plat_w) < max(1, w * 0.004))
    ergebnis *= np.where(fuge, 0.80, 1.0)[:, :, None]
    return ergebnis


def korkflaeche(h: int, w: int, dunkel: tuple[int, int, int], hell: tuple[int, int, int],
                seed: int = SEED) -> np.ndarray:
    """Kork: dicht gepackte Granulat-Kruemel, kaum Richtung."""
    rng = np.random.default_rng(seed)
    fein = fbm(rng, h, w, h // 12, w // 12, oktaven=2, persistenz=0.65)
    grob = fbm(rng, h, w, 6, 6, oktaven=3)

    # Kontrast anziehen -> einzelne Kruemel treten hervor
    t = np.clip((fein - 0.5) * 2.1 + 0.5, 0, 1) * 0.75 + grob * 0.25
    return _mische(dunkel, hell, np.clip(t, 0, 1))


def wpcflaeche(h: int, w: int, dunkel: tuple[int, int, int], hell: tuple[int, int, int],
               dielen: int = 6, seed: int = SEED) -> np.ndarray:
    """WPC-Terrassendiele: laengs geriffelt, matt, sehr gleichmaessig."""
    rng = np.random.default_rng(seed)
    hoehe_diele = h / dielen
    yy = np.arange(h)[:, None].repeat(w, axis=1)

    rillen = 0.5 + 0.5 * np.sin(yy / hoehe_diele * math.pi * 2 * 9)
    rauschen = fbm(rng, h, w, h // 8, 4, oktaven=3)
    t = np.clip(rillen * 0.55 + rauschen * 0.45, 0, 1)

    ergebnis = _mische(dunkel, hell, t)

    lokal = np.mod(yy, hoehe_diele)
    fuge = (lokal < max(1, hoehe_diele * 0.05)) | (lokal > hoehe_diele - max(1, hoehe_diele * 0.05))
    ergebnis *= np.where(fuge, 0.55, 1.0)[:, :, None]
    return ergebnis


# ---------------------------------------------------------------------------
# Konkrete Ausgaben
# ---------------------------------------------------------------------------

def main() -> None:
    print(f"Schreibe Materialtexturen nach {ZIEL} …")

    # Hero: ruhige, helle Eiche, quer ueber den Bildschirm
    _speichern(
        holzflaeche(1080, 1920, (108, 72, 42), (208, 174, 132),
                    dielen=7, ring_frequenz=4.2, verzerrung=2.6, seed=SEED),
        "hero-eiche.webp", qualitaet=74,
    )

    # Materialbibliothek -- Hochformat, weil die Tafeln nebeneinander laufen
    tafeln = [
        ("material-eiche-natur.webp",
         holzflaeche(1200, 900, (122, 84, 50), (214, 181, 139), dielen=4,
                     ring_frequenz=4.6, verzerrung=2.9, seed=SEED + 11)),
        ("material-raeuchereiche.webp",
         holzflaeche(1200, 900, (44, 30, 21), (118, 84, 58), dielen=4,
                     ring_frequenz=5.2, verzerrung=3.4, seed=SEED + 12)),
        ("material-landhausdiele.webp",
         holzflaeche(1200, 900, (98, 66, 38), (198, 162, 118), dielen=3,
                     ring_frequenz=3.4, verzerrung=2.4, seed=SEED + 13)),
        ("material-vinyl-stein.webp",
         steinflaeche(1200, 900, (108, 106, 100), (206, 203, 194), seed=SEED + 14)),
        ("material-kork.webp",
         korkflaeche(1200, 900, (128, 88, 48), (206, 160, 104), seed=SEED + 15)),
        ("material-wpc-terrasse.webp",
         wpcflaeche(1200, 900, (72, 66, 58), (140, 128, 112), dielen=5, seed=SEED + 16)),
    ]
    for name, arr in tafeln:
        _speichern(arr, name)

    # Breite Flaechen fuer die Ausstellungs- und Treppen-Sektion
    _speichern(
        holzflaeche(900, 1400, (132, 92, 55), (222, 190, 148), dielen=5,
                    ring_frequenz=4.0, verzerrung=2.7, seed=SEED + 21),
        "flaeche-ausstellung.webp",
    )
    _speichern(
        holzflaeche(900, 1400, (58, 40, 27), (146, 108, 74), dielen=6,
                    ring_frequenz=5.6, verzerrung=3.6, seed=SEED + 22),
        "flaeche-treppe.webp",
    )

    print("Fertig.")


if __name__ == "__main__":
    main()
