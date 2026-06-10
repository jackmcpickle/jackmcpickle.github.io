import { onceOnEnd } from './animation';
import { showBootScreen } from './boot';
import { TIMINGS } from './constants';
import type { AboutDialogClose } from './about-dialog';

export function initPowerControls(
    mac: HTMLElement | null,
    crtContent: HTMLElement | null,
    powerBtn: HTMLElement | null,
    shutdownBtn: HTMLElement | null,
    boot: HTMLElement | null,
    closeAbout: AboutDialogClose,
    reducedMotion: boolean,
): void {
    function isOff(): boolean {
        return Boolean(mac?.classList.contains('off'));
    }

    function setPressed(): void {
        powerBtn?.setAttribute('aria-pressed', isOff() ? 'false' : 'true');
    }

    function shutDown(): void {
        if (!mac || isOff()) return;
        closeAbout();

        if (reducedMotion || !crtContent) {
            mac.classList.add('off');
            setPressed();
            return;
        }

        onceOnEnd(
            crtContent,
            'animationend',
            () => {
                crtContent.classList.remove('shutting');
                mac.classList.add('off');
                setPressed();
            },
            TIMINGS.shutdownAnimMs,
        );
        crtContent.classList.add('shutting');
    }

    function powerOn(): void {
        if (!mac || !isOff()) return;
        mac.classList.remove('off');
        setPressed();

        if (!reducedMotion && crtContent) {
            onceOnEnd(
                crtContent,
                'animationend',
                () => {
                    crtContent.classList.remove('powering');
                },
                TIMINGS.powerOnAnimMs,
            );
            crtContent.classList.add('powering');
        }

        showBootScreen(boot);
    }

    powerBtn?.addEventListener('click', () => {
        if (isOff()) powerOn();
        else shutDown();
    });

    shutdownBtn?.addEventListener('click', shutDown);
}
