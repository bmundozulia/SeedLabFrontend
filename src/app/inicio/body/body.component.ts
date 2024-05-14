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
    {topImage:'../../../assets/images/redtecnoparque.png',  description: 'Programa de innovación tecnológica del Servicio Nacional de Aprendizaje que actúa como acelerador para el desarrollo de proyectos. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.  Qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.  Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.', imageUrl: '../../../assets/images/sinovva.png' },
    {topImage:'../../../assets/images/redtecnoparque.png',  description: 'Descripción de la Card 2', imageUrl: '../../../assets/images/sinovva.png' },
    {topImage:'../../../assets/images/redtecnoparque.png',  description: 'Descripción de la Card 3', imageUrl: '../../../assets/images/sinovva.png' },
    {topImage:'../../../assets/images/redtecnoparque.png',  description: 'Descripción de la Card 4', imageUrl: '../../../assets/images/sinovva.png' },
    {topImage:'../../../assets/images/redtecnoparque.png',  description: 'Descripción de la Card 5', imageUrl: '../../../assets/images/sinovva.png' },
    {topImage:'../../../assets/images/redtecnoparque.png',  description: 'Descripción de la Card 6', imageUrl: '../../../assets/images/sinovva.png' },



  ];
  cardSeleccionada: any;
  

  constructor(@Inject(PLATFORM_ID)private platformId: Object) { 
    this.cardSeleccionada = this.cards[0];

  }
  ngAfterViewInit(): void {
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

