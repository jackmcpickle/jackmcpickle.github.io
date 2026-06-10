import { IO_THRESHOLD, TIMINGS } from './constants';

function openAll(windows: HTMLElement[]): void {
    for (const w of windows) {
        w.classList.add('open');
    }
}

export function initZoomableWindows(
    windows: HTMLElement[],
    reducedMotion: boolean,
): void {
    if (reducedMotion || !('IntersectionObserver' in window)) {
        openAll(windows);
        return;
    }

    const vh =
        window.innerHeight || document.documentElement.clientHeight;
    let delay = 0;

    for (const w of windows) {
        const r = w.getBoundingClientRect();
        if (r.top < vh + TIMINGS.zoomViewportBufferPx) {
            setTimeout(() => w.classList.add('open'), delay);
            delay += TIMINGS.zoomStaggerMs;
        }
    }

    let ioFired = false;
    const io = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            ioFired = true;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('open');
                    io.unobserve(entry.target);
                }
            }
        },
        { threshold: IO_THRESHOLD },
    );

    for (const w of windows) {
        io.observe(w);
    }

    setTimeout(() => {
        if (!ioFired) openAll(windows);
    }, TIMINGS.ioFallbackMs);
}
