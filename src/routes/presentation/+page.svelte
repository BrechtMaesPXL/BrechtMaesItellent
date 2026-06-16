<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { 
    Play, 
    Pause, 
    ChevronLeft, 
    ChevronRight, 
    Maximize2, 
    Minimize2, 
    RotateCcw, 
    FileDown, 
    LayoutGrid, 
    Tv, 
    Sparkles, 
    Keyboard,
    Download
  } from 'lucide-svelte';

  const totalSlides = 230;
  let currentSlide = $state(1);
  let isPlaying = $state(false);
  let autoplaySpeed = $state(3000); // ms
  let isFullscreen = $state(false);
  let theaterMode = $state(true); // Dark mode for slide container by default
  let showIndexModal = $state(false);
  let showShortcutsModal = $state(false);
  let playerContainer = $state<HTMLDivElement | null>(null);
  let thumbnailContainer = $state<HTMLDivElement | null>(null);

  let autoplayInterval: any;
  let controlsVisible = $state(true);
  let controlsTimeout: any;

  function resetControlsTimeout() {
    controlsVisible = true;
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    if (isFullscreen) {
      controlsTimeout = setTimeout(() => {
        controlsVisible = false;
      }, 2500);
    }
  }

  // Touch Swipe variables
  let touchStartX = 0;
  let touchEndX = 0;

  // Generate lists of slides
  const slides = Array.from({ length: totalSlides }, (_, i) => i + 1);

  // Derived slide source path
  let currentSlidePath = $derived(`/presentation/slides/slide/Slide${currentSlide}.JPG`);

  // Auto-scrolling the active thumbnail into view
  $effect(() => {
    if (thumbnailContainer) {
      const activeBtn = thumbnailContainer.querySelector(`[data-slide="${currentSlide}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  });

  // Autoplay Logic
  function startAutoplay() {
    stopAutoplay();
    isPlaying = true;
    autoplayInterval = setInterval(() => {
      nextSlide(true); // pass true to indicate it's from autoplay
    }, autoplaySpeed);
  }

  function stopAutoplay() {
    isPlaying = false;
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function togglePlay() {
    if (isFullscreen) resetControlsTimeout();
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  // Speed changer
  function setSpeed(speedMs: number) {
    if (isFullscreen) resetControlsTimeout();
    autoplaySpeed = speedMs;
    if (isPlaying) {
      startAutoplay();
    }
  }

  // Slide Navigation
  function nextSlide(fromAutoplay = false) {
    if (isFullscreen && !fromAutoplay) {
      resetControlsTimeout();
    }
    if (currentSlide < totalSlides) {
      currentSlide++;
    } else if (fromAutoplay) {
      currentSlide = 1; // loop back to start
    }
    if (!fromAutoplay) {
      stopAutoplay(); // Stop if user manually clicked
    }
  }

  function prevSlide() {
    if (isFullscreen) resetControlsTimeout();
    if (currentSlide > 1) {
      currentSlide--;
    }
    stopAutoplay();
  }

  function firstSlide() {
    if (isFullscreen) resetControlsTimeout();
    currentSlide = 1;
    stopAutoplay();
  }

  function lastSlide() {
    if (isFullscreen) resetControlsTimeout();
    currentSlide = totalSlides;
    stopAutoplay();
  }

  function jumpToSlide(num: number) {
    if (isFullscreen) resetControlsTimeout();
    currentSlide = num;
    stopAutoplay();
    showIndexModal = false;
  }

  // Fullscreen Handlers
  function toggleFullscreen() {
    if (!playerContainer) return;
    
    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen()
        .then(() => {
          isFullscreen = true;
          resetControlsTimeout();
        })
        .catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
      document.exitFullscreen();
      isFullscreen = false;
      controlsVisible = true;
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
      }
    }
  }

  // Watch for external fullscreen changes (like pressing Esc)
  function handleFullscreenChange() {
    isFullscreen = document.fullscreenElement === playerContainer;
    if (!isFullscreen) {
      controlsVisible = true;
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
      }
    } else {
      resetControlsTimeout();
    }
  }

  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    // Disable when modals are open or focused on inputs
    if (showIndexModal || showShortcutsModal) return;
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

    if (isFullscreen) {
      resetControlsTimeout();
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'l':
      case 'L':
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'h':
      case 'H':
        prevSlide();
        break;
      case ' ':
        event.preventDefault();
        togglePlay();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        theaterMode = !theaterMode;
        break;
      case 'Home':
        firstSlide();
        break;
      case 'End':
        lastSlide();
        break;
    }
  }

  // Touch Swipe Handlers
  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: TouchEvent) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const threshold = 50; // swipe offset threshold
    if (touchStartX - touchEndX > threshold) {
      // Swiped Left -> Next slide
      nextSlide();
    } else if (touchEndX - touchStartX > threshold) {
      // Swiped Right -> Previous slide
      prevSlide();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    stopAutoplay();
  });
</script>

<svelte:head>
  <title>Presentation: Trip to Scandinavia | Brecht Tech</title>
  <meta name="description" content="Watch and interact with Brecht Maes' Presentation: Trip to Scandinavia directly in the browser. Features thumbnail index, autoplay, and theater view." />
</svelte:head>

<div class="max-w-6xl mx-auto py-8 px-4 space-y-8">
  <!-- Header Title -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-black/5 pb-6">
    <div>
      <div class="flex items-center gap-2 text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-1">
        <Sparkles class="w-4 h-4" />
        Featured Presentation
      </div>
      <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Trip to Scandinavia</h1>
      <p class="text-slate-600 mt-1">
        Explore the visual journey of the Scandinavian journey, documentation, and activities.
      </p>
    </div>

    <!-- Actions / PDF download -->
    <div class="flex flex-wrap gap-3">
      <button 
        onclick={() => showShortcutsModal = true}
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        title="View keyboard shortcuts"
      >
        <Keyboard class="w-4 h-4" />
        <span>Keyboard Shortcuts</span>
      </button>

      <a 
        href="/presentation/presentation.pdf" 
        download="Trip To Scandinavia.pdf"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
      >
        <FileDown class="w-4 h-4" />
        <span>Download PDF (Slides)</span>
      </a>

      <a 
        href="/presentation/Trip To Scandinavia.pptx" 
        download="Trip To Scandinavia.pptx"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-xl transition-all"
      >
        <Download class="w-4 h-4" />
        <span>Download PPTX (1.4GB)</span>
      </a>
    </div>
  </div>

  <!-- Theater / Slideshow Player -->
  <div 
    bind:this={playerContainer} 
    onmousemove={resetControlsTimeout}
    class="relative overflow-hidden shadow-2xl transition-all duration-300 flex flex-col border
      {theaterMode || isFullscreen ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}
      {isFullscreen ? 'rounded-none border-none h-screen w-screen justify-center' : 'rounded-3xl border-black/5'}"
    class:cursor-none={isFullscreen && !controlsVisible}
  >
    
    <!-- Top status bar inside player -->
    <div 
      class="px-6 py-4 flex items-center justify-between z-20 backdrop-blur-md transition-all duration-300
        {isFullscreen 
          ? 'absolute top-0 left-0 right-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent border-none text-white' 
          : 'relative border-b border-black/5 bg-black/10'}
        {isFullscreen && !controlsVisible ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'}"
    >
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          Slide {currentSlide} / {totalSlides}
        </span>
        {#if isPlaying}
          <span class="flex h-2.5 w-2.5 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span class="text-xs text-slate-400">Autoplay ({autoplaySpeed / 1000}s)</span>
        {/if}
      </div>

      <div class="flex items-center gap-4">
        <!-- Theater toggle -->
        {#if !isFullscreen}
          <button 
            onclick={() => theaterMode = !theaterMode} 
            class="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors
              {theaterMode ? 'border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200' : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}"
          >
            {theaterMode ? 'Light Background' : 'Dark Background (Theater)'}
          </button>
        {/if}

        <button 
          onclick={() => showIndexModal = true}
          class="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors"
          title="Show slide grid"
        >
          <LayoutGrid class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Main Slide Display Area -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div 
      class="relative flex-1 flex items-center justify-center overflow-hidden select-none bg-slate-900 transition-all duration-300
        {isFullscreen ? 'h-full w-full min-h-0 max-h-none' : 'min-h-[40vh] md:min-h-[60vh] max-h-[80vh]'}"
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
      role="region"
      aria-label="Presentation Slide Viewer"
    >
      <!-- Background glow representing the colors of the slide (ambient lighting) -->
      <div 
        class="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 transition-all duration-700 pointer-events-none"
        style="background-image: url('{currentSlidePath}');"
      ></div>

      <!-- Arrow navigation overlays -->
      <button 
        onclick={prevSlide}
        disabled={currentSlide === 1}
        class="absolute left-4 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center backdrop-blur-xs hover:scale-105 transition-all disabled:opacity-30 disabled:pointer-events-none
          transition-opacity duration-300 {isFullscreen && !controlsVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}"
        aria-label="Previous Slide"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>

      <button 
        onclick={() => nextSlide()}
        disabled={currentSlide === totalSlides}
        class="absolute right-4 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center backdrop-blur-xs hover:scale-105 transition-all disabled:opacity-30 disabled:pointer-events-none
          transition-opacity duration-300 {isFullscreen && !controlsVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}"
        aria-label="Next Slide"
      >
        <ChevronRight class="w-6 h-6" />
      </button>

      <!-- The slide image itself -->
      <div class="relative max-w-full max-h-full flex items-center justify-center {isFullscreen ? 'p-0 w-full h-full' : 'p-2'}">
        <!-- Smooth opacity transition helper via key block -->
        {#key currentSlide}
          <img 
            src={currentSlidePath} 
            alt="Scandinavia Presentation Slide {currentSlide}" 
            class="object-contain cursor-pointer select-none transition-all duration-300
              {isFullscreen 
                ? 'max-w-full max-h-full rounded-none border-none shadow-none' 
                : 'max-w-full max-h-[58vh] md:max-h-[68vh] rounded-lg shadow-2xl border border-white/5'}"
            onclick={() => nextSlide()}
          />
        {/key}
      </div>
    </div>

    <!-- Bottom Controls & Thumbnails -->
    <div 
      class="px-6 py-6 transition-all duration-300 z-20 flex flex-col gap-6
        {isFullscreen 
          ? 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent border-none text-white' 
          : 'relative border-t border-black/5 bg-black/5 backdrop-blur-md'}
        {isFullscreen && !controlsVisible ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'}"
    >
      <!-- Progress Bar (inside control container for seamless fullscreen overlay integration) -->
      <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-cyan-500 transition-all duration-300"
          style="width: {(currentSlide / totalSlides) * 100}%"
        ></div>
      </div>
      
      <!-- Primary Controls -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <!-- Left: Quick Navigation & Slide Range -->
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onclick={firstSlide} 
            disabled={currentSlide === 1}
            class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-black/10 hover:bg-black/20 text-inherit transition-all disabled:opacity-30"
          >
            First
          </button>
          
          <input 
            type="range" 
            min="1" 
            max={totalSlides} 
            bind:value={currentSlide} 
            class="w-full sm:w-48 accent-cyan-500 cursor-pointer" 
          />

          <button 
            onclick={lastSlide} 
            disabled={currentSlide === totalSlides}
            class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-black/10 hover:bg-black/20 text-inherit transition-all disabled:opacity-30"
          >
            Last
          </button>
        </div>

        <!-- Center: Playback state buttons -->
        <div class="flex items-center gap-2">
          <button 
            onclick={prevSlide}
            disabled={currentSlide === 1}
            class="p-2.5 rounded-xl bg-black/10 hover:bg-black/20 text-inherit transition-colors disabled:opacity-30"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <button 
            onclick={togglePlay}
            class="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2 hover:scale-102 active:scale-98 transition-all"
            title="Play/Pause slideshow (Space)"
          >
            {#if isPlaying}
              <Pause class="w-5 h-5 fill-white" />
              <span>Pause</span>
            {:else}
              <Play class="w-5 h-5 fill-white" />
              <span>Play Show</span>
            {/if}
          </button>

          <button 
            onclick={() => nextSlide()}
            disabled={currentSlide === totalSlides}
            class="p-2.5 rounded-xl bg-black/10 hover:bg-black/20 text-inherit transition-colors disabled:opacity-30"
            title="Next (Right Arrow)"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <!-- Right: Autoplay speed & Screen modes -->
        <div class="flex items-center gap-3">
          <!-- Autoplay Speed Selector -->
          <div class="flex items-center bg-black/10 rounded-xl p-1">
            <button 
              onclick={() => setSpeed(2000)}
              class="px-2.5 py-1 text-xs font-bold rounded-lg transition-colors {autoplaySpeed === 2000 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-inherit'}"
            >
              2s
            </button>
            <button 
              onclick={() => setSpeed(3000)}
              class="px-2.5 py-1 text-xs font-bold rounded-lg transition-colors {autoplaySpeed === 3000 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-inherit'}"
            >
              3s
            </button>
            <button 
              onclick={() => setSpeed(5000)}
              class="px-2.5 py-1 text-xs font-bold rounded-lg transition-colors {autoplaySpeed === 5000 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-inherit'}"
            >
              5s
            </button>
            <button 
              onclick={() => setSpeed(10000)}
              class="px-2.5 py-1 text-xs font-bold rounded-lg transition-colors {autoplaySpeed === 10000 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-inherit'}"
            >
              10s
            </button>
          </div>

          <!-- Fullscreen button -->
          <button 
            onclick={toggleFullscreen}
            class="p-2.5 rounded-xl bg-black/10 hover:bg-black/20 text-inherit transition-colors"
            title="Fullscreen Mode (F)"
          >
            {#if isFullscreen}
              <Minimize2 class="w-5 h-5" />
            {:else}
              <Maximize2 class="w-5 h-5" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Thumbnail Strip at bottom -->
      {#if !isFullscreen}
        <div class="space-y-2">
          <div class="flex justify-between items-center text-xs text-slate-400">
            <span>Quick Slide Explorer</span>
            <span>Scroll horizontally for all {totalSlides} slides</span>
          </div>
          
          <div 
            bind:this={thumbnailContainer}
            class="flex gap-2.5 overflow-x-auto py-2 scroll-smooth scrollbar-thin select-none"
            style="scrollbar-color: rgba(6, 182, 212, 0.4) transparent;"
          >
            {#each slides as num}
              <button
                data-slide={num}
                onclick={() => jumpToSlide(num)}
                class="shrink-0 relative rounded-lg overflow-hidden border-2 w-24 aspect-video transition-all duration-200 hover:scale-105 active:scale-95
                  {currentSlide === num 
                    ? 'border-cyan-500 shadow-md shadow-cyan-500/20 scale-102 ring-2 ring-cyan-500/30' 
                    : 'border-slate-800 opacity-60 hover:opacity-100'}"
              >
                <img 
                  src="/presentation/slides/slide/Slide{num}.JPG" 
                  alt="Thumbnail {num}" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div class="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] text-white text-center py-0.5">
                  {num}
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/if}

    </div>
  </div>

  <!-- Description Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
    <div class="md:col-span-2 glass-panel p-6 rounded-2xl space-y-4">
      <h3 class="text-xl font-bold text-slate-900">About this Presentation</h3>
      <p class="text-slate-600 leading-relaxed">
        This deck documents the <strong>Trip to Scandinavia</strong>. It highlights key sights, learnings, 
        and experiences gained during this voyage.
      </p>
      <p class="text-slate-600 leading-relaxed">
        We have processed the original 1.4GB PowerPoint presentation and rendered all <strong>230 slides</strong> 
        directly as high-resolution images so that they can be quickly loaded and viewed inside the web browser. 
        You can play the slides dynamically like a movie by clicking the <strong>Play Show</strong> button above.
      </p>
    </div>

    <!-- Quick instructions -->
    <div class="glass-panel p-6 rounded-2xl space-y-4">
      <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Keyboard class="w-5 h-5 text-cyan-600" />
        Quick Keyboard Tips
      </h3>
      <ul class="space-y-2 text-sm text-slate-600">
        <li class="flex justify-between border-b border-black/5 pb-1">
          <span>Next Slide</span>
          <kbd class="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px] font-mono shadow-xs">Right Arrow</kbd>
        </li>
        <li class="flex justify-between border-b border-black/5 pb-1">
          <span>Previous Slide</span>
          <kbd class="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px] font-mono shadow-xs">Left Arrow</kbd>
        </li>
        <li class="flex justify-between border-b border-black/5 pb-1">
          <span>Play / Pause</span>
          <kbd class="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px] font-mono shadow-xs">Spacebar</kbd>
        </li>
        <li class="flex justify-between border-b border-black/5 pb-1">
          <span>Toggle Fullscreen</span>
          <kbd class="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px] font-mono shadow-xs">F Key</kbd>
        </li>
        <li class="flex justify-between">
          <span>Toggle Background</span>
          <kbd class="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px] font-mono shadow-xs">T Key</kbd>
        </li>
      </ul>
    </div>
  </div>
</div>

<!-- Modal: Jump Grid of all 230 Slides -->
{#if showIndexModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" 
    onclick={() => showIndexModal = false}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div 
      class="glass-panel w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 shadow-2xl flex flex-col gap-4 bg-white text-slate-800"
      onclick={e => e.stopPropagation()}
    >
      <div class="flex justify-between items-center border-b border-black/5 pb-4">
        <div>
          <h2 id="modal-title" class="text-2xl font-bold text-slate-900">Slide Index</h2>
          <p class="text-sm text-slate-500">Quickly select any slide from the 230 slides in this deck.</p>
        </div>
        <button 
          onclick={() => showIndexModal = false}
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
        >
          Close Index
        </button>
      </div>

      <!-- Slide grid -->
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 overflow-y-auto py-2">
        {#each slides as num}
          <button 
            onclick={() => jumpToSlide(num)}
            class="flex flex-col gap-1 text-left group transition-all"
          >
            <div class="relative w-full aspect-video rounded-lg overflow-hidden border border-black/10 group-hover:border-cyan-500 group-hover:ring-2 group-hover:ring-cyan-500/20">
              <img 
                src="/presentation/slides/slide/Slide{num}.JPG" 
                alt="Index Thumbnail {num}" 
                class="w-full h-full object-cover"
                loading="lazy"
              />
              {#if currentSlide === num}
                <div class="absolute inset-0 bg-cyan-600/30 flex items-center justify-center font-bold text-white text-sm">
                  Active
                </div>
              {/if}
            </div>
            <span class="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
              Slide {num}
            </span>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- Modal: Keyboard Shortcuts Description -->
{#if showShortcutsModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" 
    onclick={() => showShortcutsModal = false}
    role="dialog"
    aria-modal="true"
    aria-labelledby="shortcuts-title"
  >
    <div 
      class="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 bg-white text-slate-800"
      onclick={e => e.stopPropagation()}
    >
      <div class="flex justify-between items-center border-b border-black/5 pb-4">
        <h2 id="shortcuts-title" class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Keyboard class="w-5 h-5 text-cyan-600" />
          Keyboard Shortcuts
        </h2>
        <button 
          onclick={() => showShortcutsModal = false}
          class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-sm font-medium text-slate-600">Next Slide</span>
          <span class="flex gap-1">
            <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">➡</kbd>
            <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">L</kbd>
          </span>
        </div>
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-sm font-medium text-slate-600">Previous Slide</span>
          <span class="flex gap-1">
            <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">⬅</kbd>
            <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">H</kbd>
          </span>
        </div>
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-sm font-medium text-slate-600">Play / Pause Slideshow</span>
          <kbd class="px-4 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">Spacebar</kbd>
        </div>
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-sm font-medium text-slate-600">Toggle Fullscreen Mode</span>
          <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">F</kbd>
        </div>
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-sm font-medium text-slate-600">Toggle Theater / Dark Mode</span>
          <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">T</kbd>
        </div>
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-sm font-medium text-slate-600">First Slide</span>
          <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">Home</kbd>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-slate-600">Last Slide</span>
          <kbd class="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">End</kbd>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-black/5">
        <button 
          onclick={() => showShortcutsModal = false}
          class="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl transition-colors shadow-md"
        >
          Got it!
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Customize standard scrollbar behavior for slide thumbnails strip */
  .scrollbar-thin::-webkit-scrollbar {
    height: 8px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(6, 182, 212, 0.3);
    border-radius: 4px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgba(6, 182, 212, 0.5);
  }
</style>
