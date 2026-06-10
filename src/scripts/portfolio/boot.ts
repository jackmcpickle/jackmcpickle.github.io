import { STORAGE_KEYS, TIMINGS } from './constants';
import { writeStorage } from './storage';

function isBootEnabled(): boolean {
    return window['__bootEnabled'] !== false;
}

export function initBootScreen(
    boot: HTMLElement | null,
    reducedMotion: boolean,
): void {
    function dismissBoot(): void {
        boot?.classList.add('off');
    }

    try {
        const seen = sessionStorage.getItem(STORAGE_KEYS.bootSeen);
        if (seen || reducedMotion) {
            dismissBoot();
        } else {
            writeStorage(sessionStorage, STORAGE_KEYS.bootSeen, '1');
            setTimeout(() => {
                if (!isBootEnabled()) return;
                dismissBoot();
            }, TIMINGS.bootDismissMs);
        }
    } catch {
        dismissBoot();
    }

    boot?.addEventListener('click', dismissBoot);
}

export function showBootScreen(boot: HTMLElement | null): void {
    if (!boot || !isBootEnabled()) return;
    boot.classList.remove('off');
    setTimeout(() => {
        boot.classList.add('off');
    }, TIMINGS.bootDismissMs);
}
