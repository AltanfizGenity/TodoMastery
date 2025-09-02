export async function apiFetch<T>(
	url: string,
	options?: RequestInit
): Promise<ApiResponseResult<T>> {
	try {
		let response = await fetch(url, options);
		if (!response.ok) {
			const errorText = await response.text();
			return { success: false, data: null, errorMessage: errorText };
		}

		let data = (await response.json()) as T;
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			data: null,
			errorMessage: error instanceof Error ? error.message : 'Network or server error'
		};
	}
}
