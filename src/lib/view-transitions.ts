interface TransitionStep {
    name: string;
    duration: string;
    easing: string;
}

interface TransitionAnimation {
    forwards: {
        old: TransitionStep;
        new: TransitionStep;
    };
    backwards: {
        old: TransitionStep;
        new: TransitionStep;
    };
}

const crtSwapSteps = {
    forwards: {
        old: { name: 'crtSwapOut', duration: '0.18s', easing: 'steps(4, end)' },
        new: { name: 'crtSwapIn', duration: '0.22s', easing: 'steps(5, end)' },
    },
    backwards: {
        old: { name: 'crtSwapOut', duration: '0.18s', easing: 'steps(4, end)' },
        new: { name: 'crtSwapIn', duration: '0.22s', easing: 'steps(5, end)' },
    },
} satisfies TransitionAnimation;

export const crtSwap: TransitionAnimation = crtSwapSteps;
