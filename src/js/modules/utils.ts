import { format } from "date-fns";
import { PROPERTIES } from "./constants";

export function showElement(element: HTMLElement, className = PROPERTIES.HIDDEN): void {
	element.classList.remove(className);
}

export function hideElement(element: HTMLElement, className = PROPERTIES.HIDDEN): void {
	element.classList.add(className);
}

export function getFormData(form: HTMLFormElement, key: string): FormDataEntryValue | null {
	const value = new FormData(form).get(key);
	if (value !== null) {
		return value;
	}
	return null;
}

export function timeConvert(time: string): string {
	const newDate = new Date(time);
	const date = format(newDate, "HH:mm");
	return date;
}
