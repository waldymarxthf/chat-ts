import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { DOM_ELEMENTS } from "./constants.js";

const { EMOJI_PICKER, INPUT_MESSAGE } = DOM_ELEMENTS.CHAT;

const style = document.createElement("style");

style.textContent = `
.picker {
	border-radius: 16px;
	box-shadow: -6px 6px 20px 5px rgba(0, 0, 0, 0.3);
	z-index: 3;
}

.tabpanel::-webkit-scrollbar {
	background-color: #222;
	width: 16px;
	border-radius: 16px;
}

.tabpanel::-webkit-scrollbar-track {
	background-color: #222;
}

.tabpanel::-webkit-scrollbar-thumb {
	background-color: #babac0;
	border-radius: 16px;
	border: 5px solid #222;
}

.tabpanel:hover::-webkit-scrollbar-thumb {
	background-color: #a0a0a5;
	border: 5px solid #222;
}

.search {
	font-family: Roboto
}`;

if (EMOJI_PICKER.shadowRoot) {
	EMOJI_PICKER.shadowRoot.appendChild(style);
}

export function emojiPicker(emoji: string): void {
	INPUT_MESSAGE.value += emoji;
	INPUT_MESSAGE.focus();
}

polyfillCountryFlagEmojis("Twemoji Mozilla");
