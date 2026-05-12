import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type ResourceType = 'article' | 'video' | 'audio';
export type ResourcePillar = 'PSYCH' | 'PHYSICAL' | 'FINANCIAL' | 'LEGAL';

export interface Resource {
  id: string;
  title_pt: string;
  summary_pt: string | null;
  content_type: ResourceType;
  pillar: ResourcePillar | null;
  thumbnail_url: string | null;
  video_url: string | null;
  audio_url: string | null;
  read_time_minutes: number | null;
  created_at: string;
}

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    const { data } = await (supabase.from('resources') as any)
      .select('id, title_pt, summary_pt, content_type, pillar, thumbnail_url, video_url, audio_url, read_time_minutes, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(40);
    setResources((data || []) as Resource[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchResources(); }, [fetchResources]);

  return { resources, loading, refetch: fetchResources };
}
