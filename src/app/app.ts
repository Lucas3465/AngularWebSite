import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


import { Carrito } from './carrito/carrito';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, RouterLink, Carrito],
  templateUrl: './app.html',
  styleUrl: './app.css',
 
})
export class App {
  protected title = 'Dulcemania';
  protected compra = "Comprar";
  menuOpen = false;

  mostrarCarrito = false;

  abrirCarrito() {
    this.mostrarCarrito = true;
  }
  cerrarCarrito() {
    this.mostrarCarrito = false;
  }
  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }


}

export class AppModule {}


