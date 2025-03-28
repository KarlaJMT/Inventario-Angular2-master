import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { InventoryService, Product } from '../../Services/inventory.service';
import {NavbarComponent} from '../navbar/navbar.component'

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ZXingScannerModule, NavbarComponent],
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.css']
})
export class EscanerComponent {
  scannerEnabled = false;
  scanResult: string | null = null;
  
  allowedFormats = [
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX
  ];

  // Bandera para mostrar el formulario de creación de producto
  showAddProductForm = false;
  newProduct: Product = { id: '', name: '', price: 0, quantity: 1 };

  constructor(private inventoryService: InventoryService) {}

  onScanSuccess(result: string) {
    this.scanResult = result;
    this.scannerEnabled = false;
    console.log('Código escaneado:', result);
    // Asignar el código escaneado al id del producto
    this.newProduct.id = result;
    const existingProduct = this.inventoryService.getInventory().find(p => p.id === result);
    if (existingProduct) {
      // Si existe, incrementar la cantidad en 1
      this.inventoryService.addOrUpdateProduct({ ...existingProduct, quantity: 1 });
      alert('Producto existente, cantidad incrementada.');
    } else {
      // Si no existe, se muestra el formulario para agregarlo
      this.showAddProductForm = true;
    }
  }

  startScanner() {
    this.scanResult = null;
    this.scannerEnabled = true;
    this.showAddProductForm = false;
  }

  stopScanner() {
    this.scannerEnabled = false;
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.price > 0) {
      this.inventoryService.addOrUpdateProduct(this.newProduct);
      alert('Producto agregado al inventario.');
      this.showAddProductForm = false;
      // Reiniciar el objeto para futuros productos
      this.newProduct = { id: '', name: '', price: 0, quantity: 1 };
    } else {
      alert('Por favor, complete el nombre y precio del producto.');
    }
  }
}
