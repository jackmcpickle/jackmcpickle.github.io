import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public/favicon.svg'));

const sizes = [16, 32, 48];
const pngs = await Promise.all(
    sizes.map(async (size) => sharp(svg).resize(size, size).png().toBuffer()),
);

writeFileSync(join(root, 'public/favicon.ico'), await pngToIco(pngs));
console.warn('Wrote public/favicon.ico');
