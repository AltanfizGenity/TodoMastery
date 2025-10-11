<script lang="ts">
	import { enhance } from '$app/forms';
	import BaseButton from '$lib/components/buttons/BaseButton.svelte';
	import InputGroup from '$lib/components/forms/InputGroup.svelte';

	let errorMessage = $state('');
</script>

<div class="sign-in flex p-8 w-full gap-8 min-h-svh bg-white">
	<div class="register-form relative justify-center p-4 flex w-full">
		<div class="form-container flex flex-col max-w-[32rem] w-96 gap-10 items-center">
			<div class="logo">
				<img src="/logo.svg" alt="Todomastery logo" class="w-16" />
			</div>
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							window.location.href = '/app/';
						}

						if (result.type === 'failure') {
							if (result.data) {
								errorMessage = result.data.message as string;
								console.log(errorMessage);
							}
						}
					};
				}}
				class="flex flex-col gap-8 w-full"
			>
				<header class="flex flex-col gap-2 text-center">
					<h1 class="font-bold text-3xl">Welcome Back!</h1>
					<p class="text-sm text-gray-400">Ready For Another Productive Day?</p>
				</header>
				<div class="input-container flex flex-col gap-6">
					<InputGroup>
						<label for="email" class="text-sm text-gray-500 capitalize">email</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							class="border-1 border-gray-300 rounded-lg p-2"
						/>
					</InputGroup>

					<InputGroup>
						<label for="password" class="text-sm text-gray-500 capitalize">password</label>
						<input
							type="password"
							name="password"
							id="password"
							required
							class="border-1 border-gray-300 rounded-lg p-2"
						/>
					</InputGroup>

					{#if errorMessage}
						<p class="text-red-400">⚠️ {errorMessage}</p>
					{/if}

					<div class="helper flex flex-col gap-2">
						<p class="text-sm text-gray-400">
							<a href="#" class="hover:underline">Forgot Password?</a>
						</p>
						<p class="text-sm text-gray-400">
							New to Todomastery? <a
								href="/auth/register"
								class="hover:underline hover:text-amber-500">Sign Up</a
							>
						</p>
					</div>

					<BaseButton
						text="Sign In"
						variant="primary"
						type="submit"
						class="!rounded-full text-white text-sm py-3 mt-4"
					/>
				</div>
			</form>
		</div>
	</div>
</div>
