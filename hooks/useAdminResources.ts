import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { getAllDbPillarCodes } from '@/utils/pillarMapping';

type Resource = Database['public']['Tables']['resources']['Row'];

interface ResourceWithCategory extends Resource {
  category?: {
    name_pt: string;
  };
}

export function useAdminResources() {
  const [resources, setResources] = useState<ResourceWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);

      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('*, category:resource_categories(name_pt)')
        .order('created_at', { ascending: false });

      if (resourcesError) throw resourcesError;

      setResources(resourcesData || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching resources:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addResource = async (resourceData: {
    title_pt: string;
    title_en?: string;
    description_pt: string;
    description_en?: string;
    resource_type: string;
    pillar_code: Database['public']['Enums']['pillar_code'];
    category_id?: string;
    file_url?: string;
    thumbnail_url?: string;
    file_size_bytes?: number;
    duration_minutes?: number;
    difficulty_level?: string;
    tags?: string[];
    is_published?: boolean;
  }) => {
    try {
      console.log('Adding resource with data:', {
        ...resourceData,
        file_url: resourceData.file_url ? '[has file]' : null,
        thumbnail_url: resourceData.thumbnail_url ? '[has thumbnail]' : null
      });

      // Validate required fields
      if (!resourceData.title_pt || !resourceData.description_pt) {
        throw new Error('Título e descrição são obrigatórios');
      }

      if (!resourceData.pillar_code) {
        throw new Error('Código do pilar é obrigatório');
      }

      // Validate pillar_code is a valid enum value (UPPERCASE as per database)
      const validPillars = getAllDbPillarCodes();
      if (!validPillars.includes(resourceData.pillar_code as string)) {
        throw new Error(`Código do pilar inválido: ${resourceData.pillar_code}. Deve ser um de: ${validPillars.join(', ')}`);
      }

      const { data, error: insertError } = await supabase
        .from('resources')
        .insert([resourceData])
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        // Provide more helpful error messages
        if (insertError.code === '42501') {
          throw new Error('Não tem permissões para adicionar recursos. Verifique se é administrador.');
        } else if (insertError.code === '23514') {
          throw new Error('Dados inválidos. Verifique se todos os campos obrigatórios estão preenchidos.');
        } else if (insertError.code === '22P02') {
          throw new Error(`Valor inválido para enum: ${insertError.message}`);
        }
        throw insertError;
      }

      console.log('Resource added successfully:', data);
      await fetchResources();
      return { success: true, data };
    } catch (err: any) {
      console.error('Error adding resource:', err);
      const errorMessage = err.message || 'Erro desconhecido ao adicionar recurso';
      return { success: false, error: errorMessage };
    }
  };

  const updateResource = async (
    resourceId: string,
    resourceData: Partial<ResourceWithCategory>
  ) => {
    try {
      const { error: updateError } = await supabase
        .from('resources')
        .update(resourceData)
        .eq('id', resourceId);

      if (updateError) throw updateError;

      await fetchResources();
      return { success: true };
    } catch (err: any) {
      console.error('Error updating resource:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteResource = async (resourceId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId);

      if (deleteError) throw deleteError;

      await fetchResources();
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting resource:', err);
      return { success: false, error: err.message };
    }
  };

  const uploadFile = async (file: File, bucket: 'resources' | 'thumbnails' = 'resources') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName; // Just the filename, bucket is specified in .from()

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { success: true, url: urlData.publicUrl, path: filePath };
    } catch (err: any) {
      console.error('Error uploading file:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    resources,
    loading,
    error,
    refetch: fetchResources,
    addResource,
    updateResource,
    deleteResource,
    uploadFile
  };
}

