import { getImage } from 'astro:assets';
import jackPhoto from '@/assets/jack-photo.png';

export { jackPhoto };

export async function resolveProfileImage(
    site: URL | string,
): Promise<{ path: string; url: string }> {
    const optimized = await getImage({
        src: jackPhoto,
        width: 512,
        height: 512,
        format: 'png',
    });

    return {
        path: optimized.src,
        url: new URL(optimized.src, site).href,
    };
}
