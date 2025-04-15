<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Send } from 'lucide-svelte';
	import { onMount } from 'svelte';

	function gotoHyPaste() {
		// TODO: implement filter
	}

	onMount(() => {
		document.getElementById('hypaste-input')?.focus();
	});
</script>

<div class="flex p-6">
	<h1 class="text-2xl">Welcome to HyPaste</h1>
	<a href="https://m-krebs.dev" target="_blank" class="ml-2 align-text-bottom text-gray-500"
		>by m-krebs</a
	>
</div>

<div class="flex h-screen w-full items-center justify-center">
	<div class="flex flex-col gap-2 rounded-xl border border-dashed border-white p-10">
		<div class="flex gap-2 rounded-lg border p-2">
			<Input
				id="hypaste-input"
				placeholder="Link of the HyPaste..."
				onkeydown={(event) => {
					if (event.key === 'Enter') gotoHyPaste();
				}}
				class="border-none outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
			/>
			<Button onclick={gotoHyPaste}><Send /></Button>
		</div>
		<Button onclick={() => window.location.assign('/new')} class="w-full p-6"
			>Or create a new one</Button
		>
	</div>
</div>
