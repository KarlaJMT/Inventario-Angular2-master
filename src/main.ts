import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

// 1. Importa la función registerLicense de Syncfusion
import { registerLicense } from '@syncfusion/ej2-base';

// 2. Registra tu clave de licencia ANTES de bootstrappear la aplicación
registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCekx0QHxbf1x1ZFxMYFtbRHdPMyBoS35Rc0VgW3leeXRSRmRYVkB3VEBU');

// 3. Bootstrap de la aplicación (sin cambios en tu lógica existente)
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule)
  ]
}).catch(err => console.error(err));