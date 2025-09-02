type ApiResponseResult<T> = {
	success: boolean;
	data: T | null;
	errorMessage?: string;
};
