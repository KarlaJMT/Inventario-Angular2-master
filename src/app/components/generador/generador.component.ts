import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import JsBarcode from 'jsbarcode';
import { InventoryService, Product } from '../../Services/inventory.service';
import {NavbarComponent} from '../navbar/navbar.component'

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.css']
})
export class GeneradorComponent {
  @ViewChild('barcodeCanvas') barcodeCanvas!: ElementRef<HTMLCanvasElement>;
  barcodeValue = '123456789012';
  displayText = true;
  statusMessage = '';
  barcodeFormat = 'CODE128';

  // Producto que se agregará al inventario
  newProduct: Product = { id: this.barcodeValue, name: '', price: 0, quantity: 1 };

  constructor(private inventoryService: InventoryService) {}

  ngAfterViewInit() {
    this.generateBarcode();
  }

  generateBarcode() {
    try {
      JsBarcode(this.barcodeCanvas.nativeElement, this.barcodeValue, {
        format: this.barcodeFormat,
        displayValue: this.displayText,
        width: 2,
        height: 100,
        margin: 10,
        lineColor: '#000000',
        background: '#FFFFFF',
        font: 'OCRB',
        fontSize: 16,
        textMargin: 5,
        valid: (valid) => {
          if (!valid) {
            this.statusMessage = 'Código no válido para el formato seleccionado';
          }
        }
      });
      this.statusMessage = 'Código de barras generado correctamente';
      // Actualizar el id en el objeto newProduct
      this.newProduct.id = this.barcodeValue;
      setTimeout(() => this.statusMessage = '', 3000);
    } catch (error) {
      this.statusMessage = 'Error al generar el código de barras';
      console.error(error);
    }
  }

  generateRandom() {
    this.barcodeValue = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    this.generateBarcode();
  }

  downloadBarcode() {
    const canvas = this.barcodeCanvas.nativeElement;
    const link = document.createElement('a');
    link.download = `barcode-${this.barcodeValue}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  validateBarcode() {
    return /^[!-~ ]+$/.test(this.barcodeValue);
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.price > 0) {
      this.inventoryService.addOrUpdateProduct(this.newProduct);
      alert('Producto agregado al inventario.');
      // Reiniciamos los campos (manteniendo el código generado)
      this.newProduct = { id: this.barcodeValue, name: '', price: 0, quantity: 1 };
    } else {
      alert('Por favor complete el nombre y precio del producto.');
    }
  }
}
