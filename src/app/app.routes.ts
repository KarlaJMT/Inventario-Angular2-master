import { Routes } from '@angular/router';
import { EscanerComponent } from './components/escaner/escaner.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { GeneradorComponent } from './components/generador/generador.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'InicioSesion', pathMatch: 'full' },
    { path: 'escanear', component: EscanerComponent, canActivate: [AuthGuard]},
    { path: 'InicioSesion', component: InicioSesionComponent },
    { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard]},
    { path: 'generador', component: GeneradorComponent,canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'InicioSesion' }
];