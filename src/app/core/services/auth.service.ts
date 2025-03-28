// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.loadUser();
    this.setupAuthListener();
  }

  private loadUser() {
    this.supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        this.currentUser.next(data.user);
      }
    });
  }

  private setupAuthListener() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        this.currentUser.next(null);
        this.router.navigate(['/login']);
      }
    });
  }

  get user$(): Observable<any> {
    return this.currentUser.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  async signInWithGoogle(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://blxtrzepxiyxttbahfwi.supabase.co/auth/v1/callback'
      }
    });

    if (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return this.currentUser.value;
  }
}