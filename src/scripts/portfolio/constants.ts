export const STORAGE_KEYS = {
    bootSeen: 'jm_boot_seen',
    clock24h: 'jm_clock_24h',
} as const;

export const TIMINGS = {
    bootDismissMs: 1600,
    clockTickMs: 15_000,
    ioFallbackMs: 800,
    zoomStaggerMs: 120,
    zoomViewportBufferPx: 100,
    shadeTransitionMs: 320,
    shutdownAnimMs: 700,
    powerOnAnimMs: 800,
} as const;

export const IO_THRESHOLD = 0.12;
