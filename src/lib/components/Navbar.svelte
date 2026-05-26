<script lang="ts">
  import { page } from '$app/state';
  import { Menu, X } from 'lucide-svelte';

  let menuOpen = $state(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Activities', path: '/activities' },
    { name: 'Play Game', path: '/play' }
  ];
</script>

<nav class="fixed top-0 left-0 right-0 z-40 glass border-b border-black/5 text-slate-900 shadow-lg">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0 font-bold text-xl tracking-wider text-cyan-600">
          <span class="text-slate-900">BRECHT</span>TECH
        </a>
      </div>
      
      <!-- Desktop menu -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-6">
          {#each navItems as item}
            <a 
              href={item.path} 
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-cyan-600 {page.url.pathname === item.path ? 'bg-black/5 text-cyan-600' : 'text-slate-600'}"
            >
              {item.name}
            </a>
          {/each}
        </div>
      </div>

      <!-- Mobile menu button -->
      <div class="-mr-2 flex md:hidden">
        <button 
          onclick={() => menuOpen = !menuOpen}
          type="button" 
          class="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-black/5 focus:outline-hidden"
        >
          <span class="sr-only">Open main menu</span>
          {#if menuOpen}
            <X class="block w-6 h-6" />
          {:else}
            <Menu class="block w-6 h-6" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div class="md:hidden glass-panel border-t border-black/5">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each navItems as item}
          <a 
            href={item.path} 
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors {page.url.pathname === item.path ? 'bg-black/5 text-cyan-600' : 'text-slate-600 hover:text-slate-900'}"
            onclick={() => menuOpen = false}
          >
            {item.name}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
