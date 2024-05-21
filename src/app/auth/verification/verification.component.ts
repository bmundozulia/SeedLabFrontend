import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificacionService } from '../../servicios/verificacion.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css',
  providers: [VerificacionService],
})
export class VerificationComponent implements OnInit {
  email: string;
  codigoVerificacion: string = '';

  @ViewChild('txt1') txt1!: ElementRef<HTMLInputElement>;
  @ViewChild('txt2') txt2!: ElementRef<HTMLInputElement>;
  @ViewChild('txt3') txt3!: ElementRef<HTMLInputElement>;
  @ViewChild('txt4') txt4!: ElementRef<HTMLInputElement>;
  @ViewChild('txt5') txt5!: ElementRef<HTMLInputElement>;


constructor(private router:Router,
  private verificacionservice:VerificacionService,
  private route: ActivatedRoute,
){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if ('email' in params) {
        this.email = params['email'];
        console.log(this.email); // Mover la impresión aquí
      } else {
        console.log('No se encontró el parámetro "email" en la URL');
      }
    });          

}

ngAfterViewInit(): void {
  this.txt1.nativeElement.addEventListener('input', () => this.actualizarCodigo());
  this.txt2.nativeElement.addEventListener('input', () => this.actualizarCodigo());
  this.txt3.nativeElement.addEventListener('input', () => this.actualizarCodigo());
  this.txt4.nativeElement.addEventListener('input', () => this.actualizarCodigo());
  this.txt5.nativeElement.addEventListener('input', () => this.actualizarCodigo());
}

actualizarCodigo(){
  this.codigoVerificacion = this.txt1.nativeElement.value + this.txt2.nativeElement.value + this.txt3.nativeElement.value + this.txt4.nativeElement.value + this.txt5.nativeElement.value;
}


verificarEmail():void{
  this.verificacionservice.verificarEmail(this.email, this.codigoVerificacion).subscribe(
    data => {
      console.log(data);
      console.log('Validación exitosa',data);
      this.router.navigate(['/login']);
    },
    err => {
      console.log('Error al verificar el correo electrónico:',err);
      alert(`Error: ${err.message}`);
      this.router.navigate(['/verification']);
    }
  );
}







move(e:any, p:any, c:any, n:any){
  var length= c.value.length;
  var maxlength= c.getAttribute('maxlength');
    if(length == maxlength){
      if(n !=""){
        n.focus();
      }  
    }
    if(e.key === "Backspace"){
      if(p != ""){
        p.focus();
      }
    }
  }
}
