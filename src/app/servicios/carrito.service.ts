import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Signal reactivo con los productos del carrito
  private carritoSignal = signal<any[]>([]);

  constructor() {}

  // Devuelve el signal como readonly para suscribirse/reactividad
  obtenerCarrito() {
    return this.carritoSignal.asReadonly();
  }

  // Agrega un producto al carrito (o aumenta cantidad si ya está)
  agregarProducto(producto: any) {
    const actual = this.carritoSignal();
    const index = actual.findIndex(p => p.id === producto.id);

    if (index !== -1) {
      const actualizado = [...actual];
      actualizado[index].cantidad += 1;
      this.carritoSignal.set(actualizado);
    } else {
      this.carritoSignal.set([...actual, { ...producto, cantidad: 1 }]);
    }
  }

  // Quita una unidad del producto, o lo elimina si cantidad llega a 0
  quitarProducto(productoId: number) {
    const actual = this.carritoSignal();
    const index = actual.findIndex(p => p.id === productoId);

    if (index !== -1) {
      const actualizado = [...actual];
      if (actualizado[index].cantidad > 1) {
        actualizado[index].cantidad -= 1;
      } else {
        actualizado.splice(index, 1);
      }
      this.carritoSignal.set(actualizado);
    }
  }

  // Elimina un producto directamente sin importar su cantidad
  eliminarProducto(productoId: number) {
    const actualizado = this.carritoSignal().filter(p => p.id !== productoId);
    this.carritoSignal.set(actualizado);
  }

  // Vacía el carrito completamente
  vaciarCarrito() {
    this.carritoSignal.set([]);
  }
}
