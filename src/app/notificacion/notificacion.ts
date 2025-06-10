import { Component, input, Input } from '@angular/core';
import productos from "../catalogo/productos.json"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacion',
  imports: [CommonModule],
  templateUrl: './notificacion.html',
  styleUrl: './notificacion.css'
})
export class Notificacion {
  @Input() producto: any;
  visible = false;

  mostrar(producto: any) {
      this.visible = false;
      clearTimeout(this.timer);
      
      setTimeout(() => {
        this.producto = producto;
        this.visible = true;

        this.timer = setTimeout(() => {
          this.visible = false;

        }, 3000);
      },  10);
  }
  private timer: any;

}

