<script lang="ts">
  import { ShieldAlert, Trophy, Globe, Filter, X, UserCircle, Users, Briefcase } from 'lucide-svelte';

  let activeFilter = $state('All');
  let selectedActivity = $state<any>(null);

  const activities = [
    {
      category: 'Seminars',
      title: 'Seminarie AI (Jackie Janssen)',
      description: 'Tijdens dit seminarie werd er dieper ingegaan op de huidige trends en de impact van Artificiële Intelligentie binnen de moderne maatschappij en IT-sector.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20240420132523.jpg']
    },
    {
      category: 'Seminars',
      title: 'IBM: Quantum Machine Learning, from Zero to Hero',
      description: 'Een technische sessie over de basis van quantum computing en hoe deze technologie wordt ingezet om machine learning modellen te versnellen.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20240420185635.jpg']
    },
    {
      category: 'Seminars',
      title: 'Sarah Swaenepoel: Een bedrijf in bijberoep',
      description: 'Uitleg over de juridische en praktische aspecten van het starten als IT-ondernemer in bijberoep, inclusief fiscaliteit en administratie.',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20241209200714.jpg']
    },
    {
      category: 'Seminars',
      title: 'IBM: Discover the meeting point of GenAI, Prompt Engineering and Quantum Computing',
      description: 'Een exploratie van hoe generatieve AI en quantum computing elkaar overlappen en hoe prompt engineering hierin een cruciale rol speelt.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20251112082857.jpg']
    },
    {
      category: 'Seminars',
      title: 'Cegeka: Enterprise Architecture',
      description: 'Inzicht in de complexe architectuur van grote IT-systemen binnen enterprise omgevingen, met focus op schaalbaarheid en onderhoudbaarheid.',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20251112124744.jpg']
    },
    {
      category: 'Seminars',
      title: 'Politie: Intro into Digital Forensics',
      description: 'Een introductie in de wereld van digitaal sporenonderzoek, waarbij werd uitgelegd hoe data veiliggesteld en geanalyseerd wordt bij cybercriminaliteit.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20251112124817.jpg']
    },
    {
      category: 'Seminars',
      title: 'AE: State management for Angular',
      description: 'Een technische workshop over het efficiënt beheren van applicatie-states in complexe Angular-projecten met behulp van moderne libraries.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20251112151202.jpg']
    },
    {
      category: 'Seminars',
      title: 'Ericsson: The path to 6G',
      description: 'Een vooruitblik op de volgende generatie mobiele netwerken (6G) en de technologische uitdagingen die hierbij komen kijken.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20260224100118.jpg']
    },
    {
      category: 'Seminars',
      title: 'Resillion: Code Katas',
      description: 'Praktische sessie over het verbeteren van codekwaliteit en logisch denken door middel van herhaalbare programmeeroefeningen.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20260224201304.jpg']
    },
    {
      category: 'Seminars',
      title: 'Gluo: Multicloud workshop',
      description: 'Workshop over het beheren van applicaties over verschillende cloud-omgevingen heen (AWS, Azure, GCP).',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20260227191147.jpg']
    },
    {
      category: 'Seminars',
      title: 'Kabisa: Gebruik van AI in softwareontwikkeling',
      description: 'Verkenning van hoe AI-tools zoals Copilot en LLM\'s het dagelijkse werk van een developer versnellen en veranderen.',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      images: ['/pictures/IMG20260302113504.jpg']
    },
    {
      category: 'Innovation',
      title: 'Innovatieroute: genAI',
      description: 'Een langdurig traject gericht op de implementatie en mogelijkheden van Generative AI, waarbij innovatieve oplossingen werden onderzocht.',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/IMG20260306175337.jpg']
    },
    {
      category: 'Innovation',
      title: 'Hackaton: Hack the Future – AquaTopia',
      description: 'Tijdens deze hackathon werkten we in een team van twee personen aan een intensieve technische case rond Linux-serverbeheer en database-architectuur. We behaalden de 3de plaats.',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/IMG20260402225219.jpg']
    },
    {
      category: 'Innovation',
      title: 'Pitch Please - 1st Place',
      description: 'Innovatiewedstrijd gericht op het pitchen van een business concept. Eerste plaats behaald met een Virtual Reality oplossing voor de campus.',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/image.png']
    },
    {
      category: 'Innovation',
      title: 'Codebash - 2nd Place',
      description: 'Competitieve programmeerwedstrijd gericht op snelheid en efficiëntie. Tweede plaats behaald.',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/image copy.png']
    },
    {
      category: 'Innovation',
      title: 'Hack the Future – Among the Stars',
      description: 'Thema-hackathon over ruimtevaart-gerelateerde IT-uitdagingen. 4de plaats behaald.',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/image copy 2.png']
    },
    {
      category: 'Innovation',
      title: 'Vlaamse Programmeerwedstrijd',
      description: 'Deelname aan de nationale wedstrijd voor algoritmen en probleemoplossend denken. 4de plaats.',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/IMG20240420132523.jpg']
    },
    {
      category: 'Innovation',
      title: 'Belgium Cyber Security Challenge',
      description: 'Deelname aan de nationale competitie voor cybersecurity, waarbij ik eindigde als 100ste van de 400 deelnemers.',
      icon: ShieldAlert,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      images: ['/pictures/IMG20240420185635.jpg']
    },
    {
      category: 'Personal',
      title: 'Projectweek 2TIN',
      description: 'Een intensieve week gericht op teamwerk en de opstart van het Research Project, met focus op persoonlijke professionele groei.',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      images: ['/pictures/IMG20241209200714.jpg']
    },
    {
      category: 'Personal',
      title: 'POP-sessie 2TIN: My Team and I',
      description: 'Interactieve sessie gericht op groepsdynamiek, rollen binnen een team en het verbeteren van de onderlinge samenwerking.',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      images: ['/pictures/IMG20251112082857.jpg']
    },
    {
      category: 'Personal',
      title: 'POP-sessie 2TIN: Brein aan het werk! Niet storen!',
      description: 'Training over focus, timemanagement en het optimaliseren van mentale prestaties tijdens complexe programmeertaken.',
      icon: UserCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      images: ['/pictures/IMG20251112124744.jpg']
    },
    {
      category: 'Personal',
      title: 'POP-sessie 3TIN: POPping',
      description: 'Reflectiemoment over de eigen voortgang en het aanscherpen van de professionele identiteit ter voorbereiding op de stage.',
      icon: UserCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      images: ['/pictures/IMG20251112124817.jpg']
    },
    {
      category: 'International',
      title: 'Internationale Stage Finland (FrostBit)',
      description: 'Buitenlandse stage-ervaring waarbij ik werk aan IT-projecten in een internationale context. Ontwikkeling van eLukulauta, een offline-first React Native app voor rendierhouderij met geavanceerde SQLite encryptie en P2P synchronisatie.',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      images: ['/pictures/IMG20260402225219.jpg', '/pictures/IMG20260306175337.jpg']
    }
  ];

  let filteredActivities = $derived(
    activeFilter === 'All' ? activities : activities.filter(a => a.category === activeFilter)
  );

  const filters = ['All', 'Seminars', 'Innovation', 'Personal', 'International'];

  function openModal(activity: any) {
    selectedActivity = activity;
  }

  function closeModal() {
    selectedActivity = null;
  }
