#!/usr/bin/env bash
# Regenerate PNG/ICO from public/favicon.svg (requires ImageMagick)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SVG="$ROOT/public/favicon.svg"
OUT="$ROOT/public"

convert -background none "$SVG" -resize 16x16 "$OUT/favicon-16.png"
convert -background none "$SVG" -resize 32x32 "$OUT/favicon-32.png"
convert -background none "$SVG" -resize 180x180 "$OUT/apple-touch-icon.png"
convert "$OUT/favicon-16.png" "$OUT/favicon-32.png" "$OUT/favicon.ico"
echo "Favicons written to $OUT"
