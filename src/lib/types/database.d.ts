type ResponseResult<T> = {
	success: boolean;
	data: T | null;
	errorMessage?: string;
};
