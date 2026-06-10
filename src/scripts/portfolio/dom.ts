export function getById<T extends HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
}

export function queryAll<T extends Element>(selector: string): T[] {
    return [...document.querySelectorAll<T>(selector)];
}
