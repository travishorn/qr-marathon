<script>
	import '@fontsource-variable/martian-mono/wght.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { PUBLIC_ORIGIN } from '$env/static/public';

	const siteUrl = `${PUBLIC_ORIGIN}${resolve('/')}`.replace(/\/$/, '');

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>QR Marathon</title>

	<meta
		name="description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteUrl}/" />
	<meta property="og:title" content="QR Marathon" />
	<meta
		property="og:description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>
	<meta property="og:image" content="{siteUrl}/og-image.png" />

	<meta name="theme-color" content="#C2FE0C" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{siteUrl}/" />
	<meta property="twitter:title" content="QR Marathon" />
	<meta
		property="twitter:description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>
	<meta property="twitter:image" content="{siteUrl}/og-image.png" />
</svelte:head>

<div class="min-h-screen bg-black font-mono font-extralight text-white">
	<div class="container mx-auto px-4 py-16">
		{@render children()}
	</div>
</div>
