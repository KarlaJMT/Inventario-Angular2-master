import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, Product } from '../../Services/inventory.service';
import { Observable } from 'rxjs';
import {NavbarComponent} from '../navbar/navbar.component'

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private inventoryService: InventoryService) {
    this.products$ = this.inventoryService.inventory$;
  }

  ngOnInit(): void {}

  downloadPDF(products: Product[]) {
    const doc = new jsPDF();
    const title = 'Inventario de Productos';
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    const headers = [['Código', 'Nombre', 'Precio', 'Cantidad']];
    const data = products.map(prod => [prod.id, prod.name, prod.price.toString(), prod.quantity.toString()]);
    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
    });
    doc.save('inventario.pdf');
  }

  downloadExcel(products: Product[]) {
    // Construir los datos con encabezados
    const wsData = [
      ['Código', 'Nombre', 'Precio', 'Cantidad'],
      ...products.map(prod => [prod.id, prod.name, prod.price, prod.quantity])
    ];
    // Crear una hoja de cálculo a partir del array
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    // Crear un libro de Excel y agregar la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');
    // Descargar el archivo Excel
    XLSX.writeFile(wb, 'inventario.xlsx');
  }
}
