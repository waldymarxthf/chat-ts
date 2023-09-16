import { NAME_LENGTH } from "./constants";

export function validateEmail(email: FormDataEntryValue): boolean {
	const emailRegular =
		/^(([^<>()[\].,;:"@\s]+(\.[^<>()[\].,;:"@\s]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (typeof email === "string") {
		return emailRegular.test(email);
	}

	return false;
}

export function validateToken(token: FormDataEntryValue): boolean {
	const russianLetterRegex = /^[а-яА-ЯёЁ]+$/;
	if (typeof token === "string") {
		return russianLetterRegex.test(token);
	}
	return false;
}

export function validateName(name: FormDataEntryValue): boolean {
	if (typeof name === "string") {
		return name.length >= NAME_LENGTH;
	}
	return false;
}

export function isEmpty(input: FormDataEntryValue): boolean {
	if (typeof input === "string") {
		return !input || input.trim() === "";
	}
	return false;
}
