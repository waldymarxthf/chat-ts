import Cookies from "js-cookie";
import { getMailRequest, getUserDataRequest, changeNameRequest } from "./api";
import { DOM_ELEMENTS, EMAIL, TOKEN, NICKNAME, MESSAGE } from "./constants";
import { hideSendButton } from "./ui";
import { showElement, getFormData, hideElement } from "./utils";
import { validateEmail, validateName, validateToken, isEmpty } from "./validation";
import { closeWebSoket, connectWebSocket, sendWebSoket } from "./websocket";
import { renderMessages } from "./chat";

const { FORM_AUTH, ERROR_AUTH, COMPLETE_AUTH } = DOM_ELEMENTS.AUTHORIZATION;
const { FORM_VERIF, MODAL_VERIF, ERROR_VERIF } = DOM_ELEMENTS.VERIFICATION;
const { FORM_SETTINGS, COMPLETE_SETTINGS, ERROR_SETTINGS } = DOM_ELEMENTS.SETTINGS;
const { APP, FORM_MESSAGE } = DOM_ELEMENTS.CHAT;

export async function handleFormMessage(event: Event): Promise<void> {
	event.preventDefault();
	const inputValue = getFormData(FORM_MESSAGE, MESSAGE);

	if (typeof inputValue === "string") {
		if (!isEmpty(inputValue)) {
			sendWebSoket(inputValue);
			FORM_MESSAGE.reset();
			hideSendButton();
		}
	}
}

export async function handleFormAuth(event: Event): Promise<void> {
	try {
		event.preventDefault();
		const inputValue = getFormData(FORM_AUTH, EMAIL);

		if (typeof inputValue === "string") {
			if (validateEmail(inputValue)) {
				hideElement(ERROR_AUTH);

				if (inputValue) {
					await getMailRequest(inputValue);
				}

				showElement(COMPLETE_AUTH);
				FORM_AUTH.reset();
			} else {
				showElement(ERROR_AUTH);
				hideElement(COMPLETE_AUTH);
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		showElement(ERROR_AUTH);
	}
}

export async function handleFormVerif(event: Event): Promise<void> {
	try {
		event.preventDefault();
		const inputValue = getFormData(FORM_VERIF, TOKEN);

		if (typeof inputValue === "string") {
			if (validateToken(inputValue)) {
				showElement(ERROR_VERIF);
				FORM_VERIF.reset();
				return;
			}
		}

		if (inputValue) {
			const user = await getUserDataRequest(inputValue);
			if (user && typeof user !== "boolean") {
				Cookies.set(TOKEN, user.token, { expires: 7 });
				Cookies.set(NICKNAME, user.name);
				Cookies.set(EMAIL, user.email);
				showElement(APP);
				hideElement(ERROR_VERIF);
				const token = Cookies.get(TOKEN);
				if (token) {
					connectWebSocket(token);
				}
				renderMessages();
				MODAL_VERIF.close();
			} else {
				showElement(ERROR_VERIF);
			}
		}
		FORM_VERIF.reset();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		showElement(ERROR_VERIF);
	}
}

export async function handleFormSettings(event: Event): Promise<void> {
	try {
		event.preventDefault();
		const inputValue = getFormData(FORM_SETTINGS, NICKNAME);

		if (typeof inputValue === "string") {
			if (!validateName(inputValue)) {
				hideElement(COMPLETE_SETTINGS);
				showElement(ERROR_SETTINGS);
				return;
			}
		}

		if (inputValue) {
			const user = await changeNameRequest(inputValue);

			if (user && typeof user !== "boolean") {
				Cookies.set(NICKNAME, user.name);
				closeWebSoket(); //* бек не меняет сразу ник, поэтому приходится закрывать сокет, чтобы он переоткрывался сам и менялся ник
				hideElement(ERROR_SETTINGS);
				showElement(COMPLETE_SETTINGS);
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		showElement(ERROR_SETTINGS);
	}
}
