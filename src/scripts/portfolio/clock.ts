import { STORAGE_KEYS, TIMINGS } from './constants';
import { readStorage, writeStorage } from './storage';

function clockLabel(use24h: boolean): string {
    return use24h
        ? 'Current time, 24-hour format. Click to switch to 12-hour format.'
        : 'Current time, 12-hour format. Click to switch to 24-hour format.';
}

export function formatTime(date: Date, use24h: boolean): string {
    const h = date.getHours();
    const m = date.getMinutes();
    const mStr = m < 10 ? `0${m}` : String(m);

    if (use24h) {
        const hStr = h < 10 ? `0${h}` : String(h);
        return `${hStr}:${mStr}`;
    }

    const ap = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${mStr} ${ap}`;
}

let clockInterval: ReturnType<typeof setInterval> | null = null;

export function initMenuClock(clock: HTMLElement | null): void {
    if (!clock) return;
    const clockEl = clock;

    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }

    let clock24h = readStorage(localStorage, STORAGE_KEYS.clock24h) === '1';

    function tick(): void {
        clockEl.textContent = formatTime(new Date(), clock24h);
        clockEl.setAttribute('aria-label', clockLabel(clock24h));
    }

    clockEl.addEventListener('click', () => {
        clock24h = !clock24h;
        writeStorage(localStorage, STORAGE_KEYS.clock24h, clock24h ? '1' : '0');
        tick();
    });

    tick();
    clockInterval = setInterval(tick, TIMINGS.clockTickMs);
}
