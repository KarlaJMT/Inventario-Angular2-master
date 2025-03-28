// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'TU_URL_SUPABASE', 
      'TU_CLAVE_ANON_PUBLICA'
    );
  }

  get client() {
    return this.supabase;
  }
}