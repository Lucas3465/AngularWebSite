import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from './servicios/carrito.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Carrito } from './carrito/carrito';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, RouterLink, Carrito, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
 
})
export class App {
  protected title = 'Dulcemania';
  protected compra = "Comprar";
  menuOpen = false;

  mostrarCarrito = false;
  cantidadTotal = 0;
  private sub?: Subscription;

   constructor(private carritoService: CarritoService) {
    this.sub = this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    });
  }

  abrirCarrito() {
    this.mostrarCarrito = true;
  }
  cerrarCarrito() {
    this.mostrarCarrito = false;
  }
  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
  actualizarCantidad() {
    this.cantidadTotal = this.carritoService.obtenerCarrito()
    .reduce((acc, item) => acc + item.cantidad, 0);
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  

}




export class AppModule {}


