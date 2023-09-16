import { getBetterTVEmoji } from "./api";
import { SELECTORS } from "./constants";

const { TEXT_EMOJI_SELECTOR } = SELECTORS.CHAT;

function createEmoji(id: string): HTMLImageElement {
	const img = document.createElement("img");
	img.src = `https://cdn.betterttv.net/emote/${id}/1x.webp`;
	return img;
}

interface SharedEmotes {
	id: string;
	code: string;
}

interface BetterTVEmoji {
	sharedEmotes: SharedEmotes[];
}

let emojiData: Promise<BetterTVEmoji | boolean> | null = null;

async function getBetterTVEmojiData(): Promise<BetterTVEmoji | boolean> {
	if (!emojiData) {
		emojiData = getBetterTVEmoji();
	}
	return emojiData;
}

export async function addBetterTVEmoji(text: string): Promise<HTMLSpanElement> {
	const emotes = await getBetterTVEmojiData();
	const words = text.split(" ");
	const container = document.createElement("span");
	container.classList.add(TEXT_EMOJI_SELECTOR);

	if (typeof emotes !== "boolean") {
		const { sharedEmotes } = emotes;

		words.forEach((word) => {
			const emote = sharedEmotes.find(({ code }) => code === word);

			if (emote) {
				const { id } = emote;
				container.append(createEmoji(id));
			} else {
				container.append(document.createTextNode(word));
			}
			container.append(document.createTextNode(" "));
		});
	}

	return container;
}
