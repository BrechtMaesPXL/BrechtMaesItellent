<script lang="ts">
  import { onMount } from "svelte";
  import { Maximize } from "lucide-svelte";

  let isReady = $state(false);
  let gameIframe = $state<HTMLIFrameElement>();

  function toggleFullScreen() {
    if (gameIframe && gameIframe.requestFullscreen) {
      gameIframe.requestFullscreen();
    }
  }

  onMount(() => {
    isReady = true;
  });
</script>

<svelte:head>
  <title>Play Game | Brecht Tech</title>
  <meta
    name="description"
    content="Play the game I created during my excellence course at PXL."
  />
</svelte:head>

<div class="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto space-y-4 md:space-y-8">
    <div class="text-center space-y-4">
      <h1
        class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
      >
        Excellence Course <span
          class="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600"
          >Game</span
        >
      </h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">
        A game developed as part of an excellence course taken at PXL. Enjoy!
      </p>

      <div class="flex justify-center pt-2">
        <button
          onclick={toggleFullScreen}
          class="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Maximize size={20} />
          Play Fullscreen
        </button>
      </div>
    </div>

    <div
      class="relative max-w-5xl mx-auto glass-panel p-2 md:p-4 rounded-2xl shadow-xl border border-black/5 flex justify-center items-center overflow-hidden bg-slate-900"
      style="aspect-ratio: 16/9; max-height: 80vh;"
    >
      {#if isReady}
        <iframe
          bind:this={gameIframe}
          src="/game/index.html"
          class="w-full h-full rounded-xl border-0 shadow-inner bg-slate-900"
          title="PXL Game"
          allow="autoplay; fullscreen; pointer-lock"
        ></iframe>
      {:else}
        <div
          class="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse"
        >
          <p class="text-slate-500 font-medium">Loading game...</p>
        </div>
      {/if}
    </div>
  </div>
</div>
