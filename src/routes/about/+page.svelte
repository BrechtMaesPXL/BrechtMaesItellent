<script lang="ts">
  const skills = [
    { name: 'Application Development (SvelteKit, Vue, React)', level: 90 },
    { name: 'Artificial Intelligence (Local RAG, WebLLM)', level: 85 },
    { name: 'Game Engines (Unity WebGL)', level: 80 },
    { name: 'Cloud & Deployment (Azure)', level: 85 },
    { name: 'UI/UX & Design (Tailwind, CSS)', level: 75 }
  ];
</script>

<svelte:head>
  <title>About | Brecht Tech</title>
</svelte:head>

<div class="max-w-4xl mx-auto py-12 space-y-16">
  
  <div class="text-center space-y-4">
    <h1 class="text-4xl md:text-5xl font-bold text-slate-900">My Identity</h1>
    <p class="text-xl text-slate-600">Jack of all trades, master of integration.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
    <!-- Bio Section -->
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-cyan-600 border-b border-black/5 pb-2">The Journey</h2>
      <p class="text-slate-600 leading-relaxed">
        My roots lie in a unique blend of martial arts discipline and technological curiosity. As a Hapkido trainer for 12 years, I've learned the value of patience, flow, and continuous incremental improvement.
      </p>
      <p class="text-slate-600 leading-relaxed">
        I bring that same mindset to IT. I thrive when integrating diverse systems—taking complex AI architectures and baking them into sleek, user-friendly frontend experiences. 
      </p>
    </div>

    <!-- Skills Radar / Bars -->
    <div class="glass-panel p-6 rounded-2xl space-y-6">
      <h2 class="text-xl font-bold text-slate-900">Versatility Profile</h2>
      
      <div class="space-y-4">
        {#each skills as skill}
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-slate-600">{skill.name}</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 border border-black/5 overflow-hidden">
              <div class="bg-linear-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style="width: {skill.level}%"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Future Vision -->
  <div class="glass-panel p-10 rounded-2xl text-center space-y-6 relative overflow-hidden border border-cyan-500/30">
    <div class="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-3xl rounded-full"></div>
    <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full"></div>
    
    <h2 class="text-3xl font-bold text-slate-900 relative z-10">Future Vision</h2>
    <p class="text-lg text-slate-600 max-w-2xl mx-auto relative z-10">
      Over the next 3–5 years, my goal is to solidify my expertise in full-stack architecture and AI engineering. I aim to achieve stability in my workflow, embracing a "quality flow" state where robust code and beautiful design meet seamlessly.
    </p>
  </div>
</div>
