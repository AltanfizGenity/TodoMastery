export function saveToLocalStorage(key: string, value: string) {
	localStorage.setItem(key, value);
}

export function getLocalStorageData(key: string) {
	return localStorage.getItem(key);
}
