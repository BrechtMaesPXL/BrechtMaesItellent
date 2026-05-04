<script lang="ts">
  import { MessageSquare, X, Loader2, Send } from 'lucide-svelte';
  import { onMount, tick } from 'svelte';
  import { initRAG, findRelevantContext } from '$lib/ai/engine';
  import { CreateMLCEngine } from '@mlc-ai/web-llm';
  
  let isOpen = $state(false);
  let isInitializing = $state(true);
  let progressText = $state('Loading dependencies...');
  let chatEngine: any = null;
  
  let messages = $state([
    { role: 'assistant', text: "Hello! I'm the local Brecht Tech assistant. What would you like to know about his portfolio?" }
  ]);
  
  let userInput = $state('');
  let chatContainer: HTMLElement | undefined = $state();
  let isThinking = $state(false);

  // We only pull the model if the user opens the chat, to save bandwidth
  let hasInitiatedLoad = $state(false);

  async function loadAI() {
    if (hasInitiatedLoad) return;
    hasInitiatedLoad = true;
    try {
      progressText = 'Initializing vector store...';
      await initRAG();
      
      progressText = 'Loading Local LLM...';
      // We use a small conversational Llama for speed and compatibility
      chatEngine = await CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-1k", {
        initProgressCallback: (info) => {
          progressText = `Loading Model: ${Math.round(info.progress * 100)}%`;
        }
      });
      
      isInitializing = false;
    } catch (e) {
      console.error(e);
      progressText = "Failed to load WebGPU AI. Please use a compatible browser.";
    }
  }

  $effect(() => {
    if (isOpen) {
      loadAI();
    }
  });

  async function sendMessage() {
    if (!userInput.trim() || !chatEngine || isThinking || isInitializing) return;
    
    const query = userInput.trim();
    userInput = '';
    
    messages = [...messages, { role: 'user', text: query }];
    isThinking = true;
    
    await tick();
    chatContainer?.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });

    try {
      const context = await findRelevantContext(query);
      
      const systemPrompt = `You are Brecht Maes's AI assistant running locally. Use the following context about Brecht to answer the user's question accurately. Keep it short and professional.\n\nContext:\n${context}`;
      
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.text }))
      ];
      
      const reply = await chatEngine.chat.completions.create({
        messages: apiMessages,
      });
      
      const answer = reply.choices[0].message.content;
      messages = [...messages, { role: 'assistant', text: answer }];
    } catch (e) {
      messages = [...messages, { role: 'assistant', text: "Sorry, I ran into an error generating that response." }];
    }
    
    isThinking = false;
    await tick();
    chatContainer?.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
  {#if isOpen}
    <div class="glass-panel w-80 sm:w-96 h-[500px] rounded-2xl mb-4 flex flex-col overflow-hidden shadow-cyan-500/20 shadow-2xl relative">
      <!-- Header -->
      <div class="bg-black/5 px-4 py-3 flex justify-between items-center border-b border-black/5">
        <h3 class="font-bold text-slate-900 text-sm">Brecht Tech Assistant</h3>
        <button onclick={() => isOpen = false} class="text-slate-500 hover:text-slate-900 hover:bg-black/5 rounded p-1 transition-colors">
          <X class="w-4 h-4"/>
        </button>
      </div>
      
      <!-- Chat Body -->
      <div bind:this={chatContainer} class="flex-1 p-4 overflow-y-auto text-sm flex flex-col gap-3">
        {#each messages as msg}
          <div class="rounded-lg p-3 max-w-[85%] border {msg.role === 'user' ? 'bg-cyan-100 border-cyan-200 text-slate-900 self-end' : 'bg-black/5 border-black/5 text-slate-700 self-start'}">
            {msg.text}
          </div>
        {/each}
        
        {#if isThinking}
          <div class="rounded-lg p-3 max-w-[85%] self-start bg-black/5 border border-black/5 text-slate-500 flex items-center space-x-2">
            <Loader2 class="w-4 h-4 animate-spin shrink-0" />
            <span>Thinking...</span>
          </div>
        {/if}

        {#if isInitializing && !isThinking}
          <div class="flex items-center justify-center space-x-2 mt-auto self-center text-xs text-cyan-400/80 pt-4 pb-2">
            <Loader2 class="w-4 h-4 animate-spin shrink-0" />
            <span>{progressText}</span>
          </div>
        {/if}
      </div>
      
      <!-- Input -->
      <div class="p-3 border-t border-black/5 bg-white/80 flex items-center gap-2">
        <input 
          disabled={isInitializing || isThinking}
          type="text" 
          bind:value={userInput}
          onkeydown={handleKeydown}
          placeholder={isInitializing ? "Please wait..." : "Ask me anything..."} 
          class="flex-1 bg-black/5 text-slate-800 rounded-lg px-3 py-2 text-sm border border-black/10 focus:outline-hidden focus:border-cyan-500 disabled:opacity-50 placeholder:text-slate-400" 
        />
        <button 
          disabled={isInitializing || isThinking || !userInput.trim()}
          onclick={sendMessage}
          class="p-2 rounded-lg bg-cyan-600 text-white disabled:opacity-50 hover:bg-cyan-500 transition-colors"
        >
          <Send class="w-4 h-4" />
        </button>
      </div>
    </div>
  {/if}

  <button 
    onclick={() => isOpen = !isOpen}
    class="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-cyan-500 hover:to-blue-500 transition-all text-white rounded-full p-4 shadow-lg shadow-cyan-500/30 flex items-center justify-center relative overflow-hidden group"
  >
    <div class="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors"></div>
    {#if isOpen}
      <X class="w-6 h-6 relative z-10" />
    {:else}
      <MessageSquare class="w-6 h-6 relative z-10" />
    {/if}
  </button>
</div>
