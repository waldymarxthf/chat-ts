export const TOKEN: string = "token";
export const NICKNAME = "nickname";
export const MESSAGE = "message";
export const EMAIL = "email";
export const THEME = "theme";
export const DEFAULT_THEME = "strada";
export const NAME_LENGTH = 3;

export const SERVER_URL = "https://edu.strada.one/api/user";
export const USER_URL = "https://edu.strada.one/api/user/me";
export const MESSAGES_URL = "https://edu.strada.one/api/messages/";
export const BETTERTV_URL = "https://api.betterttv.net/3/cached/users/twitch/490702236";

export const SELECTORS = {
	CHAT: {
		WINDOW_SELECTOR: ".wrapper",
		TEMPLATE_SELECTOR: "#message-template",
		MESSAGE_SELECTOR: ".chat-window__message",
		TEXT_SELECTOR: ".chat-window__message-text",
		TIME_SELECTOR: ".chat-window__message-time",
		CONTENT_SELECTOR: ".chat-window__message-content",
		AVATAR_SELECTOR: ".chat-window__message-avatar-img",
		NICKNAME_SELECTOR: ".chat-window__message-nickname",
		TEXT_EMOJI_SELECTOR: "chat-window__message-text-emoji",
	},
};

export const DOM_ELEMENTS = {
	CHAT: {
		WINDOW: <HTMLDivElement>document.querySelector(SELECTORS.CHAT.WINDOW_SELECTOR),
		TEMPLATE: <HTMLTemplateElement>document.querySelector(SELECTORS.CHAT.TEMPLATE_SELECTOR),
		CHAT_WINDOW: <HTMLDivElement>document.querySelector(".chat-window"),
		SETTINGS_BUTTON: <HTMLButtonElement>document.querySelector(".chat-header__btn-setting"),
		QUIT_BUTTON: <HTMLButtonElement>document.querySelector(".chat-header__btn-exit"),
		FORM_MESSAGE: <HTMLFormElement>document.querySelector(".chat-message__form"),
		INPUT_MESSAGE: <HTMLInputElement>document.querySelector(".chat-message__input"),
		SEND_BUTTON: <HTMLButtonElement>document.querySelector(".chat-message__btn"),
		APP: <HTMLDivElement>document.querySelector(".chat"),
		ANCHOR: <HTMLDivElement>document.querySelector(".anchor"),
		BODY: <HTMLElement>document.body,
		EMOJI_BUTTON: <HTMLButtonElement>document.querySelector(".chat-message__emoji-btn"),
		EMOJI_PICKER: document.querySelector("emoji-picker") as HTMLElementTagNameMap["emoji-picker"],
		TEXT: <HTMLSpanElement>document.querySelector(SELECTORS.CHAT.TEXT_EMOJI_SELECTOR),
		COUNTER: <HTMLParagraphElement>document.querySelector(".counter"),
	},
	AUTHORIZATION: {
		MODAL_AUTH: <HTMLDialogElement>document.querySelector(".authorization"),
		FORM_AUTH: <HTMLFormElement>document.querySelector(".authorization-form"),
		ERROR_AUTH: <HTMLParagraphElement>document.querySelector(".authorization-error"),
		COMPLETE_AUTH: <HTMLParagraphElement>document.querySelector(".authorization-complete"),
		GET_BUTTON: <HTMLButtonElement>document.querySelector(".authorization-get"),
		ENTER_BUTTON: <HTMLButtonElement>document.querySelector(".authorization-enter"),
	},
	VERIFICATION: {
		MODAL_VERIF: <HTMLDialogElement>document.querySelector(".verification"),
		FORM_VERIF: <HTMLFormElement>document.querySelector(".verification-form"),
		ERROR_VERIF: <HTMLParagraphElement>document.querySelector(".verification-error"),
		LOGIN_BUTTON: <HTMLButtonElement>document.querySelector(".verification-login"),
		BACK_BUTTON: <HTMLButtonElement>document.querySelector(".verification-back"),
	},
	SETTINGS: {
		MODAL_SETTINGS: <HTMLDialogElement>document.querySelector(".settings"),
		FORM_SETTINGS: <HTMLFormElement>document.querySelector(".settings-form"),
		INPUT_SETTINGS: <HTMLInputElement>document.querySelector(".settings-input"),
		COMPLETE_SETTINGS: <HTMLParagraphElement>document.querySelector(".settings-complete"),
		ERROR_SETTINGS: <HTMLParagraphElement>document.querySelector(".settings-error"),
		THEME_SETTINGS: <HTMLSelectElement>document.querySelector(".settings-theme-select"),
	},
};

export const PROPERTIES = {
	HIDDEN: "hidden",
	LEFT_SIDE: "left",
	RIGHT_SIDE: "right",
};

export const REQUEST_HEADER = {
	DEFAULT_HEADER: {
		"Content-Type": "application/json; charset=utf-8",
	},
};

export const REQUEST_METOD = {
	POST: "POST",
	PATCH: "PATCH",
	GET: "GET",
};

export const ERRORS = {
	SERVER_ERROR: "Error from the server",
	AUTHENTICATION_ERROR: "Authentication failed",
};
