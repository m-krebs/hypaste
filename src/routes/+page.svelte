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

<div class="m-auto h-full w-fit -translate-y-12 items-center justify-center align-bottom">
	<div class="flex flex-col gap-2 rounded-xl border border-dashed border-white p-10">
		<div class="flex gap-2 rounded-lg border p-2">
			<Input
				id="hypaste-input"
				placeholder="Paste HyPaste Id..."
				onkeydown={(event) => {
					if (event.key === 'Enter') gotoHyPaste();
				}}
				class="border-none outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
			/>
			<Button onclick={gotoHyPaste}><Send /></Button>
		</div>
		<Button onclick={() => window.location.assign('/new')} class="w-full p-6">Or create new</Button>
	</div>
</div>
