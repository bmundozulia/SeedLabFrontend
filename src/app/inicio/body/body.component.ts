import { Component, AfterViewInit, ElementRef  } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// // register Swiper custom elements
register();
// import Swiper from 'swiper';
import Swiper from 'swiper';
// import Autoplay from 'swiper';
// import 'swiper/swiper-bundle.min.css';



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
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg",
    "../../../assets/images/logo-seed.jpg"
  ]

  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    const swiperContainer = this.elementRef.nativeElement.querySelector('.swiper-container');
    const mySwiper = new Swiper(swiperContainer, {
      autoplay: {
        delay: 5000,
      },
    });
  }
}

