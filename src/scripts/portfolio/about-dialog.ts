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

    if (appleBtn && appleBtn.dataset.aboutInit !== 'true') {
        appleBtn.dataset.aboutInit = 'true';
        appleBtn.addEventListener('click', openAbout);
    }

    if (aboutOk && aboutOk.dataset.aboutInit !== 'true') {
        aboutOk.dataset.aboutInit = 'true';
        aboutOk.addEventListener('click', closeAbout);
    }

    if (aboutDialog && aboutDialog.dataset.aboutInit !== 'true') {
        aboutDialog.dataset.aboutInit = 'true';
        aboutDialog.addEventListener('click', (e: MouseEvent) => {
            if (e.target === aboutDialog) closeAbout();
        });
    }

    if (!document.documentElement.dataset.aboutEscapeInit) {
        document.documentElement.dataset.aboutEscapeInit = 'true';
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const dialog = document.getElementById('aboutdialog');
            if (e.key === 'Escape' && dialog && !dialog.hidden) {
                dialog.hidden = true;
                document.getElementById('applebtn')?.focus();
            }
        });
    }

    return closeAbout;
}
