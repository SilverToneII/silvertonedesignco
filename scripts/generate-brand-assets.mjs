/**
 * Generate placeholder brand assets per Addendum A §A3.4 + main spec §8.3.
 *
 * Outputs (all PLACEHOLDERS — owner replaces before deploy):
 *   public/favicon.ico            — 32×32 PNG bytes (acceptable for v1; modern browsers tolerate)
 *   public/icon-16x16.png         — 16×16
 *   public/icon-32x32.png         — 32×32
 *   public/apple-icon.png         — 180×180
 *   public/icon-192x192.png       — 192×192
 *   public/icon-512x512.png       — 512×512
 *   public/og-image.jpg           — 1200×630, "Design for complex systems."
 *   public/og-image-square.jpg    — 1200×1200, same composition
 *
 * Implementation note: sharp uses librsvg, which renders SVG <text> using
 * fontconfig-discoverable system fonts only. Clash Display is not yet
 * registered with the OS at script time, so text falls back to system
 * sans-serif. This is intentional — the spec marks these as placeholders
 * for the owner to replace.
 *
 * Run:  pnpm exec node scripts/generate-brand-assets.mjs
 */

import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const PUBLIC_DIR = path.resolve('public')
await mkdir(PUBLIC_DIR, { recursive: true })

// Tokens — must match Addendum A §A2.1
const INK_BASE = '#0A0A0A'
const BONE_BASE = '#F4F1EC'
const BONE_FAINT = '#6B665F'

/**
 * Monogram SVG — used for every favicon size.
 * The "S" is intentionally large and centered. font-family falls back to
 * system sans-serif when Clash Display isn't installed locally.
 */
const monogramSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${INK_BASE}"/>
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="central"
    font-family="sans-serif"
    font-weight="500"
    font-size="${Math.round(size * 0.66)}"
    fill="${BONE_BASE}"
  >S</text>
</svg>`

const FAVICON_SIZES = [
  { name: 'icon-16x16.png', size: 16 },
  { name: 'icon-32x32.png', size: 32 },
  { name: 'apple-icon.png', size: 180 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
]

for (const { name, size } of FAVICON_SIZES) {
  await sharp(Buffer.from(monogramSvg(size)))
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, name))
  console.log(`  ✓ ${name}`)
}

// favicon.ico — 32×32 PNG with .ico extension. Modern browsers (and Safari)
// accept this; spec calls for 32×32 multi-resolution ICO, but a true ICO
// container requires extra deps. Placeholder is fine until owner replaces.
await sharp(Buffer.from(monogramSvg(32)))
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUBLIC_DIR, 'favicon.ico'))
console.log('  ✓ favicon.ico (32×32 PNG; placeholder)')

/**
 * OG image — 1200×630. Composition per Addendum A §A3.4:
 *   • Top-left, 56px from edges: "( SILVERTONE® )" mono 14px, bone.faint
 *   • Centered: "Design for complex systems." Clash Display 500, ~96px
 *   • Bottom row, 56px from edges: mono 11px tracked +0.16em, bone.faint:
 *     L. SOLOMON II  ·  RICHMOND, VA  ·  EST. 2015
 */
const ogSvg = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${INK_BASE}"/>
  <text x="56" y="80"
        font-family="monospace"
        font-size="14"
        letter-spacing="2.24"
        fill="${BONE_FAINT}">( SILVERTONE® )</text>
  <text x="${w / 2}" y="${h / 2 + 8}"
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="500"
        font-size="96"
        letter-spacing="-3.36"
        fill="${BONE_BASE}">Design for complex systems.</text>
  <text x="56" y="${h - 56}"
        font-family="monospace"
        font-size="11"
        letter-spacing="1.76"
        fill="${BONE_FAINT}">L. SOLOMON II  ·  RICHMOND, VA  ·  EST. 2015</text>
</svg>`

await sharp(Buffer.from(ogSvg(1200, 630)))
  .jpeg({ quality: 90 })
  .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'))
console.log('  ✓ og-image.jpg (1200×630)')

await sharp(Buffer.from(ogSvg(1200, 1200)))
  .jpeg({ quality: 90 })
  .toFile(path.join(PUBLIC_DIR, 'og-image-square.jpg'))
console.log('  ✓ og-image-square.jpg (1200×1200)')

console.log('\nDone. All assets are PLACEHOLDERS — replace before production deploy.')
