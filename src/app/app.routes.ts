import { RouterModule, Routes, Router } from '@angular/router';
import { Catalogo } from './catalogo/catalogo';
import { Inicio } from './inicio/inicio';
import { NgModule } from '@angular/core';
import { Carrito } from './carrito/carrito';
import { Locales } from "./locales/locales";

export const routes: Routes = [
    
    { path: "", component: Inicio},
    { path: "catalogo", component: Catalogo},
    { path: 'checkout', loadComponent: () => import('./checkout/checkout').then(m => m.Checkout) },
    { path: "locales", component: Locales },
    { path: "**" , pathMatch: "full" , redirectTo: "#"},
    
];
