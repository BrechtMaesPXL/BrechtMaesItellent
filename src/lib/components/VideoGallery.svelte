<script lang="ts">
  const videoId = "NhcTa3V3qws";
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between border-b border-black/5 pb-4">
    <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Immersive Road Trip</h2>
    <a href="https://www.youtube.com/@BrightOdyssey" target="_blank" rel="noopener noreferrer" class="text-sm text-cyan-600 hover:text-cyan-500 font-medium transition-colors flex items-center gap-2">
      Bright Odyssey Channel &rarr;
    </a>
  </div>
  
  <p class="text-slate-600 max-w-2xl text-sm">
    Experience the 30-hour drive from Belgium to the Arctic Circle in Finland. A raw, unedited "Slow TV" adventure capturing the endurance of a true road expedition.
  </p>

  <div class="mt-8 relative group rounded-2xl">
    <div class="absolute inset-0 bg-cyan-500/20 blur-[30px] rounded-2xl z-0 pointer-events-none group-hover:bg-cyan-500/30 transition-colors"></div>
    <div class="relative z-10 w-full aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-black/5 shadow-2xl">
      <!-- 
        Standard iframe with autoplay, mute, and loop for a seamless cinematic feel without downloading local assets.
        Note: Autoplay generally requires mute=1 to work in modern browsers.
      -->
      <iframe 
        src="https://www.youtube.com/embed/{videoId}?autoplay=1&mute=1&loop=1&playlist={videoId}&controls=0&modestbranding=1" 
        title="30 Hour Roadtrip to the Arctic Circle" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen 
        class="w-full h-full border-none pointer-events-auto"
      ></iframe>
    </div>
  </div>
</div>
