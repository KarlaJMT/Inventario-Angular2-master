import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private products: Product[] = [];
  private inventorySubject = new BehaviorSubject<Product[]>(this.products);
  inventory$ = this.inventorySubject.asObservable();

  // Retorna la lista actual de productos
  getInventory(): Product[] {
    return this.products;
  }

  // Agrega o actualiza un producto y clona el arreglo para que se detecten cambios
  addOrUpdateProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index].quantity += product.quantity;
    } else {
      this.products.push(product);
    }
    // Se clona el arreglo para que el async pipe lo detecte
    this.inventorySubject.next([...this.products]);
  }
}
