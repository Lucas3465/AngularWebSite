import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { trigger, transition, style, animate } from "@angular/animations";
import { Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'carrito',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  @Input() mostrar = false;
  @Output() cerrar = new EventEmitter<void>();

  carrito = [
    // Ejemplo de productos, reemplaza con tu lógica real
    { nombre: 'Dulce 1', precio: 100, imagen: 'assets/golosinas/finiestrella.png' },
    { nombre: 'Dulce 2', precio: 150, imagen: 'assets/golosinas/finiestrella.png' }
  ];

  mostrarCarrito = false;
  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  cerrarCarrito() {
    this.cerrar.emit();
  }

  eliminarDelCarrito(producto: any) {
    this.carrito = this.carrito.filter(p => p !== producto);
  }

  obtenerTotal() {
    return this.carrito.reduce((acc, p) => acc + p.precio, 0);
  }

  irACheckout() {
  }
}
