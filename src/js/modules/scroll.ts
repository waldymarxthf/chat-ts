import { DOM_ELEMENTS } from "./constants";
import { hideElement, showElement } from "./utils";

const { ANCHOR, CHAT_WINDOW } = DOM_ELEMENTS.CHAT;

export const SCROLL_HEIGHT = 100;

export function isNearBottom(element: HTMLElement, threshold = SCROLL_HEIGHT): boolean {
	return element.scrollHeight - (element.scrollTop + element.clientHeight) <= threshold;
}

export function handleScrollVisibility(): void {
	const isScrollNearBottom = isNearBottom(CHAT_WINDOW, SCROLL_HEIGHT);
	return isScrollNearBottom ? hideElement(ANCHOR) : showElement(ANCHOR);
}
