<script lang="ts">
	import { enhance } from '$app/forms';
	import BaseButton from '$lib/components/buttons/BaseButton.svelte';
	import InputGroup from '$lib/components/forms/InputGroup.svelte';

	let errorMessage = $state('');
</script>

<div class="sign-up grid grid-cols-[1fr_0.8fr] p-8 w-full gap-8 min-h-svh bg-white">
	<div class="register-form relative justify-center p-4 flex">
		<div class="form-container flex flex-col w-[60%] max-w-[32rem] gap-10">
			<div class="logo">
				<img src="/logo-text.svg" alt="Todomastery logo text" class="w-20" />
			</div>
			<form
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							window.location.href = '/auth/login';
						}

						if (result.type === 'failure') {
							if (result.data) {
								errorMessage = result.data.message as string;
							}
						}
					};
				}}
				class="flex flex-col gap-8"
			>
				<header class="flex flex-col gap-2">
					<h1 class="font-bold text-3xl">Create an account</h1>
					<p class="text-sm">
						Already have an account? <a href="/auth/login" class="text-amber-500 hover:underline"
							>Sign In</a
						>
					</p>
				</header>
				<div class="input-container flex flex-col gap-6">
					<InputGroup>
						<label for="username" class="text-gray-500 capitalize">username</label>
						<input
							type="text"
							name="username"
							id="username"
							required
							class="border-1 border-gray-300 rounded-lg p-1"
						/>
					</InputGroup>

					<InputGroup>
						<label for="email" class="text-gray-500 capitalize">email</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							class="border-1 border-gray-300 rounded-lg p-1"
						/>
					</InputGroup>

					<InputGroup>
						<label for="password" class="text-gray-500 capitalize">password</label>
						<input
							type="password"
							name="password"
							id="password"
							required
							class="border-1 border-gray-300 rounded-lg p-1"
						/>
					</InputGroup>

					{#if errorMessage}
						<p class="text-red-400">⚠️ {errorMessage}</p>
					{/if}

					<BaseButton
						text="Sign Up"
						variant="primary"
						type="submit"
						class="!rounded-full text-white text-sm py-2 mt-4"
					/>
				</div>
			</form>
		</div>
	</div>
	<div class="auth-hero bg-gray-100 flex items-center flex-col px-4 py-16 gap-8">
		<header class="hero-image">
			<img src="/auth-hero.png" alt="todo illustration" class="w-80" />
		</header>
		<div class="hero-description flex flex-col items-center gap-2">
			<h2 class="text-2xl font-bold capitalize">Stay organized, every day.</h2>
			<p class="text-base text-gray-500">Join with us to organize your day with Todomastery</p>
		</div>
		<footer class="mt-auto">
			<p class="text-gray-400">Ahmad Jaya. All right reserved</p>
		</footer>
	</div>
</div>
