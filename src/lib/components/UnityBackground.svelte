<script lang="ts">
  import { onMount } from 'svelte';

  let iframeRef: HTMLIFrameElement;

  onMount(() => {
    const handleNavigation = (e: CustomEvent) => {
      iframeRef?.contentWindow?.postMessage({ type: 'Navigation', payload: e.detail }, '*');
    };
    window.addEventListener('UnityAction', handleNavigation as EventListener);
    
    return () => {
      window.removeEventListener('UnityAction', handleNavigation as EventListener);
    };
  });
</script>

<div class="fixed inset-0 z-[-1] pointer-events-none bg-white">
  <iframe 
    bind:this={iframeRef}
    src="/unity-build/index.html" 
    class="w-full h-full border-none opacity-20"
    title="Unity Background"
  ></iframe>
  <div class="absolute inset-0 bg-linear-to-b from-white/90 via-white/50 to-white/90"></div>
</div>
