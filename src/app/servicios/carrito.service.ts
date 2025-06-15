import { Injectable } from '@angular/core';
import {  BehaviorSubject  } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: any[] = [];
  private carritoSubject = new BehaviorSubject<any[]>([]);

  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(producto: any) {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) {
      item.cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.carritoSubject.next(this.carrito);
  }

  quitarDelCarrito(producto: any) {
  const index = this.carrito.findIndex(p => p.id === producto.id);
  if (index > -1) {
    if (this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad--;
    } else {
      this.carrito.splice(index, 1);
    }
    this.carritoSubject.next(this.carrito);
  }
}

  obtenerCarrito() {
    return this.carrito;
  }

  obtenerTotal() {
    return this.carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }
}
