import { getById, queryAll } from './dom';
import { initWindowShades } from './window-shade';
import { initZoomableWindows } from './zoom-windows';

function initPortraitFallback(): void {
    const portrait = document.querySelector<HTMLImageElement>('.portrait img');
    if (!portrait || portrait.dataset.errorBound === 'true') return;

    portrait.dataset.errorBound = 'true';
    portrait.addEventListener('error', () => {
        portrait.style.display = 'none';
        portrait.parentElement?.classList.add('no-photo');
    });
}

export function initPageContent(instantWindows = false): void {
    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;

    initZoomableWindows(
        queryAll<HTMLElement>('.window.zoomable'),
        reducedMotion,
        instantWindows,
    );
    initWindowShades(queryAll<HTMLElement>('.window'));
    initPortraitFallback();
}

export function resetCrtScroll(): void {
    const crt = getById('crt');
    if (!crt) return;

    const hashTarget = window.location.hash
        ? crt.querySelector<HTMLElement>(window.location.hash)
        : null;

    if (hashTarget) {
        hashTarget.scrollIntoView();
        return;
    }

    crt.scrollTo({ top: 0, behavior: 'auto' });
}
