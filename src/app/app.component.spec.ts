import { Component } from '@angular/core';
import { EscanerComponent } from "./components/escaner/escaner.component";
import { InventarioComponent } from "./components/inventario/inventario.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EscanerComponent, InventarioComponent, NavbarComponent]
})
export class AppComponent {
  title = 'mi-aplicacion-angular';
}
