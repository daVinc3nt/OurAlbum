import { supabase } from '../lib/supabase';

// Define the Memory type to match your database schema
export interface Memory {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  story: string; // Text content
  image: string; // URL to the image
  icon?: string; // Optional icon name
  gallery?: string[]; // Optional array of additional image URLs
  gallery_captions?: string[]; // Optional array of captions for gallery images
  template_id?: string; // To store which template was used
  created_at?: string;
}

export const memoryService = {
  // Upload an image to Supabase Storage
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('memories')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('memories').getPublicUrl(filePath);
    return data.publicUrl;
  },

  // Create a new memory record in the database
  async createMemory(memory: Omit<Memory, 'id' | 'created_at'>): Promise<Memory> {
    const { data, error } = await supabase
      .from('memories')
      .insert([memory])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Get all memories
  async getMemories(): Promise<Memory[]> {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },

  // Get a single memory by ID
  async getMemoryById(id: string): Promise<Memory> {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Delete a memory by ID
  async deleteMemory(id: string): Promise<void> {
    const { error } = await supabase
      .from('memories')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
};
