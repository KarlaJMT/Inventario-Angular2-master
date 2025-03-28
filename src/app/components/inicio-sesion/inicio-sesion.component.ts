import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async handleGoogleLogin() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/inventario']);
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión con Google';
      console.error(error);
    }
  }

  // Si necesitas el login con email/password más adelante
  handleSubmit(event: Event) {
    event.preventDefault();
    // Lógica para login tradicional aquí
  }
}