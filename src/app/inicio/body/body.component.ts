import { Component, AfterViewInit, PLATFORM_ID, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AliadoService } from '../../servicios/aliado.service';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Aliado } from '../../Modelos/aliado.model';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../servicios/auth.service';
import { SuperadminService } from '../../servicios/superadmin.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [AliadoService, MatToolbar, AuthService]
})
export class BodyComponent implements OnInit, AfterViewInit {
  bannerSwiper: Swiper | undefined;
  alliesSwiper: Swiper | undefined;
  listAliados: Aliado[] = [];
  isLoggedIn: boolean = false;
  logoUrl: string = '';
  sidebarColor:string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aliadoService: AliadoService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private personalizacionesService: SuperadminService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.getPersonalizacion();
    this.aliadoService.getaliados().subscribe(
      data => {
        console.log('Aliados:', data);
        this.listAliados = data.map(aliado => ({
          ...aliado,
          descripcion: this.splitDescription(aliado.descripcion, 50)
        }));
        this.cdr.detectChanges(); // Fuerza la detección de cambios después de recibir los datos
        if (isPlatformBrowser(this.platformId)) {
          this.initSwipers(); // Inicializa Swiper después de la detección de cambios
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
      this.initSwipers();
    }
  }

  private initSwipers(): void {
    this.initBannerSwiper();
    this.initAlliesSwiper();
  }

  getPersonalizacion(){
    this.personalizacionesService.getPersonalizacion().subscribe(
      data => {
        this.logoUrl = data.imagen_Logo;
        this.sidebarColor = data.color_primary;
        console.log('logoUrl', this.logoUrl);
        console.log("personalizaciones obtenidas", data);
      },
      error => {
        console.error("no funciona", error);
      }
    );
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

  private initAlliesSwiper(): void {
    if (this.alliesSwiper) {
      this.alliesSwiper.destroy(true, true);
    }

    this.alliesSwiper = new Swiper('.allies-swiper-container', {
      modules: [Pagination],
      slidesPerView: 'auto', // Mostrar todas las diapositivas sin límite
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      },
    });
  }

  private splitDescription(description: string, wordsPerLine: number): string[] {
    const words = description.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
    return lines;
  }
}