</script>

<svelte:head>
  <title>Activities | Brecht Tech</title>
</svelte:head>

<div class="max-w-5xl mx-auto py-12 space-y-12">
  <div class="flex flex-col md:flex-row justify-between items-end gap-6">
    <div>
      <h1 class="text-4xl font-bold text-slate-900 mb-2">Activities Timeline</h1>
      <p class="text-slate-600">A track record of continuous learning and achievement.</p>
    </div>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap gap-2 p-1 glass-panel rounded-xl">
      {#each filters as filter}
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {activeFilter === filter ? 'bg-black/10 text-slate-900' : 'text-slate-600 hover:text-slate-900'}"
          onclick={() => activeFilter = filter}
        >
          {filter}
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each filteredActivities as activity}
      {@const Icon = activity.icon}
      <button 
        class="glass-panel p-6 rounded-2xl border border-black/5 hover:border-cyan-500/30 transition-colors group flex gap-4 text-left w-full focus:outline-hidden"
        onclick={() => openModal(activity)}
      >
        <div class="shrink-0 mt-1">
          <div class="w-12 h-12 rounded-xl {activity.bgColor} {activity.color} flex items-center justify-center">
            <Icon class="w-6 h-6" />
          </div>
        </div>
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
            {activity.category}
          </span>
          <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{activity.title}</h3>
          <p class="text-slate-600 text-sm leading-relaxed">{activity.description}</p>
        </div>
      </button>
    {/each}
  </div>
</div>

{#if selectedActivity}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onclick={closeModal}>
    <div class="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl shadow-black/20" onclick={e => e.stopPropagation()}>
      <div class="flex justify-between items-start mb-6">
        <div>
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider block mb-2">{selectedActivity.category}</span>
          <h2 class="text-3xl font-bold text-slate-900">{selectedActivity.title}</h2>
        </div>
        <button onclick={closeModal} class="p-2 rounded-full hover:bg-black/5 text-slate-500 hover:text-slate-900 transition-colors">
          <X class="w-6 h-6" />
        </button>
      </div>
      <p class="text-slate-700 text-lg mb-8 leading-relaxed">{selectedActivity.description}</p>
      
      {#if selectedActivity.images && selectedActivity.images.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each selectedActivity.images as img}
            <img src={img} alt="Activity" class="w-full h-auto rounded-xl object-cover aspect-video shadow-md border border-black/5" />
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
