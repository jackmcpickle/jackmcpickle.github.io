export function onceOnEnd(
    el: HTMLElement,
    event: 'animationend' | 'transitionend',
    handler: () => void,
    fallbackMs: number,
): void {
    let finished = false;

    function finish(): void {
        if (finished) return;
        finished = true;
        el.removeEventListener(event, finish);
        handler();
    }

    el.addEventListener(event, finish);
    setTimeout(finish, fallbackMs);
}
