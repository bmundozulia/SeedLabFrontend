import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MenuComponent } from './inicio/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncuestaEmpresaComponent } from './empresario/encuesta-empresa/encuesta-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EncuestaEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
