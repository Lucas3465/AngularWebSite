import { Component, signal, computed, inject, effect } from '@angular/core';
import { NgIf, NgFor } from "@angular/common"
import { RouterModule, Router } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { from } from 'rxjs';
import productos from "../catalogo/productos.json"
import { DomSanitizer } from '@angular/platform-browser';


type Producto = {
    supercategoria: string;
    categoria: string;
    subcategoria: string
    categoriaPrincipal: string;
}

@Component({
  selector: 'app-menuhamburguesa',
  imports: [NgIf, NgFor, RouterModule, MatIconModule],
  templateUrl: './menuhamburguesa.html',
  styleUrl: './menuhamburguesa.css'
})
export class Menuhamburguesa {
  abierto = signal(false);
  router = inject(Router);

  constructor() {
    effect(() => {
      if (this.abierto()) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    });
  }

  toggleMenu() {
    this.abierto.update(v => !v);
  }
  cerrarMenu() {
    this.abierto.set(false);
  }
  abiertoValue() {
    return this.abierto();
  }
  productos: Producto[] = (productos as Producto[]).filter(p =>
    p.supercategoria && p.categoria && p.subcategoria && p.categoriaPrincipal
  );

  categoriasAgrupadas = computed(() => {
      const agrupadas: Record<
      string, 
      Record<string, Record<string, string>>
    > = {};

    for (const prod of this.productos) {
      const { supercategoria, categoria, subcategoria, categoriaPrincipal } = prod;

      if (!agrupadas[supercategoria]) agrupadas[supercategoria] = {};
      if (!agrupadas[supercategoria][categoria]) agrupadas[supercategoria][categoria] = {};

      agrupadas[supercategoria][categoria][subcategoria] = categoriaPrincipal;
    }
    return Object.entries(agrupadas).map(([supercat, categorias]) => ({
        supercategoria: supercat,
        categorias: Object.entries(categorias).map(([cat, subcats]) => ({
            categoria: cat,
            subcategorias: Object.entries(subcats).map(([subcat, catPrin]) => ({
                subcategoria: subcat,
                categoriaPrincipal: catPrin
            }))
        }))
    }));
  });

    irAFiltro(supercategoria: string, categoria: string, subcategoria: string, categoriaPrincipal: string) {
      this.cerrarMenu();
      const enTienda = this.router.url.startsWith("/catalogo");

      const filtros = {
        supercategoria,
        categoria,
        subcategoria,
        categoriaPrincipal
      };
      if (!enTienda) {
        this.router.navigate(["/catalogo"], { queryParams: filtros });
      } else {
        window.dispatchEvent(new CustomEvent("aplicarFiltro", { detail: filtros }));
      }
    }


}
