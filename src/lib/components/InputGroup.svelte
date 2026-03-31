<script>
	import { untrack } from 'svelte';

	const CUSTOM_KEY = '__custom__';

	let {
		id,
		label,
		type = 'text',
		value = $bindable(),
		placeholder = undefined,
		min = undefined,
		max = undefined,
		step = undefined,
		options = [],
		images = []
	} = $props();

	// Seed once without creating a reactive dependency on the initial prop values
	const initialHex = untrack(() =>
		type === 'color' && value !== 'transparent' ? value : '#000000'
	);
	let lastHexColor = $state(initialHex);
	let isTransparent = $derived(type === 'color' && value === 'transparent');

	function toggleTransparent() {
		if (isTransparent) {
			value = lastHexColor;
		} else {
			lastHexColor = value;
			value = 'transparent';
		}
	}

	// image-select internals
	const initialSelectedImageValue = untrack(() => {
		if (type !== 'image-select') return '';
		if (!value) return '';
		const match = images.find((img) => img.image === value);
		return match ? match.image : CUSTOM_KEY;
	});
	const initialCustomUrl = untrack(() => {
		if (type !== 'image-select') return '';
		const match = images.find((img) => img.image === value);
		return match || !value ? '' : (value ?? '');
	});
	let selectedImageValue = $state(initialSelectedImageValue);
	let customUrl = $state(initialCustomUrl);

	$effect(() => {
		if (type === 'image-select') {
			value = selectedImageValue === CUSTOM_KEY ? customUrl : selectedImageValue;
		}
	});
</script>

<div class="flex flex-col gap-4">
	<label class="uppercase" for={id}>{label} //</label>

	{#if type === 'image-select'}
		<select
			{id}
			bind:value={selectedImageValue}
			class="select-input border border-white p-4 pr-12 text-lg font-normal outline-none focus:border-lime focus:ring-2 focus:ring-lime"
		>
			<option value="">NONE</option>
			{#each images as img (img.image)}
				<option value={img.image}>{img.name.toUpperCase()}</option>
			{/each}
			<option value={CUSTOM_KEY}>CUSTOM</option>
		</select>
		{#if selectedImageValue === CUSTOM_KEY}
			<input
				type="url"
				{placeholder}
				bind:value={customUrl}
				class="border border-white p-4 text-lg font-normal"
			/>
		{/if}
	{:else if type === 'select'}
		<select
			{id}
			bind:value
			class="select-input border border-white p-4 pr-12 text-lg font-normal outline-none focus:border-lime focus:ring-2 focus:ring-lime"
		>
			{#each options as opt (opt)}
				<option value={opt}>{opt.toUpperCase()}</option>
			{/each}
		</select>
	{:else if type === 'color'}
		<input
			{id}
			type="color"
			value={isTransparent ? '#000000' : value}
			disabled={isTransparent}
			oninput={(e) => {
				value = e.currentTarget.value;
				lastHexColor = e.currentTarget.value;
			}}
			class="h-14 w-full cursor-pointer border border-white p-1 outline-none focus:border-lime focus:ring-2 focus:ring-lime disabled:cursor-not-allowed disabled:opacity-30"
		/>
		<label class="flex cursor-pointer items-center gap-2 text-sm uppercase" for="{id}-transparent">
			<input
				id="{id}-transparent"
				type="checkbox"
				checked={isTransparent}
				onchange={toggleTransparent}
			/>
			Transparent
		</label>
	{:else}
		<input
			{id}
			{type}
			bind:value
			{placeholder}
			{min}
			{max}
			{step}
			class="border border-white p-4 text-lg font-normal outline-none focus:border-lime focus:ring-2 focus:ring-lime"
			class:number-input={type === 'number'}
		/>
	{/if}
</div>

<style>
	.select-input {
		-webkit-appearance: none;
		appearance: none;
		background-image: url('../assets/chevron-down.svg');
		background-repeat: no-repeat;
		background-position: right 0.9rem center;
		background-size: 28px 28px;
	}

	.select-input::-ms-expand {
		display: none;
	}

	.number-input {
		color-scheme: dark;
	}

	.number-input::-webkit-outer-spin-button,
	.number-input::-webkit-inner-spin-button {
		opacity: 1;
	}
</style>
