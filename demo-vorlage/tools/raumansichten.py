#!/usr/bin/env python3
"""
Rendert Boeden perspektivisch -- als Blick in einen Raum, nicht als Draufsicht.

Warum:
Eine flache Materialkachel reicht fuer eine Musteruebersicht, traegt aber
keinen grossflaechigen Hero. Sobald der Boden in die Tiefe laeuft, mit Licht
von vorn und weicher Vignette, liest das Auge "Raum" statt "Textur" -- und
genau das braucht ein Auftritt, der das Produkt gross inszeniert.

Verfahren:
Klassische Bodenebenen-Projektion. Fuer jede Bildzeile unterhalb des Horizonts
ergibt sich aus dem Strahlensatz eine Tiefe z; daraus wird die Weltkoordinate
berechnet und die Dielentextur an dieser Stelle abgetastet. Weit entfernte
Zeilen tasten die Textur dichter ab, nahe Zeilen weiter auseinander -- dadurch
entsteht die Fluchtung ohne echtes 3D.

Aufruf:
    python3 tools/raumansichten.py
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image

from materialtexturen import fbm, holzflaeche, steinflaeche, ZIEL, SEED


def _kachel(art: str, seed: int) -> np.ndarray:
    """Erzeugt die Boden-Textur, die anschliessend projiziert wird.

    Bewusst gross und quadratisch: die Projektion tastet vor allem die
    Bildmitte dicht ab, eine kleine Kachel wuerde dort sichtbar matschen.
    """
    if art == "stein":
        return steinflaeche(1400, 1400, (112, 110, 104), (208, 205, 197), seed=seed)
    if art == "dunkel":
        return holzflaeche(1400, 1400, (38, 26, 18), (112, 78, 52), dielen=9,
                           ring_frequenz=5.4, verzerrung=3.4, seed=seed)
    if art == "mittel":
        return holzflaeche(1400, 1400, (96, 64, 37), (196, 158, 114), dielen=9,
                           ring_frequenz=4.4, verzerrung=2.9, seed=seed)
    return holzflaeche(1400, 1400, (124, 86, 51), (216, 184, 142), dielen=9,
                       ring_frequenz=4.2, verzerrung=2.7, seed=seed)


def raum(art: str, w: int = 1800, h: int = 1150, horizont: float = 0.30,
         brennweite: float = 0.78, skala: float = 3.1,
         himmel: tuple[int, int, int] = (240, 238, 234),
         waerme: float = 1.0, seed: int = SEED) -> np.ndarray:
    """Projiziert eine Bodentextur in die Tiefe.

    horizont   Anteil der Bildhoehe oberhalb dessen die Wand/das Licht liegt
    brennweite kleiner = weitwinkliger, staerkere Fluchtung
    skala      wie viele Dielenbreiten quer ins Bild passen
    """
    tex = _kachel(art, seed)
    th, tw = tex.shape[:2]

    y_h = h * horizont
    yy = np.arange(h, dtype=np.float64)[:, None]
    xx = np.arange(w, dtype=np.float64)[None, :]

    # Unterhalb des Horizonts: Tiefe aus dem Strahlensatz.
    # Direkt am Horizont laeuft z gegen unendlich -- deshalb der Mindestabstand.
    dy = np.maximum(yy - y_h, 1e-6)
    z = (brennweite * h) / dy

    # Der Versatz verhindert, dass eine Dielenfuge genau auf der Bildmitte
    # liegt. Sie faellt dort mit der Fluchtlinie zusammen und wirkt als
    # kerzengerade Linie durchs ganze Bild wie ein Rendering-Fehler.
    x_welt = (xx - w / 2.0) * z / (brennweite * h) + 0.37

    # Weltkoordinaten in Texturkoordinaten (kachelnd).
    # ACHTUNG Achsen: In der Quelltextur laufen die Dielen in x-Richtung. Damit
    # sie im Raum vom Betrachter WEG laufen (und nicht quer vor ihm liegen),
    # muss die Tiefe z auf die Texturspalte und die Querrichtung auf die
    # Texturzeile abgebildet werden -- also genau andersherum als man zuerst
    # schreibt.
    # Das zweite Modulo nach der Konvertierung ist kein Zierrat: nahe am
    # Horizont wird z sehr gross, und np.mod kann dort durch die begrenzte
    # Float-Genauigkeit exakt tw bzw. th zurueckgeben -- ein Index, den das
    # Array nicht mehr hat.
    u = np.mod(z * skala * (tw / 6.0), tw).astype(np.int32) % tw
    v = np.mod(x_welt * skala * (th / 6.0), th).astype(np.int32) % th

    boden = tex[v, u]

    # --- Licht und Atmosphaere -------------------------------------------
    # Nach hinten heller und flauer: simuliert Fensterlicht und Luftperspektive
    tiefe = np.clip((z - z.min()) / (np.percentile(z, 99) - z.min() + 1e-6), 0, 1)
    dunst = np.clip(tiefe ** 0.55, 0, 1)[:, :, None]
    licht = np.array(himmel, dtype=np.float64)[None, None, :]
    boden = boden * (1 - dunst * 0.62) + licht * (dunst * 0.62)

    # Weiches Streiflicht aus der oberen Bildmitte
    glanz = np.exp(-(((xx - w * 0.5) / (w * 0.42)) ** 2)) * np.exp(-(((yy - h * 0.52) / (h * 0.5)) ** 2))
    boden = boden * (0.90 + 0.26 * glanz[:, :, None])

    # Vignette -- ohne sie wirkt die Flaeche flach und billig
    vx = ((xx - w / 2) / (w / 2)) ** 2
    vy = ((yy - h * 0.62) / (h * 0.75)) ** 2
    boden = boden * np.clip(1.06 - 0.42 * (vx + vy), 0.35, 1.0)[:, :, None]

    # Oberhalb des Horizonts: weicher Lichtverlauf statt harter Kante.
    # Ein einziger Blend genuegt -- der Faktor ist unterhalb des Horizonts 0
    # und oberhalb (nach einer schmalen Uebergangszone) 1, sodass Boden und
    # Wand ohne sichtbare Naht ineinander laufen.
    t = np.clip(yy / max(y_h, 1e-6), 0, 1)
    wand = licht * (0.86 + 0.16 * t[:, :, None])
    misch = np.clip((y_h - yy) / (h * 0.05), 0.0, 1.0)[:, :, None]
    boden = boden * (1 - misch) + wand * misch

    # Leichte Farbtemperatur
    if waerme != 1.0:
        boden = boden * np.array([waerme, 1.0, 2.0 - waerme])[None, None, :]

    # Feines Korn -- gegen den "gerendert"-Eindruck
    korn = (fbm(np.random.default_rng(seed + 77), h, w, h // 3, w // 3, oktaven=1) - 0.5) * 9
    boden = boden + korn[:, :, None]

    return boden


def _speichern(arr: np.ndarray, name: str, q: int = 78) -> None:
    ZIEL.mkdir(parents=True, exist_ok=True)
    im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")
    p = ZIEL / name
    im.save(p, "WEBP", quality=q, method=6)
    print(f"  {name:34s} {p.stat().st_size/1024:6.1f} KB  ({im.width}x{im.height})")


def main() -> None:
    print("Rendere Raumansichten …")

    _speichern(raum("hell", 1800, 1150, horizont=0.28, skala=3.0,
                    himmel=(244, 242, 238), seed=SEED + 101),
               "raum-eiche-hell.webp")

    _speichern(raum("dunkel", 1800, 1150, horizont=0.24, brennweite=0.70, skala=3.6,
                    himmel=(46, 38, 32), waerme=1.03, seed=SEED + 102),
               "raum-raeuchereiche.webp")

    _speichern(raum("mittel", 1800, 1000, horizont=0.26, skala=3.2,
                    himmel=(238, 234, 228), seed=SEED + 103),
               "raum-landhausdiele.webp")

    _speichern(raum("stein", 1800, 1000, horizont=0.27, skala=2.4,
                    himmel=(236, 236, 234), waerme=0.99, seed=SEED + 104),
               "raum-vinyl-stein.webp")

    # Hochformat fuer die Bento-Kacheln
    _speichern(raum("hell", 1000, 1250, horizont=0.30, brennweite=0.88, skala=2.6,
                    himmel=(244, 242, 238), seed=SEED + 105),
               "raum-hoch-eiche.webp")
    _speichern(raum("dunkel", 1000, 1250, horizont=0.28, brennweite=0.84, skala=3.0,
                    himmel=(44, 36, 30), seed=SEED + 106),
               "raum-hoch-dunkel.webp")

    print("Fertig.")


if __name__ == "__main__":
    main()
