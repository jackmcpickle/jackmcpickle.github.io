import type {
    TransitionBeforePreparationEvent,
    TransitionBeforeSwapEvent,
} from 'astro:transitions/client';
import { dismissBootIfSeen } from './boot';
import { getById } from './dom';
import { resetCrtScroll } from './page-content';

const CRT_VT_STYLE_ID = 'crt-vt-bounds';

type CrtBounds = {
    top: number;
    left: number;
    width: number;
    height: number;
};

let cachedCrtBounds: CrtBounds | null = null;

function readCrtBounds(): CrtBounds | null {
    const crt =
        document.querySelector('.crt-bounds-probe') ??
        document.querySelector('.crt');
    if (!crt) return null;

    const { top, left, width, height } = crt.getBoundingClientRect();
    if (width < 50 || height < 50) return null;

    return { top, left, width, height };
}

function writeCrtViewTransitionBounds(bounds: CrtBounds): void {
    let styleEl = document.getElementById(CRT_VT_STYLE_ID);
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = CRT_VT_STYLE_ID;
        document.head.append(styleEl);
    }

    styleEl.textContent = `
::view-transition-group(crt-main) {
    position: fixed;
    top: ${bounds.top}px;
    left: ${bounds.left}px;
    width: ${bounds.width}px;
    height: ${bounds.height}px;
    overflow: clip;
    border-radius: 22px;
}
::view-transition-old(crt-main),
::view-transition-new(crt-main) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: clip;
}`;
}

function cacheCrtBounds(): boolean {
    const bounds = readCrtBounds();
    if (!bounds) return false;

    cachedCrtBounds = bounds;
    writeCrtViewTransitionBounds(bounds);
    return true;
}

function clearCrtViewTransitionBounds(): void {
    document.getElementById(CRT_VT_STYLE_ID)?.remove();
}

export function initViewTransitions(): void {
    cacheCrtBounds();
    window.addEventListener('resize', cacheCrtBounds);

    document.addEventListener(
        'astro:before-preparation',
        (_event: TransitionBeforePreparationEvent) => {
            cacheCrtBounds();
        },
    );

    document.addEventListener(
        'astro:before-swap',
        (event: TransitionBeforeSwapEvent) => {
            if (cachedCrtBounds) {
                writeCrtViewTransitionBounds(cachedCrtBounds);
            }

            event.viewTransition?.finished.finally(() => {
                clearCrtViewTransitionBounds();
                cacheCrtBounds();
            });
        },
    );

    document.addEventListener('astro:after-swap', () => {
        dismissBootIfSeen(getById('boot'));
        resetCrtScroll();
    });
}
