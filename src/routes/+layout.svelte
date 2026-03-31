<script>
	import '@fontsource-variable/martian-mono/wght.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_SITE_URL } from '$env/static/public';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>QR Marathon | Neon Marathon-Inspired QR Code Generator</title>

	<meta
		name="description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_SITE_URL}/" />
	<meta property="og:title" content="QR Marathon | Neon Marathon-Inspired QR Code Generator" />
	<meta
		property="og:description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>
	<meta property="og:image" content="{PUBLIC_SITE_URL}/og-image.png" />

	<meta name="theme-color" content="#C2FE0C" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{PUBLIC_SITE_URL}/" />
	<meta property="twitter:title" content="QR Marathon | Neon Marathon-Inspired QR Code Generator" />
	<meta
		property="twitter:description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>
	<meta property="twitter:image" content="{PUBLIC_SITE_URL}/og-image.png" />
</svelte:head>

<div class="min-h-screen bg-black font-mono font-extralight text-white">
	<div class="container mx-auto px-4 py-16">
		{@render children()}
	</div>
</div>
