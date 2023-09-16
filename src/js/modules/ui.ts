import Cookies from "js-cookie";
import { DOM_ELEMENTS, TOKEN, THEME, DEFAULT_THEME } from "./constants";
import { loadFromLocalStorage } from "./localStorage";
import { showElement, hideElement } from "./utils";
import { isEmpty } from "./validation";
import { connectWebSocket } from "./websocket";
import { renderMessages } from "./chat";

const { INPUT_MESSAGE, SEND_BUTTON, APP, BODY } = DOM_ELEMENTS.CHAT;
const { MODAL_AUTH } = DOM_ELEMENTS.AUTHORIZATION;
const { THEME_SETTINGS } = DOM_ELEMENTS.SETTINGS;

export function hideSendButton(): void {
	return !isEmpty(INPUT_MESSAGE.value) ? showElement(SEND_BUTTON) : hideElement(SEND_BUTTON);
}

export function initializeUI(): void {
	const token = Cookies.get(TOKEN);
	if (token) {
		connectWebSocket(token);
		showElement(APP);
		renderMessages();
		MODAL_AUTH.close();
	} else {
		MODAL_AUTH.showModal();
	}
	const theme = loadFromLocalStorage(THEME) || DEFAULT_THEME;
	BODY.className = theme;
	THEME_SETTINGS.value = theme;
}
