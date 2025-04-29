<script lang="ts">
	import { enhance } from '$app/forms';
	import TimeToKeepToggle from '$lib/components/TimeToKeepToggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import CodeMirror from 'svelte-codemirror-editor';

	let pasteContent = $state('');
	let ttk = $state('5m');
</script>

<form method="POST" use:enhance>
	<div class="w-max rounded-lg border p-2">
		<p class="text-center">Delete after</p>
		<TimeToKeepToggle bind:value={ttk} />
		<input type="hidden" name="ttk" bind:value={ttk} />
	</div>
	<Button>Create</Button>
	<CodeMirror bind:value={pasteContent} />
	<Input name="textcontent" placeholder="Type text..." />
	<Button type="submit">Submit</Button>
</form>
