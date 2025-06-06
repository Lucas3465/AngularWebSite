import { AfterViewInit, Component, input, output } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, MatIconModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
  
})
export class Inicio implements AfterViewInit {
  
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


