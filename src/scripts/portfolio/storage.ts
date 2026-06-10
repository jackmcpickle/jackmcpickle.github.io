export function readStorage(storage: Storage, key: string): string | null {
    try {
        return storage.getItem(key);
    } catch {
        return null;
    }
}

export function writeStorage(
    storage: Storage,
    key: string,
    value: string,
): void {
    try {
        storage.setItem(key, value);
    } catch {
        /* private browsing or quota exceeded */
    }
}
