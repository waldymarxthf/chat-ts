export function modalSwitcher(
	hideModal: HTMLDialogElement,
	showModal: HTMLDialogElement,
): () => void {
	return () => {
		hideModal.close();
		showModal.showModal();
	};
}
