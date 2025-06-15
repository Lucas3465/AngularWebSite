import { AfterViewInit, Component, input, output, OnInit, ViewChild, ChangeDetectorRef, ElementRef, ViewChildren, QueryList, viewChild } from '@angular/core';
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
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { Etiquetaoferta } from '../etiquetaoferta/etiquetaoferta';

import { NgModel } from '@angular/forms';

// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, MatIconModule, RouterOutlet, RouterLink, Notificacion, NgForOf, LottieComponent, Etiquetaoferta ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',

})
export class Inicio implements AfterViewInit, OnInit {
  productoActual = 0;
  productosEscenario: any[] = [];
  intervaloCarrusel: any;
  productos: any[] = [];
  constructor(private carritoService: CarritoService, private cdRef: ChangeDetectorRef) {}
  @ViewChild(Notificacion) noti!: Notificacion;
  @ViewChildren("catcard") catcards!: QueryList<ElementRef>;
  @ViewChildren("escenarioRef") escenarioRef!: ElementRef;
  @ViewChildren("lottiePlayer") lottiePlayers!: QueryList<any>;

  options: AnimationOptions = {
      path: "assets/iconos/trato2.png"
  }
  optionsTrato: AnimationOptions = {
    path: "assets/negociacion.json"
  }
  optionsMapa: AnimationOptions = {
    path: "assets/mapa.json"
  }
  optionsAtencion: AnimationOptions = {
      path: "assets/atencion2.json"
  }

  voltearTarjeta(event: Event) {
      const tarjeta = (event.currentTarget as HTMLElement).closest(".boxservicios");
      if (tarjeta){
              tarjeta.classList.toggle("volteado");
      }
  }


  floatTweens = new Map<ElementRef, gsap.core.Tween>();

   

  
  
  
  ngOnDestroy(): void {
    if (this.intervaloCarrusel) clearInterval(this.intervaloCarrusel);
    
  }

  iniciarCarrusel() {
  this.intervaloCarrusel = setInterval(() => {
    this.productoActual = (this.productoActual + 1) % this.productosEscenario.length;

    const escenario = this.escenarioRef?.nativeElement;
    if (escenario) {
     
      gsap.to(escenario.querySelectorAll('.foco'), {opacity: 0, duration: 0.3});

      setTimeout(() => {
     
        gsap.to(escenario.querySelectorAll('.foco'), {opacity: 1, duration: 0.5});

       
        this.catcards.forEach((card, i) => {
          if (i === this.productoActual) {
            gsap.to(card.nativeElement, {
              scale: 1.15,
              z: 80,
              rotationY: 0,
              filter: "brightness(1.2)",
              duration: 0.7,
              ease: "power3.out"
            });
          } else {
            const angle = i % 2 === 0 ? 15 : -15;
            gsap.to(card.nativeElement, {
              scale: 1,
              z: 0,
              rotationY: angle,
              filter: "brightness(0.5)",
              duration: 0.7,
              ease: "power3.out"
            });
          }
        });

      }, 300);
    }

  }, 3500);
}



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
        y: -20,
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
 
  this.productosEscenario = productos.slice(31, 36);
  this.iniciarCarrusel();
  
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
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        grabCursor: true,
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
        resistance: true,
        resistanceRatio: 0.85,
        // breakpoints: {
        //   0: { slidesPerView: 1 },
        //   768: { slidesPerView: 2 },
        //   1024: { slidesPerView: 4 },
        // }
      });
    });

        const focos = document.querySelectorAll(".foco");
            focos.forEach((foco) => {
                gsap.to(foco, {
                    opacity: 0.8,
                    y: "-=10",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    repeatRefresh: true,

                    onUpdate() {
                        const progress = gsap.getProperty(foco, "opacity");
                    }
                })
            })



  }

}

imports: [
  {
    MatIconModule,
  }
]

export class AppModule {}


