import { ArrowLeft, BookOpen, Video, Headphones, Search, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
// DISABLED: import from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

interface RecursosPageProps {
  setActiveTab?: (tab: string) => void;
  onBack?: () => void;
}

type PillarFilter = 'all' | 'mental' | 'fisico' | 'financeira' | 'juridica';
type ContentFilter = 'all' | 'article' | 'video' | 'audio';

const PILLAR_TABS = [
  { id: 'all'        as PillarFilter, label: 'Todos',     accent: '#1565C0' },
  { id: 'mental'     as PillarFilter, label: 'Mental',    accent: '#1565C0' },
  { id: 'fisico'     as PillarFilter, label: 'Físico',    accent: '#FB923C' },
  { id: 'financeira' as PillarFilter, label: 'Finanças',  accent: '#34D399' },
  { id: 'juridica'   as PillarFilter, label: 'Jurídico',  accent: '#F472B6' },
];

const CONTENT_TABS = [
  { id: 'all'     as ContentFilter, label: 'Tudo',    Icon: BookOpen },
  { id: 'article' as ContentFilter, label: 'Artigos', Icon: BookOpen },
  { id: 'video'   as ContentFilter, label: 'Vídeos',  Icon: Video },
  { id: 'audio'   as ContentFilter, label: 'Áudio',   Icon: Headphones },
];

interface Resource {
  id: number;
  title: string;
  summary: string;
  pillar: PillarFilter;
  type: ContentFilter;
  readTime: string;
  accent: string;
}

const PILLAR_MAP: Record<string, { filter: PillarFilter; accent: string }> = {
  PSYCH:    { filter: 'mental',     accent: '#1565C0' },
  PHYSICAL: { filter: 'fisico',     accent: '#FB923C' },
  FINANCIAL:{ filter: 'financeira', accent: '#34D399' },
  LEGAL:    { filter: 'juridica',   accent: '#F472B6' },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = resource.type === 'article' ? BookOpen : resource.type === 'video' ? Video : Headphones;

  return (
    <div


      layout
      className="rounded-[28px] p-4 flex gap-4 active:scale-[0.98] transition-transform cursor-pointer shadow-sm bg-white"
      style={{ border: `1px solid ${CARD_EL}` }}
    >
      {/* Icon tile */}
      <div
        className="size-12 rounded-full flex items-center justify-center shrink-0 border border-black/5"
        style={{ background: `${resource.accent}15` }}
      >
        <Icon size={20} style={{ color: resource.accent }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-poppins text-[#0a0a0a] text-[16px] font-light leading-snug flex-1">{resource.title}</p>
          <ChevronRight size={14} className="text-[#474747] shrink-0 mt-0.5" />
        </div>
        <p className="font-poppins text-[#474747] text-[13px] leading-snug line-clamp-2">{resource.summary}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className="font-poppins text-[10px] font-bold px-2 py-0.5 rounded-[4px]"
            style={{ background: `${resource.accent}15`, color: resource.accent }}
          >
            {PILLAR_TABS.find(p => p.id === resource.pillar)?.label}
          </span>
          <span className="font-poppins text-[#474747] text-[11px] font-medium">{resource.readTime}</span>
        </div>
      </div>
    </div>
  );
}
function FeaturedResource() {
  return (
    <div


      className="relative w-full rounded-[32px] overflow-hidden mb-8 shadow-md cursor-pointer group"
    >
      <img 
        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop" 
        alt="Destaque" 
        className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="bg-[#1565C0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-3 uppercase tracking-wider">
          Recurso em Destaque
        </div>
        <h2 className="font-poppins text-white text-[24px] font-semibold leading-tight mb-2">
          Como gerir o stress e manter o foco no trabalho
        </h2>
        <p className="font-poppins text-white/80 text-[14px] line-clamp-2 mb-4">
          Descobre estratégias práticas para manter a tua saúde mental em dia, mesmo nos momentos de maior pressão.
        </p>
        <button className="bg-white text-[#1565C0] px-5 py-2.5 rounded-full font-poppins font-bold text-[13px] active:scale-95 transition-all">
          Ler agora
        </button>
      </div>
    </div>
  );
}
export function RecursosPage({ setActiveTab, onBack }: RecursosPageProps) {
  const { t } = useLanguage();
  const [pillarFilter, setPillarFilter] = useState<PillarFilter>('all');
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');
  const [search, setSearch] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const mapped: Resource[] = (data || []).map((item: any, idx: number) => {
          const pillarInfo = PILLAR_MAP[item.pillar_code] || { filter: 'mental' as PillarFilter, accent: '#1565C0' };
          const type: ContentFilter = item.resource_type === 'video' ? 'video' : item.resource_type === 'audio' ? 'audio' : 'article';
          const readTime = item.duration_minutes > 0 ? `${item.duration_minutes} min` : (item.reading_time || '5 min');
          return {
            id: idx + 1,
            title: item.title_pt || item.title_en || 'Recurso',
            summary: item.description_pt || item.description_en || '',
            pillar: pillarInfo.filter,
            type,
            readTime,
            accent: pillarInfo.accent,
          };
        });

        setResources(mapped);
      } catch (err) {
        console.error('Error fetching resources:', err);
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, []);

  const filtered = resources.filter((r) => {
    const matchesPillar  = pillarFilter  === 'all' || r.pillar === pillarFilter;
    const matchesContent = contentFilter === 'all' || r.type   === contentFilter;
    const matchesSearch  = !search || r.title.toLowerCase().includes(search.toLowerCase());
    return matchesPillar && matchesContent && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-32">

      {/* Sticky header */}
      <div
        className="sticky top-0 z-30 px-5 pt-12 pb-4"
        style={{ background: `transparent`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}
      >
        {/* Back + title */}
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
              style={{ border: `1px solid ${CARD_EL}` }}
            >
              <ArrowLeft size={17} className="text-[#0a0a0a]" />
            </button>
          )}
          <div>
            <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Biblioteca</p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">Recursos</h1>
          </div>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-full mb-4 bg-white shadow-sm"
          style={{ border: `1px solid ${CARD_EL}` }}
        >
          <Search size={15} className="text-[#474747] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar recursos..."
            className="flex-1 bg-transparent font-poppins text-[#0a0a0a] text-[14px] placeholder:text-[#474747] outline-none"
          />
        </div>

        {/* Pillar filter tabs - Grid layout for no-scroll visibility */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {PILLAR_TABS.map(({ id, label, accent }) => {
            const active = pillarFilter === id;
            return (
              <button
                key={id}
                onClick={() => setPillarFilter(id)}
                className="py-2.5 rounded-2xl font-poppins text-[11px] font-bold transition-all active:scale-95 shadow-sm border"
                style={{
                  background: active ? accent : '#ffffff',
                  color: active ? '#fff' : '#474747',
                  borderColor: active ? accent : CARD_EL,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content type tabs */}
        <div className="flex gap-2 mt-2.5 overflow-x-auto scrollbar-none">
          {CONTENT_TABS.map(({ id, label, Icon }) => {
            const active = contentFilter === id;
            return (
              <button
                key={id}
                onClick={() => setContentFilter(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-poppins text-[11px] font-semibold whitespace-nowrap transition-all active:scale-95"
                style={{
                  background: active ? '#ecece7' : 'transparent',
                  color: active ? '#0a0a0a' : '#474747',
                  border: active ? '1px solid #ecece7' : `1px solid transparent`,
                  flexShrink: 0,
                }}
              >
                <Icon size={11} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource list */}
      <div className="px-5 pt-4">
        {loadingResources ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <p className="font-poppins text-[#474747] text-[12px] font-medium mb-3">
              {filtered.length} recurso{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
            
              <div className="flex flex-col gap-3">
                {filtered.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="size-16 rounded-full bg-[#f2f1ef] flex items-center justify-center mb-4">
                  <Search size={24} className="text-[#474747]" />
                </div>
                <p className="font-poppins text-[#0a0a0a] text-[18px] font-light">Nenhum recurso encontrado</p>
                <p className="font-poppins text-[#474747] text-[14px] mt-1">Tenta outro filtro ou pesquisa</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}