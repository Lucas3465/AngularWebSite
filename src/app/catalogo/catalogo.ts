import { Component, ViewChild } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import productosData from "./productos.json";
import { FormsModule } from "@angular/forms";
import { trigger, transition, style, animate } from "@angular/animations";
import { Notificacion } from "../notificacion/notificacion"
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, MatIconModule, FormsModule, Notificacion],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ opacity: 0, transform: "scale(0.95)" }))
      ])
    ])
  ]


})
export class Catalogo {

@ViewChild(Notificacion) noti!: Notificacion;

productos = productosData;
  productosFiltrados = [...this.productos];

  filtroNombre = '';
  filtroCategoria = '';
  precioMin: number | null = null;
  precioMax: number | null = null;

  precioFiltro = 0;
  precioMaximo = 1000;

  constructor(private carritoService: CarritoService) {
    this.precioMaximo = this.obtenerPrecioMaximo();
    this.precioFiltro = this.precioMaximo;
    this.aplicarFiltros();
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);
    this.noti.mostrar(producto);
    console.log('Producto agregado:', producto);
  }

  obtenerCategorias(): string[] {
    const categorias = this.productos.map((p) => p.categoria);
    return [...new Set(categorias)];
  }

  aplicarFiltros() {
    this.productosFiltrados = this.productos.filter((p) => {
      return (
        (!this.filtroNombre || p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
        (!this.filtroCategoria || p.categoria === this.filtroCategoria) &&
        (!this.precioMin || p.precio >= this.precioMin) &&
        (!this.precioMax || p.precio <= this.precioMax) &&
        p.precio <= this.precioFiltro
      );
    });
  }

  obtenerPrecioMaximo(): number {
    if (!this.productos || this.productos.length === 0) return 1000;
    return Math.max(...this.productos.map((p) => p.precio));
  }

  filtrarPorPrecio() {
    this.aplicarFiltros();
  }

  get sliderBackground() {
    const porcentaje = (this.precioFiltro / this.precioMaximo) * 100;
    return `linear-gradient(90deg, #ff6b81 0%, #ff6b81 ${porcentaje}%, #ddd ${porcentaje}%, #ddd 100%)`;
  }

}


