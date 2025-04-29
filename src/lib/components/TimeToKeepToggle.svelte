<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	let { value = $bindable('5m') } = $props();

	let lastTTK = $state('');

	function toggleUpdate(event: any) {
		if (event === '') {
			value = lastTTK;
		} else {
			lastTTK = value;
		}
	}
</script>

<ToggleGroup.Root type="single" bind:value onValueChange={toggleUpdate}>
	<ToggleGroup.Item value="5m">5m</ToggleGroup.Item>
	<ToggleGroup.Item value="15m">15m</ToggleGroup.Item>
	<ToggleGroup.Item value="1h">1h</ToggleGroup.Item>
	<ToggleGroup.Item value="24h">24h</ToggleGroup.Item>
</ToggleGroup.Root>
