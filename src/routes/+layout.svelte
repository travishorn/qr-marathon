<script>
	import '@fontsource-variable/martian-mono/wght.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>QR Marathon</title>
</svelte:head>

<div class="min-h-screen bg-black font-mono font-extralight text-white">
	<div class="container mx-auto px-4 py-16">
		{@render children()}
	</div>
</div>
