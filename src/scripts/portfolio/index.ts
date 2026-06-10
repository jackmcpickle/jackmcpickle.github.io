/* jack.mcpickle/dev — boot screen, clock, window-open anim, power */
import { initAboutDialog } from './about-dialog';
import { initBootScreen } from './boot';
import { initMenuClock } from './clock';
import { getById } from './dom';
import { initPageContent, resetCrtScroll } from './page-content';
import { initPowerControls } from './power';

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
).matches;

const boot = getById('boot');
const closeAbout = initAboutDialog(
    getById('applebtn'),
    getById('aboutdialog'),
    getById('aboutok'),
);

initBootScreen(boot, reducedMotion);
initMenuClock(getById('menuclock'));
initPageContent(false);
initPowerControls(
    document.querySelector('.mac'),
    document.querySelector('.crt-content'),
    getById('powerbtn'),
    getById('shutdownbtn'),
    boot,
    closeAbout,
    reducedMotion,
);

document.addEventListener('astro:page-load', () => {
    resetCrtScroll();
    initPageContent(true);
});
