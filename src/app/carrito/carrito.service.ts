import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productos: any[] = [];

  agregar(producto: any) {
    const item = this.productos.find(p => p.id === producto.id);
    if (item) {
      item.cantidad += 1;
    } else {
      this.productos.push({ ...producto, cantidad: 1 });
    }
  }

  obtenerProductos() {
    return this.productos;
  }

  eliminar(producto: any) {
    this.productos = this.productos.filter(p => p !== producto);
  }

  obtenerTotal() {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }
}
