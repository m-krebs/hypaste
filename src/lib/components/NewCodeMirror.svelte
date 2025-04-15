<script context="module">
	import { EditorView, minimalSetup, basicSetup } from 'codemirror';
	import { StateEffect } from '@codemirror/state';
	export { minimalSetup, basicSetup };
</script>

<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let dom;

	let _mounted = $state(false);
	onMount(() => {
		_mounted = true;
		return () => {
			_mounted = false;
		};
	});

	let view = $state(null);
	$effect(() => {
		if (view) {
			return () => {
				if (view !== null) {
					view.destroy();
				}
			};
		}
	});

	/* `doc` is deliberately made non-reactive for not storing a reduntant string
   besides the editor. Also, setting doc to undefined will not trigger an
   update, so that you can clear it after setting one. */
	/* Set verbose if you would like to listen to all transactions via `update` event. */
	let { doc, verbose = false, extensions = minimalSetup } = $props();

	/* Cached doc string so that we don't extract strings in bulk over and over. */
	let _docCached = $state(null);

	/* Overwrite the bulk of the text with the one specified. */
	function _setText(text) {
		view.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: text }
		});
	}

	const subscribers = new Set();

	/* And here comes the reactivity, implemented as a r/w store. */
	export const docStore = {
		ready: () => view !== null,
		subscribe(cb) {
			subscribers.add(cb);

			if (!this.ready()) {
				cb(null);
			} else {
				if (_docCached == null) {
					_docCached = view.state.doc.toString();
				}
				cb(_docCached);
			}

			return () => void subscribers.delete(cb);
		},
		set(newValue) {
			if (!_mounted) {
				throw new Error('Cannot set docStore when the component is not mounted.');
			}

			const inited = _initEditorView(newValue);
			if (!inited) _setText(newValue);
		}
	};

	function _reconfigureExtensions() {
		if (view === null) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of(extensions)
		});
	}

	$effect(() => {
		extensions;
		_reconfigureExtensions();
	});

	function _editorTxHandler(trs, view) {
		view.update(trs);

		if (verbose) {
			dispatch('update', trs);
		}

		let lastChangingTr;
		if ((lastChangingTr = trs.findLast((tr) => tr.docChanged))) {
			_docCached = null;
			if (subscribers.size) {
				dispatchDocStore((_docCached = lastChangingTr.newDoc.toString()));
			}
			dispatch('change', { view, trs });
		}
	}

	function dispatchDocStore(s) {
		for (const cb of subscribers) {
			cb(s);
		}
	}

	// the view will be inited with the either doc (as long as that it is not `undefined`)
	// or the value in docStore once set
	function _initEditorView(initialDoc) {
		if (view !== null) {
			return false;
		}

		view = new EditorView({
			doc: initialDoc,
			extensions,
			parent: dom,
			dispatchTransactions: _editorTxHandler
		});
		return true;
	}

	$effect(() => {
		if (_mounted && doc !== undefined) {
			const inited = _initEditorView(doc);
			dispatchDocStore(doc);
		}
	});
</script>

<div class="codemirror" bind:this={dom}></div>

<style>
	.codemirror {
		display: contents;
	}
</style>
