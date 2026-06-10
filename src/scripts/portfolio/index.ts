/* jack.mcpickle/dev — boot screen, clock, window-open anim, power */
import { initAboutDialog } from './about-dialog';
import { initBootScreen } from './boot';
import { initMenuClock } from './clock';
import { getById, queryAll } from './dom';
import { initPowerControls } from './power';
import { initWindowShades } from './window-shade';
import { initZoomableWindows } from './zoom-windows';

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
initZoomableWindows(queryAll('.window.zoomable'), reducedMotion);
initWindowShades(queryAll('.window'));
initPowerControls(
    document.querySelector('.mac'),
    document.querySelector('.crt-content'),
    getById('powerbtn'),
    getById('shutdownbtn'),
    boot,
    closeAbout,
    reducedMotion,
);
