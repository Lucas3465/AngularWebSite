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
Object = Object;

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

  

  filtroSubcategoria = '';
  categoriaHover = '';
  supercategoriaHover: string = '';


  menuItems = [
    {
      label: 'Inicio',
      link: '/',
    },
    {
      label: 'Productos',
      submenu: [
        { label: 'Dulces', link: '/productos/dulces' },
        { label: 'Bebidas', link: '/productos/bebidas' },
        { label: 'Ofertas', link: '/productos/ofertas' },
      ],
    },
    {
      label: 'Categorías',
      submenu: [
        { label: 'Chocolates', link: '/categorias/chocolates' },
        { label: 'Gomitas', link: '/categorias/gomitas' },
        { label: 'Caramelos', link: '/categorias/caramelos' },
      ],
    },
    {
      label: 'Contacto',
      link: '/contacto',
    },
  ];
  filtrarPorCategoria(categoria: string) {
  this.filtroCategoria = categoria; 
  this.aplicarFiltros();             
}
  filtrarPorSubcategoria(categoria: string, subcategoria: string) {
  this.filtroCategoria = categoria;
  this.filtroSubcategoria = subcategoria;
  this.aplicarFiltros();
}

get categoriasConSubcategorias(): { [key: string]: string[] } {
  const mapa: { [key: string]: Set<string> } = {};
  this.productos.forEach(p => {
    if (!mapa[p.categoria]) {
      mapa[p.categoria] = new Set();
    }
    if (p.subcategoria) {
      mapa[p.categoria].add(p.subcategoria);
    }
  });
  const resultado: { [key: string]: string[] } = {};
  for (const cat in mapa) {
    resultado[cat] = Array.from(mapa[cat]);
  }
  return resultado;
}

  get supercategoriasMap(): { [key: string]: { [key: string]: string[] } } {
  const mapa: { [key: string]: { [key: string]: Set<string> } } = {};

  this.productos.forEach(p => {
    if (!p.supercategoria || !p.categoria) return;

    if (!mapa[p.supercategoria]) {
      mapa[p.supercategoria] = {};
    }

    if (!mapa[p.supercategoria][p.categoria]) {
      mapa[p.supercategoria][p.categoria] = new Set();
    }

    if (p.subcategoria) {
      mapa[p.supercategoria][p.categoria].add(p.subcategoria);
    }
  });

  const resultado: { [key: string]: { [key: string]: string[] } } = {};
  for (const supercat in mapa) {
    resultado[supercat] = {};
    for (const cat in mapa[supercat]) {
      resultado[supercat][cat] = Array.from(mapa[supercat][cat]);
    }
  }

  return resultado;
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
  this.productosFiltrados = this.productos.filter(p => {
    return (
      (!this.filtroNombre || p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
      (!this.filtroCategoria || p.categoria === this.filtroCategoria) &&
      (!this.filtroSubcategoria || p.subcategoria === this.filtroSubcategoria) &&
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