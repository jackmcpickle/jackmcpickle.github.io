import { TIMINGS } from './constants';
import { onceOnEnd } from './animation';

function setupWindowShade(win: HTMLElement): void {
    if (win.dataset.shadeInit === 'true') return;

    const bar = win.querySelector<HTMLElement>('.titlebar');
    const body = win.querySelector<HTMLElement>('.window-body');
    if (!bar || !body) return;
    const titlebar = bar;
    const windowBody = body;

    win.dataset.shadeInit = 'true';
    titlebar.setAttribute('role', 'button');
    titlebar.setAttribute('tabindex', '0');
    titlebar.setAttribute('aria-expanded', 'true');
    titlebar.title = 'Collapse window';

    function toggle(): void {
        const collapsing = !win.classList.contains('collapsed');

        if (collapsing) {
            windowBody.style.height = `${windowBody.scrollHeight}px`;
            // Force reflow so the collapse transition has a start value
            void windowBody.offsetHeight;
            win.classList.add('collapsed');
        } else {
            win.classList.remove('collapsed');
            windowBody.style.height = `${windowBody.scrollHeight}px`;
            onceOnEnd(
                windowBody,
                'transitionend',
                () => {
                    windowBody.style.height = '';
                },
                TIMINGS.shadeTransitionMs,
            );
        }

        titlebar.setAttribute('aria-expanded', collapsing ? 'false' : 'true');
        titlebar.title = collapsing ? 'Expand window' : 'Collapse window';
    }

    titlebar.addEventListener('click', toggle);
    titlebar.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
}

export function initWindowShades(windows: HTMLElement[]): void {
    for (const win of windows) {
        setupWindowShade(win);
    }
}
