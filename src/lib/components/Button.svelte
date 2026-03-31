<script>
	let { onclick, children, ...restProps } = $props();
</script>

<button
	type="button"
	class="w-fit cursor-pointer border border-lime px-4 py-3 text-sm text-lime uppercase transition duration-150 hover:bg-lime hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime active:scale-[0.97]"
	{onclick}
	{...restProps}
>
	{@render children()}
</button>
