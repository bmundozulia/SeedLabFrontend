import { Component, AfterViewInit, PLATFORM_ID, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AliadoService } from '../../servicios/aliado.service';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Aliado } from '../../Modelos/aliado.model';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [AliadoService, MatToolbar]
})
export class BodyComponent implements OnInit, AfterViewInit {
  bannerSwiper: Swiper | undefined;
  listAliados: Aliado[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aliadoService: AliadoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.aliadoService.getaliados().subscribe(
      data => {
        console.log('Aliados:', data);
        this.listAliados = data;
        this.cdr.detectChanges(); // Fuerza la detección de cambios después de recibir los datos
        if (isPlatformBrowser(this.platformId)) {
          this.initBannerSwiper(); // Inicializa Swiper después de la detección de cambios
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/default-image.jpg'; // Ajusta esto a tu imagen por defecto
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.listAliados.length > 0) {
      this.initBannerSwiper();
    }
  }

  private initBannerSwiper(): void {
    if (this.bannerSwiper) {
      this.bannerSwiper.destroy(true, true);
    }

    this.bannerSwiper = new Swiper('.banner-swiper-container', {
      modules: [Navigation, Autoplay, Pagination],
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      },
    });
  }

}
