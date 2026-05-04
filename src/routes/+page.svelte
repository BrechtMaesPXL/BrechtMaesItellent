<script lang="ts">
  import { Shield, BrainCircuit, Globe } from 'lucide-svelte';
  import VideoGallery from '$lib/components/VideoGallery.svelte';
</script>

<svelte:head>
  <title>Brecht Maes | App Dev & AI</title>
</svelte:head>

<div class="space-y-12 pb-20 mt-10">
  <section class="flex flex-col md:flex-row items-center gap-12">
    <div class="flex-1 space-y-6">
      <h1 class="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 drop-shadow-lg tracking-tight pb-2">
        Application Developer <br /> <span class="text-slate-900">& AI Specialist.</span>
      </h1>
      <p class="text-xl text-slate-600 font-light max-w-xl">
        I'm Brecht Maes. I bridge the gap between robust application development and cutting-edge artificial intelligence to create experiences that stand out.
      </p>
      
      <div class="flex gap-4 pt-4">
        <a href="/about" class="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
          Explore My Identity
        </a>
        <a href="/activities" class="px-6 py-3 rounded-xl glass hover:bg-black/5 text-slate-900 font-medium transition-all">
          View Activities
        </a>
      </div>
    </div>
    
    <div class="flex-1 w-full max-w-md relative">
      <div class="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full mt-10"></div>
      <img src="/hero.png" alt="AI Developer Render" class="relative z-10 w-full h-auto rounded-3xl object-cover shadow-2xl shadow-cyan-500/20 border border-black/5 saturate-150" />
    </div>
  </section>

  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
    <div class="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform border-t hover:border-blue-500/50">
      <div class="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Shield class="w-8 h-8"/></div>
      <div>
        <h3 class="text-default font-bold text-slate-900 mb-1">Hapkido Trainer</h3>
        <p class="text-sm text-slate-600">12 years of discipline, focus, and leadership training at the highest levels.</p>
      </div>
    </div>
    
    <div class="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform border-t hover:border-cyan-500/50">
      <div class="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg"><BrainCircuit class="w-8 h-8"/></div>
      <div>
        <h3 class="text-default font-bold text-slate-900 mb-1">Hack the Future</h3>
        <p class="text-sm text-slate-600">3rd place winner at the AquaTopia hackathon, demonstrating rapid problem-solving.</p>
      </div>
    </div>
    
    <div class="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform border-t hover:border-indigo-500/50">
      <div class="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg"><Globe class="w-8 h-8"/></div>
      <div>
        <h3 class="text-default font-bold text-slate-900 mb-1">Global Mindset</h3>
        <p class="text-sm text-slate-600">Currently expanding horizons on an International Internship in Finland.</p>
      </div>
    </div>
  </section>

  <section class="pt-20">
    <VideoGallery />
  </section>
</div>
