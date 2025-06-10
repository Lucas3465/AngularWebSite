import { AfterViewInit, Component, input, output, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';
import productos from "../catalogo/productos.json"
import { Notificacion } from "../notificacion/notificacion"

// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, MatIconModule, RouterOutlet, RouterLink, Notificacion],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  
})
export class Inicio implements AfterViewInit, OnInit {
  productos: any[] = [];
  constructor(private carritoService: CarritoService) {}
  @ViewChild(Notificacion) noti!: Notificacion;

  ngOnInit(): void {
    this.productos = productos.slice(0, 16);
  }
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);
    this.noti.mostrar(producto);
  }
  
  ngAfterViewInit(): void {
    Swiper.use([Autoplay, Navigation, Pagination]);

    const sliders = document.querySelectorAll('.presentaciones-slider');
    sliders.forEach(sliderEl => {
      new Swiper(sliderEl as HTMLElement, {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }
      });
    });
  }

}

imports: [
  {
    MatIconModule,
  }
]

export class AppModule {}


