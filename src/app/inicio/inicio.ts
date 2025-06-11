import { AfterViewInit, Component, input, output, OnInit, ViewChild, ChangeDetectorRef, ElementRef, ViewChildren, QueryList } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';
import productos from "../catalogo/productos.json"
import { Notificacion } from "../notificacion/notificacion"
import { gsap } from "gsap"

// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, MatIconModule, RouterOutlet, RouterLink, Notificacion, NgForOf],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  
})
export class Inicio implements AfterViewInit, OnInit {

  productos: any[] = [];
  constructor(private carritoService: CarritoService, private cdRef: ChangeDetectorRef) {}
  @ViewChild(Notificacion) noti!: Notificacion;
  @ViewChildren("catcard") catcards!: QueryList<ElementRef>;

  floatTweens = new Map<ElementRef, gsap.core.Tween>();

  onMouseEnter(card: ElementRef) {
    this.floatTweens.get(card)?.kill();

    const Tween = gsap.to(card.nativeElement, {
    y: -10,
    duration: 1.5,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",

  });
    this.floatTweens.set(card, Tween);

  }

  onMouseLeave(card: ElementRef) {
    const Tween = this.floatTweens.get(card);
    if (Tween) {
      Tween.kill();

      gsap.to(card.nativeElement, {
        y:0,
        duration: 0.5,
        ease: "power1.out",
      }); 
        
      this.floatTweens.delete(card);
    }
  }

  onCardHover(index: number, isEnter: boolean) {
    const card = this.catcards.toArray()[index];
    if (!card) return;

    if (isEnter) {
      this.floatTweens.get(card)?.kill();
      
      const Tween = gsap.to(card.nativeElement, {
        y: -10,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
        this.floatTweens.set(card, Tween);
        }
        else {
          const Tween = this.floatTweens.get(card);
          if (Tween) {
            Tween.kill();
            gsap.to(card.nativeElement, {
              y: 0,
              duration: 0.5,
              ease: "power1.out",
            });
            this.floatTweens.delete(card);
          }
        }
    
  }
  
  categorias = [
    { id: 1, nombre: "Alfajores", img: "assets/golosinas/pacoquita.png" },
    { id: 2, nombre: "Gomitas", img: "assets/golosinas/finidino.png" },
    { id: 3, nombre: "Chocolates", img: "assets/golosinas/finiestrella.png" },
    { id: 4, nombre: "Bombones", img: "assets/golosinas/finigusano.png" },
    { id: 5, nombre: "Cremas", img: "assets/golosinas/finimal.png" },
  ]
  


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
        slidesPerView: 4,
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
          1024: { slidesPerView: 4 },
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


