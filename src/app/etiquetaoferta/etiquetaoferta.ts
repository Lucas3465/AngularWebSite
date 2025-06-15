import { Component, Input } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';


@Component({
  selector: 'app-etiquetaoferta',
  imports: [CommonModule],
  templateUrl: './etiquetaoferta.html',
  styleUrl: './etiquetaoferta.css',

})
export class Etiquetaoferta {
  @Input() tipo: 'normal' | 'limitada' | 'super' = 'normal'; 
  @Input() texto: string = '50% OFF'; 

  getClaseTag() {
    switch (this.tipo) {
      case 'limitada': return 'tag-limitada';
      case 'super': return 'tag-super';
      default: return 'tag-normal';
    }
  }
}
