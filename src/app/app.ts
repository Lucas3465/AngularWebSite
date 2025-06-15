import { Component } from '@angular/core';
import { provideRouter, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from './servicios/carrito.service';
import { from, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Carrito } from './carrito/carrito';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router"
import Lottie, { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { Routes } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, RouterLink, Carrito, CommonModule, LottieComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})
export class App {
  protected title = 'Dulcemania';
  protected compra = "Comprar";
  menuOpen = false;
  isLoading = false;

   lottieOptions: AnimationOptions = {
    path: 'assets/conejo.json', 
    loop: true,
    autoplay: true,
  };

  mostrarCarrito = false;
  cantidadTotal = 0;
  private sub?: Subscription;

   constructor(private carritoService: CarritoService, private router: Router) {
      this.sub = this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    });


  
  this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) {
    this.isLoading = true;
  } else if (
    event instanceof NavigationEnd ||
    event instanceof NavigationCancel ||
    event instanceof NavigationError
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
  }
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






