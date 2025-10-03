import type { NewUser, User } from '$lib/database/server/schema/users';
import { apiFetch } from '$lib/utils/api';

export async function createUserDB(newUser: NewUser): Promise<ApiResponseResult<User>> {
	return apiFetch('/api/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser)
	});
}
