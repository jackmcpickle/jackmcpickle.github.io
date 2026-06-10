import { TIMINGS } from './constants';
import { onceOnEnd } from './animation';

function setupWindowShade(win: HTMLElement): void {
    const bar = win.querySelector<HTMLElement>('.titlebar');
    const body = win.querySelector<HTMLElement>('.window-body');
    if (!bar || !body) return;

    bar.setAttribute('role', 'button');
    bar.setAttribute('tabindex', '0');
    bar.setAttribute('aria-expanded', 'true');
    bar.title = 'Collapse window';

    function toggle(): void {
        const collapsing = !win.classList.contains('collapsed');

        if (collapsing) {
            body.style.height = `${body.scrollHeight}px`;
            // Force reflow so the collapse transition has a start value
            void body.offsetHeight;
            win.classList.add('collapsed');
        } else {
            win.classList.remove('collapsed');
            body.style.height = `${body.scrollHeight}px`;
            onceOnEnd(
                body,
                'transitionend',
                () => {
                    body.style.height = '';
                },
                TIMINGS.shadeTransitionMs,
            );
        }

        bar.setAttribute('aria-expanded', collapsing ? 'false' : 'true');
        bar.title = collapsing ? 'Expand window' : 'Collapse window';
    }

    bar.addEventListener('click', toggle);
    bar.addEventListener('keydown', (e: KeyboardEvent) => {
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
