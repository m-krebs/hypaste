<script lang="ts">
	import { enhance } from '$app/forms';
	import TimeToKeepToggle from '$lib/components/TimeToKeepToggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import CodeMirror from 'svelte-codemirror-editor';

	let pasteContent = $state('');
	let ttk = $state('5m');
</script>

<form method="POST">
	<div class="w-max rounded-lg border p-2">
		<p class="text-center">Delete after</p>
		<TimeToKeepToggle bind:value={ttk} />
		<input type="hidden" name="ttk" bind:value={ttk} />
	</div>
	<Button type="submit">Create</Button>
	<CodeMirror bind:value={pasteContent} />
	<input type="hidden" name="paste" bind:value={pasteContent} />
</form>
