import Cookies from "js-cookie";
import "emoji-picker-element";

import { DOM_ELEMENTS, TOKEN, NICKNAME, PROPERTIES, THEME, EMAIL } from "./modules/constants";
import { emojiPicker } from "./modules/emojiPicker";
import {
	handleFormAuth,
	handleFormSettings,
	handleFormVerif,
	handleFormMessage,
} from "./modules/handler";
import { modalSwitcher } from "./modules/modalActions";
import { hideSendButton, initializeUI } from "./modules/ui";
import { handleScrollVisibility } from "./modules/scroll";
import { saveToLocalStorage } from "./modules/localStorage";
import { closeWebSoket, scrollToEnd, resetUnreadMessages } from "./modules/websocket";

const { MODAL_AUTH, FORM_AUTH, ENTER_BUTTON } = DOM_ELEMENTS.AUTHORIZATION;
const { FORM_SETTINGS, MODAL_SETTINGS, INPUT_SETTINGS, THEME_SETTINGS } = DOM_ELEMENTS.SETTINGS;
const {
	FORM_MESSAGE,
	INPUT_MESSAGE,
	SETTINGS_BUTTON,
	CHAT_WINDOW,
	QUIT_BUTTON,
	ANCHOR,
	BODY,
	EMOJI_BUTTON,
	EMOJI_PICKER,
} = DOM_ELEMENTS.CHAT;
const { MODAL_VERIF, BACK_BUTTON, FORM_VERIF } = DOM_ELEMENTS.VERIFICATION;

FORM_MESSAGE.addEventListener("submit", handleFormMessage);
FORM_AUTH.addEventListener("submit", handleFormAuth);
FORM_SETTINGS.addEventListener("submit", handleFormSettings);
FORM_VERIF.addEventListener("submit", handleFormVerif);

INPUT_MESSAGE.addEventListener("input", hideSendButton);
ANCHOR.addEventListener("click", () => {
	scrollToEnd();
	resetUnreadMessages();
});
CHAT_WINDOW.addEventListener("scroll", () => {
	handleScrollVisibility();
	resetUnreadMessages();
});

ENTER_BUTTON.addEventListener("click", modalSwitcher(MODAL_AUTH, MODAL_VERIF));
BACK_BUTTON.addEventListener("click", modalSwitcher(MODAL_VERIF, MODAL_AUTH));
MODAL_VERIF.addEventListener("cancel", modalSwitcher(MODAL_VERIF, MODAL_AUTH));

MODAL_AUTH.addEventListener("cancel", (event) => {
	event.preventDefault();
});

QUIT_BUTTON.addEventListener("click", () => {
	MODAL_AUTH.showModal();
	Cookies.remove(TOKEN);
	Cookies.remove(NICKNAME);
	Cookies.remove(EMAIL);
	closeWebSoket();
});

SETTINGS_BUTTON.addEventListener("click", () => {
	MODAL_SETTINGS.showModal();
	const nickname = Cookies.get(NICKNAME);
	if (nickname) {
		INPUT_SETTINGS.value = nickname;
	}
});

THEME_SETTINGS.addEventListener("change", function () {
	BODY.className = this.value;
	saveToLocalStorage(THEME, this.value);
});

EMOJI_BUTTON.addEventListener("click", () => {
	EMOJI_PICKER.classList.toggle(PROPERTIES.HIDDEN);
});

EMOJI_PICKER.addEventListener("emoji-click", ((event: CustomEvent) => {
	const emoji = event.detail.unicode;
	emojiPicker(emoji);
}) as EventListener);

document.addEventListener("DOMContentLoaded", initializeUI);
