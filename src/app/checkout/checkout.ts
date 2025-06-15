import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarritoService } from '../servicios/carrito.service';
import { Router } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { gsap } from 'gsap/gsap-core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, MatIconModule, LottieComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  carrito: any[] = [];
  total: number = 0;
  private sub!: Subscription;
  @ViewChild('infoContainer', { static: true }) infoContainer!: ElementRef;
  @ViewChild('rutGroupContainer') rutGroupContainer!: ElementRef;
  @ViewChild('reciboContainer', { static: false }) reciboContainer!: ElementRef;
  @ViewChildren('inputGroup', { read: ElementRef }) inputGroups!: QueryList<ElementRef>;
  constructor(private carritoService: CarritoService, private router: Router, private cd: ChangeDetectorRef) {
     this.carritoService.carrito$.subscribe(data => {
     this.carrito = [...data]; 
     this.calcularTotal();
  });
  }
  formaEntrega: string = 'retiro';
usarRUT: boolean = false;
descargarPDF: boolean = false;
formaPago: string = '';

datosComprador = {
  nombre: '',
  apellido: '',
  documento: '',
  direccion: '',
  calle: '',
  ciudad: '',
  departamento: '',
  telefono: '',
  email: '',
  razonSocial: '',
  rut: ''
};

  mostrarAnimacionPDF = false;

lottieCargandoPDF: AnimationOptions = {
  path: 'assets/pdf.json',
  loop: true,
  autoplay: true
};


  lottieOptions: AnimationOptions = {
  path: 'assets/conejo.json',
  loop: true,
  autoplay: true,
};


 private animacionHecha = false;



 
    
ngDoCheck() {
  if (this.usarRUT && !this.rutAnimado) {
    setTimeout(() => {
      if (this.rutGroupContainer) {
        gsap.from(this.rutGroupContainer.nativeElement, {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: 'power2.out'
        });
        this.rutAnimado = true;
      }
    });
  }

  if (!this.usarRUT && this.rutAnimado) {
    this.rutAnimado = false;
  }
}

private rutAnimado = false;
 
ngAfterViewChecked() {
  if (!this.animacionHecha && this.inputGroups.length > 0) {
    this.animacionHecha = true;

  gsap.set(this.infoContainer.nativeElement, { opacity: 0, x: -50 });


gsap.to(this.infoContainer.nativeElement, {
  opacity: 1,
  x: 0,
  duration: 0.8,
  ease: 'power2.out',
  delay: 0.2
});

    gsap.from(this.inputGroups.map(el => el.nativeElement), {
      x: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

      if (this.usarRUT && this.rutGroupContainer && !this.rutAnimado) {
    this.rutAnimado = true;
    gsap.fromTo(this.rutGroupContainer.nativeElement,
  { opacity: 0, y: -10 },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out'
  }
);
  }
  if (!this.usarRUT) {
    this.rutAnimado = false; 
  }
  }
}
  eliminarProducto(producto: any) {
  this.carritoService.quitarDelCarrito(producto); 
}

  
  animarYEliminar(element: HTMLElement, producto: any) {
  const tl = gsap.timeline();

  tl.to(element, {
    duration: 0.2,
    scale: 0.95,
    opacity: 0.5,
    ease: "power1.out",
  });

  tl.add(() => {
    this.carritoService.quitarDelCarrito(producto);

    
    setTimeout(() => {
      this.carrito = [...this.carritoService.obtenerCarrito()];
      this.calcularTotal();

    
      const sigueExistiendo = this.carrito.find(p => p.id === producto.id);
      if (sigueExistiendo) {
        gsap.to(element, {
          duration: 0.2,
          scale: 1,
          opacity: 1,
          ease: "power1.inOut",
        });
      }
    }, 50);
  });
}
  ngOnInit() {
    this.sub = this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  calcularTotal() {
  this.total = this.carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
}

 mostrarRecibo: boolean = false;

  async finalizarCompra() {
    if (this.descargarPDF) {
      this.mostrarAnimacionPDF = true;
      this.mostrarRecibo = true; // mostrar recibo para que html2canvas lo capture

      // Esperar que Angular pinte el DOM actualizado
      this.cd.detectChanges();

      // Pequeño delay para garantizar que DOM se renderizó (puedes ajustar 200ms)
      await new Promise(resolve => setTimeout(resolve, 200));

      if (!this.reciboContainer) {
        alert('Error: recibo no disponible');
        this.mostrarAnimacionPDF = false;
        this.mostrarRecibo = false;
        return;
      }

      const canvas = await html2canvas(this.reciboContainer.nativeElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('recibo-dulcemania.pdf');

      this.mostrarAnimacionPDF = false;
      this.mostrarRecibo = false;
      alert('¡Compra finalizada! Recibo descargado.');
      this.router.navigate(['/inicio']);
    } else {
      alert('¡Compra finalizada!');
      this.router.navigate(['/inicio']);
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
