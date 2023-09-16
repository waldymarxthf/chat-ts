import Cookies from "js-cookie";
import { SELECTORS, PROPERTIES, DOM_ELEMENTS, EMAIL } from "./constants";
import { showElement, timeConvert } from "./utils";
import { addBetterTVEmoji } from "./betterTV";
import { getMessages } from "./api";
import { DEFAULT_ICON, MEMBERS } from "./members";

const {
	MESSAGE_SELECTOR,
	TEXT_SELECTOR,
	TIME_SELECTOR,
	CONTENT_SELECTOR,
	AVATAR_SELECTOR,
	NICKNAME_SELECTOR,
} = SELECTORS.CHAT;
const { WINDOW, TEMPLATE, CHAT_WINDOW } = DOM_ELEMENTS.CHAT;

function changeIcon(email: string): string {
	const member = MEMBERS.find((user) => user.email === email);
	return member ? member.icon : DEFAULT_ICON;
}

interface CreateMessageArgs {
	text: string;
	email: string;
	nickname: string;
	time: string;
}

export async function createMessage({
	text,
	email,
	nickname,
	time,
}: CreateMessageArgs): Promise<HTMLDivElement> {
	const type = email === Cookies.get(EMAIL) ? PROPERTIES.RIGHT_SIDE : PROPERTIES.LEFT_SIDE;

	const item = TEMPLATE.content.cloneNode(true) as HTMLTemplateElement;
	const message = item.querySelector(MESSAGE_SELECTOR) as HTMLDivElement;
	const textElem = message.querySelector(TEXT_SELECTOR);
	const timeElem = message.querySelector(TIME_SELECTOR);
	const contentElem = message.querySelector(CONTENT_SELECTOR);
	const avatarElem = message.querySelector(AVATAR_SELECTOR) as HTMLImageElement;
	const nicknameElem = message.querySelector(NICKNAME_SELECTOR) as HTMLParagraphElement;

	const betterTVEmojiText = await addBetterTVEmoji(text);
	if (textElem) {
		textElem.append(betterTVEmojiText);
	}
	if (timeElem) {
		timeElem.textContent = timeConvert(time);
	}
	if (contentElem) {
		contentElem.classList.add(`content-${type}`);
	}
	message.classList.add(`message-${type}`);

	if (type === PROPERTIES.LEFT_SIDE) {
		if (avatarElem) {
			avatarElem.src = changeIcon(email);
			if (avatarElem.parentElement) {
				showElement(avatarElem.parentElement);
			}
		}
		if (nicknameElem) {
			nicknameElem.textContent = nickname;
			showElement(nicknameElem);
		}
	}
	return message;
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

let loadedMessages: Messages[] = [];
let currentMessage = 0;
const nextMessages = 20;

async function loadMessages(): Promise<void> {
	const messagesData = await getMessages();
	if (typeof messagesData !== "boolean") {
		loadedMessages = messagesData.messages;
	}
}

export async function renderMessages(): Promise<void> {
	const prevScrollHeight = CHAT_WINDOW.scrollHeight;

	await loadMessages();
	const messagesToRender = loadedMessages
		.slice(currentMessage, currentMessage + nextMessages)
		.reverse();

	const messagesPromises = messagesToRender.map((element) => {
		const {
			user: { email, name },
			text,
			updatedAt,
		} = element;
		return createMessage({
			text,
			email: email,
			nickname: name,
			time: updatedAt,
		});
	});

	const messages = await Promise.all(messagesPromises);
	WINDOW.prepend(...messages);

	const newScrollHeight = CHAT_WINDOW.scrollHeight;
	CHAT_WINDOW.scrollTop += newScrollHeight - prevScrollHeight;

	currentMessage += nextMessages;
}

CHAT_WINDOW.addEventListener("scroll", () => {
	return CHAT_WINDOW.scrollTop === 0 && renderMessages();
});
