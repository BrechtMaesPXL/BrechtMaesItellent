<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Mail, MapPin, Send, CheckCircle } from 'lucide-svelte';

  const skills = [
    { name: 'Application Development (SvelteKit, Vue, React)', level: 90 },
    { name: 'Artificial Intelligence (Local RAG, WebLLM)', level: 85 },
    { name: 'Game Engines (Unity WebGL)', level: 80 },
    { name: 'Cloud & Deployment (Azure)', level: 85 },
    { name: 'UI/UX & Design (Tailwind, CSS)', level: 75 }
  ];

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let formSubmitted = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    formSubmitted = true;
  }
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

  <!-- Contact Me Section -->
  <div class="space-y-8 pt-8">
    <div class="text-center space-y-3">
      <h2 class="text-3xl font-bold text-slate-900">Let's Connect</h2>
      <p class="text-slate-600 max-w-lg mx-auto">
        Have an exciting project, integration challenge, or just want to chat about AI? Feel free to reach out!
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
      <!-- Contact Info Card (2 columns) -->
      <div class="md:col-span-2 glass-panel p-8 rounded-3xl space-y-6 flex flex-col justify-between">
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-slate-900">Contact Details</h3>
          
          <div class="space-y-4">
            <div class="flex items-center gap-4 text-slate-600 group">
              <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center group-hover:scale-105 transition-all">
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Email</span>
                <a href="mailto:brecht2003@outlook.com" class="text-sm font-medium hover:text-cyan-600 transition-colors">brecht2003@outlook.com</a>
              </div>
            </div>

            <div class="flex items-center gap-4 text-slate-600">
              <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Location</span>
                <span class="text-sm font-medium">Limburg, Belgium</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4 pt-6 border-t border-black/5">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Socials</h4>
          <div class="flex gap-3">
            <a 
              href="https://github.com/BrechtMaesPXL" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-600 flex items-center justify-center transition-all hover:-translate-y-1"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/brecht-maes/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-600 flex items-center justify-center transition-all hover:-translate-y-1"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form Card (3 columns) -->
      <div class="md:col-span-3 glass-panel p-8 rounded-3xl relative overflow-hidden">
        {#if formSubmitted}
          <div in:fade={{ duration: 300 }} class="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
              <CheckCircle class="w-10 h-10" />
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-slate-900">Message Sent!</h3>
              <p class="text-slate-600 max-w-sm">
                Thank you, <strong>{name}</strong>. Your message has been sent successfully. I'll get back to you at <strong>{email}</strong> as soon as possible.
              </p>
            </div>
            <button 
              onclick={() => { formSubmitted = false; name = ''; email = ''; message = ''; }}
              class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Send another message
            </button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label for="name" class="text-xs font-semibold text-slate-500">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  bind:value={name} 
                  placeholder="Your Name"
                  class="w-full px-4 py-3 bg-black/5 border border-black/5 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-800"
                />
              </div>
              <div class="space-y-1.5">
                <label for="email" class="text-xs font-semibold text-slate-500">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  bind:value={email} 
                  placeholder="name@example.com"
                  class="w-full px-4 py-3 bg-black/5 border border-black/5 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="message" class="text-xs font-semibold text-slate-500">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                required 
                bind:value={message} 
                placeholder="Hi Brecht, I'd love to work together on..."
                class="w-full px-4 py-3 bg-black/5 border border-black/5 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none text-slate-800"
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Send Message</span>
              <Send class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>
