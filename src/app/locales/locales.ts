import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import gsap from "gsap"
import lottie from "lottie-web"
import { MatIcon, MatIconModule} from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button"
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-locales',
  imports: [MatIcon, MatIconModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './locales.html',
  styleUrl: './locales.css'
})
export class Locales implements OnInit {
  @ViewChild("contactForm", { static: true }) contactForm!: ElementRef;

  formData = {
    nombre: "",
    email: "",
    mensaje: "",
  };

  ngOnInit(): void {
    this.initLottie();
    this.animateForm();
  }

  initLottie(){
    lottie.loadAnimation({
        container: document.getElementById("lottie-contact")!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/dulce.json",
    });

  };

 

  animateForm() {
    gsap.from(".contact-container", { opacity: 0, y: 50, duration: 1, ease: "power3.out"})
    gsap.from(".input-field",{
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: "power2.out",
    });
    gsap.from(".submit-btn", { 
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 1.2,
        ease: "black.out(1.7)"
     });
     gsap.from(".developer-panel",{
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 1.5,
          ease: "power3.out"
     })
  }
  submitForm() {
    if(!this.formData.nombre || !this.formData.email || !this.formData.mensaje) return;

    alert(`Gracias por tu mensaje, ${this.formData.nombre}!`);
    this.formData = { nombre: "", email: "", mensaje: ""};
  }

  
}
