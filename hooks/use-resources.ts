import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type ResourceType = 'article' | 'video' | 'audio';
export type ResourcePillar = 'PSYCH' | 'PHYSICAL' | 'FINANCIAL' | 'LEGAL';

export interface Resource {
  id: string;
  title_pt: string;
  description_pt: string | null;
  resource_type: ResourceType;
  pillar_code: ResourcePillar | null;
  thumbnail_url: string | null;
  file_url: string | null;
  duration_minutes: number | null;
  created_at: string;
}

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    const { data, error } = await (supabase.from('resources') as any)
      .select('id, title_pt, description_pt, resource_type, pillar_code, thumbnail_url, file_url, duration_minutes, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(40);
    if (error) console.warn('[useResources] fetch error:', error.message, error.code);
    setResources((data || []) as Resource[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchResources(); }, [fetchResources]);

  return { resources, loading, refetch: fetchResources };
}
