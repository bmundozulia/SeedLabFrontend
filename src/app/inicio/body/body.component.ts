import { Component, AfterViewInit, PLATFORM_ID, Inject  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// // register Swiper custom elements
register();
import Swiper from 'swiper';



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})

export class BodyComponent implements AfterViewInit{
 

  slideImagenes = [
    "../../../assets/images/logo-seed.jpg", 
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",

  ]

  cards = [
    { title: 'Card 1', description: 'Descripción de la Card 1', imageUrl: 'path/to/image1.jpg' },
    { title: 'Card 2', description: 'Descripción de la Card 2', imageUrl: 'path/to/image2.jpg' },
    { title: 'Card 3', description: 'Descripción de la Card 3', imageUrl: 'path/to/image3.jpg' },
    { title: 'Card 4', description: 'Descripción de la Card 4', imageUrl: 'path/to/image4.jpg' },
    { title: 'Card 5', description: 'Descripción de la Card 4', imageUrl: 'path/to/image4.jpg' },
    { title: 'Card 6', description: 'Descripción de la Card 4', imageUrl: 'path/to/image4.jpg' },



  ];
  cardSeleccionada: any;
  

  constructor(@Inject(PLATFORM_ID)private platformId: Object) { }
  ngAfterViewInit(): void {
    this.cardSeleccionada = this.cards[0];
    if (isPlatformBrowser(this.platformId)) {
    const mySwiper = new Swiper('.my-swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 2000,
      },
      slidesPerView: 4,
      spaceBetween: 3,
    });
  }
  }
  mostrarCard(index: number): void {
    // Lógica para mostrar la card correspondiente al índice de la imagen clicada
    // Por ejemplo, podrías utilizar un array de contenido para las cards y cambiar el contenido según el índice
    console.log('Mostrar card número', index + 1);
    this.cardSeleccionada = this.cards[index];

    
  }
}

