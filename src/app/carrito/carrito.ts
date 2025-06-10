import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { trigger, transition, style, animate } from "@angular/animations";
import { Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'carrito',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  @Input() mostrar = false;
  @Output() cerrar = new EventEmitter<void>();

  constructor(public carritoService: CarritoService) {}

  cerrarCarrito() {
    this.cerrar.emit();
  }

  eliminarDelCarrito(producto: any) {
    this.carritoService.quitarDelCarrito(producto);
  }

  obtenerTotal() {
    return this.carritoService.obtenerTotal();
  }

  get carrito() {
    return this.carritoService.obtenerCarrito();
  }
  irACheckout() {
    console.log("Ir a checkout");
  }
}
