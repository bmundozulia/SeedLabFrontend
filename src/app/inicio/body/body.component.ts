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
    "../../../assets/images/logo-seed.jpg",

  ]

  constructor(@Inject(PLATFORM_ID)private platformId: Object) { }
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
}
