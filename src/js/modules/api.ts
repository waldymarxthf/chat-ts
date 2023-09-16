import Cookies from "js-cookie";
import {
	REQUEST_HEADER,
	REQUEST_METOD,
	SERVER_URL,
	TOKEN,
	USER_URL,
	MESSAGES_URL,
	ERRORS,
	BETTERTV_URL,
} from "./constants";
import { errorHandler, ServerError, AuthorizationError } from "./errors";

interface NameRequest {
	name: string;
}

interface UserDataRequest {
	email: string;
	name: string;
	token: string;
}

interface User {
	email: string;
	name: string;
}

interface Messages {
	text: string;
	updatedAt: string;
	user: User;
}

interface MessagesRequest {
	messages: Messages[];
}

interface SharedEmotes {
	id: string;
	code: string;
}

interface BetterTVEmoji {
	sharedEmotes: SharedEmotes[];
}

async function makeRequest<T>(url: string, options?: RequestInit): Promise<T | boolean> {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			if (response.status === 401) {
				throw new AuthorizationError(ERRORS.AUTHENTICATION_ERROR);
			} else {
				throw new ServerError(ERRORS.SERVER_ERROR);
			}
		}

		return await response.json();
	} catch (error) {
		errorHandler(error as Error);
		return false;
	}
}

export async function getMailRequest(email: FormDataEntryValue): Promise<void | boolean> {
	return makeRequest<void | boolean>(SERVER_URL, {
		method: REQUEST_METOD.POST,
		headers: REQUEST_HEADER.DEFAULT_HEADER,
		body: JSON.stringify({ email }),
	});
}

export async function changeNameRequest(name: FormDataEntryValue): Promise<NameRequest | boolean> {
	return makeRequest<NameRequest | boolean>(SERVER_URL, {
		method: REQUEST_METOD.PATCH,
		headers: {
			...REQUEST_HEADER.DEFAULT_HEADER,
			Authorization: `Bearer ${Cookies.get(TOKEN)}`,
		},
		body: JSON.stringify({ name }),
	});
}

export async function getUserDataRequest(
	token: FormDataEntryValue,
): Promise<UserDataRequest | boolean> {
	return makeRequest<UserDataRequest | boolean>(USER_URL, {
		method: REQUEST_METOD.GET,
		headers: {
			...REQUEST_HEADER.DEFAULT_HEADER,
			Authorization: `Bearer ${token}`,
		},
	});
}

export async function getMessages(): Promise<MessagesRequest | boolean> {
	return makeRequest<MessagesRequest | boolean>(MESSAGES_URL, {
		method: REQUEST_METOD.GET,
		headers: {
			...REQUEST_HEADER.DEFAULT_HEADER,
			Authorization: `Bearer ${Cookies.get(TOKEN)}`,
		},
	});
}

export async function getBetterTVEmoji(): Promise<BetterTVEmoji | boolean> {
	return makeRequest<BetterTVEmoji | boolean>(BETTERTV_URL);
}
