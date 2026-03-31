<script>
	let { onclick, children, ...restProps } = $props();
</script>

<button
	type="button"
	class="w-fit border border-lime px-4 py-2 text-sm text-lime uppercase transition hover:bg-lime hover:text-black"
	{onclick}
	{...restProps}
>
	{@render children()}
</button>
