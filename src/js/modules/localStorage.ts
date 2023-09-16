import { LocalStorageError, errorHandler, ERRORS } from "./errors";

const { LOCALSTORAGE_ERROR_SAVE, LOCALSTORAGE_ERROR_LOAD } = ERRORS;

export function saveToLocalStorage(key: string, value: string): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		errorHandler(new LocalStorageError(LOCALSTORAGE_ERROR_SAVE));
	}
}

export function loadFromLocalStorage(key: string): string | null {
	try {
		const result = localStorage.getItem(key);
		if (result) {
			return JSON.parse(result);
		}
		return null;
	} catch (error) {
		errorHandler(new LocalStorageError(LOCALSTORAGE_ERROR_LOAD));
		return null;
	}
}
