<script>
	import { qrCode } from '$lib/actions/qr-code.js';
	import InputGroup from '$lib/components/InputGroup.svelte';
	import Button from '$lib/components/Button.svelte';
	import arachneSvg from '$lib/assets/arachne.svg';
	import cyberacmeSvg from '$lib/assets/cyberacme.svg';
	import marathonSvg from '$lib/assets/marathon.svg';
	import midaSvg from '$lib/assets/mida.svg';
	import nucaloricSvg from '$lib/assets/nucaloric.svg';
	import sekiguchiSvg from '$lib/assets/sekiguchi.svg';
	import traxusSvg from '$lib/assets/traxus.svg';

	const factions = [
		{ name: 'Arachne', image: arachneSvg, color: '#E30B0C' },
		{ name: 'CyberAcme', image: cyberacmeSvg, color: '#01D737' },
		{ name: 'Marathon', image: marathonSvg, color: '#C0FE04' },
		{ name: 'MIDA', image: midaSvg, color: '#BF72E4' },
		{ name: 'NuCaloric', image: nucaloricSvg, color: '#FE125D' },
		{ name: 'Sekiguchi', image: sekiguchiSvg, color: '#CFB72F' },
		{ name: 'Traxus', image: traxusSvg, color: '#FF7300' }
	];

	let data = $state('https://marathonthegame.com');
	let image = $state(marathonSvg);
	let dotsColor = $state('#C0FE04');
	let dotsType = $state('square');
	let backgroundColor = $state('transparent');
	let imageMargin = $state(10);
	let qrTypeNumber = $state(0);
	let qrErrorCorrectionLevel = $state('Q');
	let cornerSquareType = $state('square');
	let cornerDotType = $state('square');
	let showMore = $state(false);
	/** @type {import('qr-code-styling').default | null} */
	let qrInstance = $state(null);

	const dotTypes = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded'];
	const errorCorrectionLevels = ['L', 'M', 'Q', 'H'];
	const cornerSquareTypes = [
		'dot',
		'square',
		'extra-rounded',
		'rounded',
		'dots',
		'classy',
		'classy-rounded'
	];
	const cornerDotTypes = [
		'dot',
		'square',
		'rounded',
		'dots',
		'classy',
		'classy-rounded',
		'extra-rounded'
	];

	$effect(() => {
		const selectedFaction = factions.find((faction) => faction.image === image);
		if (selectedFaction) {
			dotsColor = selectedFaction.color;
		}
	});

	let qrOptions = $derived({
		onInstance: (/** @type {import('qr-code-styling').default} */ inst) => {
			qrInstance = inst;
		},
		width: 300,
		height: 300,
		data,
		image: image || undefined,
		qrOptions: {
			typeNumber: Number(qrTypeNumber),
			errorCorrectionLevel: qrErrorCorrectionLevel
		},
		dotsOptions: {
			color: dotsColor,
			type: dotsType
		},
		cornersSquareOptions: {
			type: cornerSquareType
		},
		cornersDotOptions: {
			type: cornerDotType
		},
		backgroundOptions: {
			color: backgroundColor
		},
		imageOptions: {
			crossOrigin: 'anonymous',
			margin: imageMargin
		}
	});
</script>

<main
	class="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
>
	<div class="order-2 flex min-w-0 flex-col gap-6 md:order-1">
		<header class="mb-2">
			<h1 class="text-2xl tracking-wide text-lime uppercase">QR Marathon</h1>
		</header>

		<InputGroup
			id="data"
			label="Data"
			bind:value={data}
			placeholder="https://marathonthegame.com"
		/>

		<InputGroup
			id="image"
			label="Faction"
			type="image-select"
			bind:value={image}
			placeholder="/marathon.svg"
			images={factions}
		/>

		<Button onclick={() => (showMore = !showMore)} aria-expanded={showMore}>
			{showMore ? 'Less' : 'More'}
		</Button>

		{#if showMore}
			<InputGroup id="dotsColor" label="Dot Color" type="color" bind:value={dotsColor} />

			<InputGroup
				id="backgroundColor"
				label="Background"
				type="color"
				bind:value={backgroundColor}
			/>

			<InputGroup
				id="dotsType"
				label="Dot Type"
				type="select"
				bind:value={dotsType}
				options={dotTypes}
			/>

			<InputGroup
				id="imageMargin"
				label="Logo Margin"
				type="number"
				bind:value={imageMargin}
				min={0}
				max={60}
				step={1}
			/>

			<InputGroup
				id="qrTypeNumber"
				label="QR Type Number"
				type="number"
				bind:value={qrTypeNumber}
				min={0}
				max={40}
				step={1}
			/>

			<InputGroup
				id="qrErrorCorrectionLevel"
				label="Error Correction"
				type="select"
				bind:value={qrErrorCorrectionLevel}
				options={errorCorrectionLevels}
			/>

			<InputGroup
				id="cornerSquareType"
				label="Corner Square Type"
				type="select"
				bind:value={cornerSquareType}
				options={cornerSquareTypes}
			/>

			<InputGroup
				id="cornerDotType"
				label="Corner Dot Type"
				type="select"
				bind:value={cornerDotType}
				options={cornerDotTypes}
			/>
		{/if}
	</div>

	<div class="order-1 md:sticky md:top-6 md:order-2 md:self-start">
		<div
			class="flex min-h-75 min-w-75 items-center justify-center"
			use:qrCode={qrOptions}
			role="img"
			aria-label="QR code preview"
		></div>
		<div class="mt-4 flex justify-center">
			<Button onclick={() => qrInstance?.download({ name: 'qr-code', extension: 'png' })}>
				Download
			</Button>
		</div>
	</div>
</main>
