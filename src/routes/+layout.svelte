<script lang="ts">
	import './layout.css';
	
	import Navbar from '$lib/components/Navbar.svelte';
	import UnityBackground from '$lib/components/UnityBackground.svelte';
	import BrechtAI from '$lib/components/BrechtAI.svelte';

	let { children } = $props();
</script>

<Navbar />
<UnityBackground />

<main class="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen relative z-10">
	{@render children()}
</main>

<BrechtAI />
