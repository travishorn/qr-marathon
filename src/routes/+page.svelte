<script>
	import { qrCode } from '$lib/actions/qr-code.js';
	import InputGroup from '$lib/components/InputGroup.svelte';
	import Button from '$lib/components/Button.svelte';

	const factions = [
		{ name: 'Arachne', image: '/arachne.svg', color: '#E30B0C' },
		{ name: 'CyberAcme', image: '/cyberacme.svg', color: '#01D737' },
		{ name: 'Marathon', image: '/marathon.svg', color: '#C0FE04' },
		{ name: 'MIDA', image: '/mida.svg', color: '#BF72E4' },
		{ name: 'NuCaloric', image: '/nucaloric.svg', color: '#FE125D' },
		{ name: 'Sekiguchi', image: '/sekiguchi.svg', color: '#CFB72F' },
		{ name: 'Traxus', image: '/traxus.svg', color: '#FF7300' }
	];

	let data = $state('https://marathonthegame.com');
	let image = $state('/marathon.svg');
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

<div
	class="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
>
	<div class="order-2 flex min-w-0 flex-col gap-6 md:order-1">
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
		<div class="flex justify-center" use:qrCode={qrOptions}></div>
		<div class="mt-4 flex justify-center">
			<Button onclick={() => qrInstance?.download({ name: 'qr-code', extension: 'png' })}>
				Download
			</Button>
		</div>
	</div>
</div>
