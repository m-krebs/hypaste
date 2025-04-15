<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import CodeMirror from '$lib/components/CodeMirror.svelte';
	import NewCodeMirror from '$lib/components/NewCodeMirror.svelte';

	let pasteContent = $state('');
	let timeToKeep = $state('5m');
	let lastTTK = $state('5m');

	function toggleUpdate(event: any) {
		if (event === '') {
			timeToKeep = lastTTK;
		} else {
			lastTTK = timeToKeep;
		}
	}
</script>

<form method="POST">
	<Textarea bind:value={pasteContent} />
	<div class="w-max rounded-lg border p-2">
		<p class="text-center">Delete after</p>
		<ToggleGroup.Root type="single" bind:value={timeToKeep} onValueChange={toggleUpdate}>
			<ToggleGroup.Item value="5m">5m</ToggleGroup.Item>
			<ToggleGroup.Item value="15m">15m</ToggleGroup.Item>
			<ToggleGroup.Item value="1h">1h</ToggleGroup.Item>
			<ToggleGroup.Item value="24h">24h</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
	<CodeMirror />
</form>
