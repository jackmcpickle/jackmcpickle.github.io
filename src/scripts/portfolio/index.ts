/* jack.mcpickle/dev — boot screen, clock, window-open anim, power */
import { initAboutDialog, type AboutDialogClose } from './about-dialog';
import { dismissBootIfSeen, initBootScreen } from './boot';
import { initMenuClock } from './clock';
import { getById } from './dom';
import { initPageContent, resetCrtScroll } from './page-content';
import { initPowerControls } from './power';

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
).matches;

function noopAboutClose(): void {
    void 0;
}

let closeAbout: AboutDialogClose = noopAboutClose;

function initShell(instantWindows = false): void {
    closeAbout = initAboutDialog(
        getById('applebtn'),
        getById('aboutdialog'),
        getById('aboutok'),
    );

    initMenuClock(getById('menuclock'));
    initPageContent(instantWindows);
    initPowerControls(
        document.querySelector('.mac'),
        document.querySelector('.crt-content'),
        getById('powerbtn'),
        getById('shutdownbtn'),
        getById('boot'),
        closeAbout,
        reducedMotion,
    );
}

const boot = getById('boot');
initBootScreen(boot, reducedMotion);
initShell(false);

document.addEventListener('astro:page-load', () => {
    dismissBootIfSeen(getById('boot'));
    resetCrtScroll();
    initShell(true);
});
