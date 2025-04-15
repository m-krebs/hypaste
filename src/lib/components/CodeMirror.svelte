<script lang="ts">
	import { basicSetup } from 'codemirror';
	import { EditorView } from '@codemirror/view';
	import { onMount } from 'svelte';

	onMount(() => {
		const view = new EditorView({
			doc: 'Start document',
			extensions: [basicSetup]
		});
		document.body.appendChild(view.dom);

		$effect(() => {
			console.log(view.state);
		});
	});
</script>
