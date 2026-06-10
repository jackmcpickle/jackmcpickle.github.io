export function getById(id: string): HTMLElement | null {
    return document.getElementById(id);
}

export function queryAll<T extends Element>(selector: string): T[] {
    return [...document.querySelectorAll<T>(selector)];
}
