export type AboutDialogClose = () => void;

export function initAboutDialog(
    appleBtn: HTMLElement | null,
    aboutDialog: HTMLElement | null,
    aboutOk: HTMLElement | null,
): AboutDialogClose {
    function openAbout(): void {
        if (!aboutDialog) return;
        aboutDialog.hidden = false;
        aboutOk?.focus();
    }

    function closeAbout(): void {
        if (!aboutDialog) return;
        aboutDialog.hidden = true;
        appleBtn?.focus();
    }

    appleBtn?.addEventListener('click', openAbout);
    aboutOk?.addEventListener('click', closeAbout);

    aboutDialog?.addEventListener('click', (e: MouseEvent) => {
        if (e.target === aboutDialog) closeAbout();
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape' && aboutDialog && !aboutDialog.hidden) {
            closeAbout();
        }
    });

    return closeAbout;
}
