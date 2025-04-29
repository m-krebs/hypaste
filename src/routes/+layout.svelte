<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="container flex min-h-screen flex-col">
	<div class="flex p-6">
		<h1 class="text-2xl">HyPaste</h1>
		<a href="https://m-krebs.dev" target="_blank" class="ml-2 align-text-bottom text-gray-500"
			>by m-krebs</a
		>
	</div>
	{@render children()}
</div>
