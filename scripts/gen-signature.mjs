// Generates the email signature: rainbow classic-Mac apple + "mcpickle" pixel wordmark.
// Apple shape matches src/components/MenuBar.astro. Wordmark is self-contained pixel art
// (no font dependency) so SVG and PNG render identically in any email client.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

// --- 5x9 pixel font (baseline row 6, descenders rows 7-8) ---
const G = {
    m: ['.....', '.....', '#####', '#.#.#', '#.#.#', '#.#.#', '#.#.#', '.....', '.....'],
    c: ['.....', '.....', '.####', '#....', '#....', '#....', '.####', '.....', '.....'],
    p: ['.....', '.....', '####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
    i: ['..#..', '.....', '..#..', '..#..', '..#..', '..#..', '..#..', '.....', '.....'],
    k: ['#....', '#....', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '.....', '.....'],
    l: ['..#..', '..#..', '..#..', '..#..', '..#..', '..#..', '..##.', '.....', '.....'],
    e: ['.....', '.....', '.###.', '#...#', '#####', '#....', '.####', '.....', '.....'],
};

const WORD = 'mcpickle';
const P = 3; // pixel scale for wordmark
const GLYPH_W = 5,
    GLYPH_H = 9,
    GAP = 1;
const textW = WORD.length * GLYPH_W * P + (WORD.length - 1) * GAP * P;
const textH = GLYPH_H * P;
const INK = '#1a1a1a';

// --- apple geometry (viewBox 0 0 13 15) ---
const APPLE_VB_W = 13,
    APPLE_VB_H = 15;
const appleH = 30;
const sA = appleH / APPLE_VB_H;
const appleW = APPLE_VB_W * sA;

const padX = 8,
    padY = 8;
const gap = 14;
const contentH = Math.max(appleH, textH);
const H = Math.round(contentH + padY * 2);
const W = Math.round(padX + appleW + gap + textW + padX);

const ay = (H - appleH) / 2;
const ty = (H - textH) / 2;
const tx = padX + appleW + gap;

// classic rainbow, top -> bottom
const stripes = ['#61bb46', '#fdb827', '#f5821f', '#e03a3e', '#963d97', '#009ddc'];
const band = APPLE_VB_H / stripes.length;

const appleShape = `
    <rect x="7" y="0" width="2" height="2"/>
    <rect x="5" y="1" width="2" height="2"/>
    <path d="M2 4h4v1h2V4h4v8h-1v2H3v-2H2V4z"/>
    <rect x="0" y="6" width="2" height="4"/>
    <rect x="11" y="6" width="2" height="4"/>`;

let stripeRects = '';
stripes.forEach((c, i) => {
    stripeRects += `<rect x="0" y="${(i * band).toFixed(3)}" width="13" height="${band.toFixed(3)}" fill="${c}"/>`;
});

let wordRects = '';
[...WORD].forEach((ch, gi) => {
    const grid = G[ch];
    const gx = tx + gi * (GLYPH_W + GAP) * P;
    grid.forEach((rowStr, r) => {
        [...rowStr].forEach((cell, col) => {
            if (cell === '#') {
                wordRects += `<rect x="${gx + col * P}" y="${ty + r * P}" width="${P}" height="${P}"/>`;
            }
        });
    });
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="mcpickle" shape-rendering="crispEdges">
  <g transform="translate(${padX.toFixed(2)} ${ay.toFixed(2)}) scale(${sA.toFixed(4)})">
    <clipPath id="appleClip">${appleShape}</clipPath>
    <g clip-path="url(#appleClip)">${stripeRects}</g>
  </g>
  <g fill="${INK}">${wordRects}</g>
</svg>`;

const outDir = new URL('../public/images/', import.meta.url);
writeFileSync(new URL('jack.mcpickle.svg', outDir), svg);

// PNG at 3x for retina email rendering, transparent background
await sharp(Buffer.from(svg), { density: 288 })
    .resize({ width: W * 3 })
    .png()
    .toFile(new URL('jack.mcpickle.png', outDir).pathname);

console.log(`signature ${W}x${H}  ->  public/images/jack.mcpickle.svg + .png (${W * 3}px wide)`);
