import { RouterModule, Routes } from '@angular/router';
import { Catalogo } from './catalogo/catalogo';
import { Inicio } from './inicio/inicio';
import { NgModule } from '@angular/core';
import { Carrito } from './carrito/carrito';

export const routes: Routes = [
    
    { path: "", component: Inicio},
    { path: "catalogo", component: Catalogo},
    { path: "**" , pathMatch: "full" , redirectTo: "#"}
    
];
