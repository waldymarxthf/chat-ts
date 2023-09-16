/* eslint-disable no-use-before-define */
import Cookies from "js-cookie";
import { DOM_ELEMENTS, EMAIL, TOKEN } from "./constants";
import { hideElement, showElement } from "./utils";
import { createMessage } from "./chat";
import { SCROLL_HEIGHT, isNearBottom } from "./scroll";
import { WebSocketError, errorHandler, ERRORS } from "./errors";

const { COUNTER, CHAT_WINDOW, WINDOW } = DOM_ELEMENTS.CHAT;
const { WEBSOCKET_ERROR_RECIEVE, WEBSOCKET_ERROR_CONNECT, WEBSOCKET_ERROR_SEND } = ERRORS;

let socket: WebSocket | null = null;
let unreadMessage = 0;

export function scrollToEnd(): void {
	WINDOW.scrollIntoView({ behavior: "smooth", block: "end" });
}

export function resetUnreadMessages(): void {
	const isScrollNearBottom = isNearBottom(CHAT_WINDOW, SCROLL_HEIGHT);
	if (isScrollNearBottom) {
		unreadMessage = 0;
		COUNTER.textContent = `${unreadMessage}`;
		hideElement(COUNTER);
	}
}

function countUnreadMessages(): void {
	unreadMessage += 1;
	COUNTER.textContent = `${unreadMessage}`;
	showElement(COUNTER);
}

export async function handleMessage(event: MessageEvent): Promise<void> {
	try {
		const data = JSON.parse(event.data);
		const {
			text,
			user: { email, name },
			updatedAt,
		} = data;

		const message = await createMessage({
			text,
			email,
			nickname: name,
			time: updatedAt,
		});

		WINDOW.append(message);

		const isScrollNearBottom = isNearBottom(CHAT_WINDOW, SCROLL_HEIGHT);

		if (isScrollNearBottom || email === Cookies.get(EMAIL)) {
			scrollToEnd();
			resetUnreadMessages();
		} else {
			countUnreadMessages();
		}
	} catch (error) {
		errorHandler(new WebSocketError(WEBSOCKET_ERROR_RECIEVE));
	}
}

export function handleClose(): number | null {
	const token = Cookies.get(TOKEN);
	return token ? setTimeout(() => connectWebSocket(token), 1000) : null;
}

export function connectWebSocket(token: string): void {
	try {
		/* eslint-disable no-undef */
		socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
		socket.addEventListener("message", handleMessage);
		socket.addEventListener("close", handleClose);
	} catch (error) {
		errorHandler(new WebSocketError(WEBSOCKET_ERROR_CONNECT));
	}
}

export function sendWebSoket(text: string): void {
	try {
		if (socket) {
			socket.send(JSON.stringify({ text: text }));
		}
	} catch (error) {
		errorHandler(new WebSocketError(WEBSOCKET_ERROR_SEND));
	}
}

export function closeWebSoket(): void {
	if (socket) {
		socket.close();
	}
}
