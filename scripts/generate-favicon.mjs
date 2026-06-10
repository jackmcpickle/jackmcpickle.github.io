import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public/favicon.svg'));

const sizes = [16, 32, 48];
const pngs = await Promise.all(
    sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()),
);

writeFileSync(join(root, 'public/favicon.ico'), await pngToIco(pngs));
console.log('Wrote public/favicon.ico');
