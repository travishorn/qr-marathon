<script>
	import '@fontsource-variable/martian-mono/wght.css';
	import './layout.css';
	import background from '$lib/assets/background.svg';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_SITE_URL } from '$env/static/public';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>QR Marathon | Marathon-Inspired QR Code Generator</title>

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

	<meta name="theme-color" content="#c0fe04" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{PUBLIC_SITE_URL}/" />
	<meta property="twitter:title" content="QR Marathon | Neon Marathon-Inspired QR Code Generator" />
	<meta
		property="twitter:description"
		content="A QR code generator themed around the Marathon game. Create customizable QR codes with faction logos and neon colors, inspired by the game's aesthetic."
	/>
	<meta property="twitter:image" content="{PUBLIC_SITE_URL}/og-image.png" />
</svelte:head>

<div
	class="min-h-screen bg-black font-mono font-extralight text-white"
	style={`background-image: url("${background}");`}
>
	<div class="container mx-auto flex min-h-screen flex-col px-4 py-16">
		<div class="flex-1">
			{@render children()}
		</div>

		<footer class="mt-12 border-t border-lime/40 pt-4 text-center text-xs text-white/70">
			<p>
				QR Marathon is an independent fan-made project and is not associated with, endorsed by, or
				sponsored by Bungie Inc.
			</p>
		</footer>
	</div>
</div>
