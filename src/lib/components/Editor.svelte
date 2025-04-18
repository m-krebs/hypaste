<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';

	let editorContainer: HTMLElement;

	onMount(() => {
		let editor = new EditorView({
			extensions: [basicSetup, javascript()],
			parent: editorContainer
		});
	});
</script>

<div bind:this={editorContainer}></div>
