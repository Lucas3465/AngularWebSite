import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import productosData from "./productos.json";
import { FormsModule } from "@angular/forms";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, MatIconModule, FormsModule],
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
carrito: any[] = [];

agregarAlCarrito(producto: any) {
  const item = this.carrito.find (p => p.id === producto.id);
  if (item) {
    item.cantidad += 1;
  } else {
    this.carrito.push({...producto, cantidad: 1});
  }
  
  console.log("Producto agregado:", producto);
}
  

  obtenerCategorias(): string[] {
    const categorias = this.productos.map(p => p.categoria);
    return [...new Set(categorias)];
  }

  productos = productosData;

  productosFiltrados = [...this.productos];

  filtroNombre = "";
  filtroCategoria = "";
  precioMin: number | null = null;
  precioMax: number | null = null;

  precioFiltro: number = 0;
  precioMaximo: number = 1000;

  constructor() {
    this.precioMaximo = this.obtenerPrecioMaximo();
    this.precioFiltro = this.precioMaximo;
    this.aplicarFiltros();
  }



  aplicarFiltros() {
    this.productosFiltrados = this.productos.filter(p => {
      return (
        (!this.filtroNombre || p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
        (!this.filtroCategoria || p.categoria === this.filtroCategoria) &&
        (!this.precioMin || p.precio >= this.precioMin) &&
        (!this.precioMax || p.precio <= this.precioMax) &&
        (p.precio <= this.precioFiltro)
      );
    })
  } 

  trackById(index: number, producto: any) {
    return producto.id;
  }


  obtenerPrecioMaximo(): number {
    if (!this.productos || this.productos.length === 0) return 1000;
    return Math.max(...this.productos.map(p => p.precio));
  }

  filtrarPorPrecio() {
    this.aplicarFiltros();
  }

  
  get sliderBackground() {
    const porcentaje = (this.precioFiltro / this.precioMaximo) * 100;
    return `linear-gradient(90deg, #ff6b81 0%, #ff6b81 ${porcentaje}%, #ddd ${porcentaje}%, #ddd 100%)`;
  }

}


