<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	
	import Navbar from '$lib/components/Navbar.svelte';
	import UnityBackground from '$lib/components/UnityBackground.svelte';
	import BrechtAI from '$lib/components/BrechtAI.svelte';

	let { children } = $props();

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({ immediate: true });
		}
	});
</script>

<svelte:head>
	{#if pwaInfo}
		{@html pwaInfo.webManifest.linkTag}
	{/if}
</svelte:head>

<Navbar />
<UnityBackground />

<main class="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen relative z-10">
	{@render children()}
</main>

<BrechtAI />
