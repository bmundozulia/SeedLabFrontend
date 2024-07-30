import { Component } from '@angular/core';
import { User } from '../../../Modelos/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaService } from '../../../servicios/rutas.service';

@Component({
  selector: 'app-editar-act-ruta',
  templateUrl: './editar-act-ruta.component.html',
  styleUrl: './editar-act-ruta.component.css'
})
export class EditarActRutaComponent {
  token: string | null = null;
  user: User | null = null;
  id: number | null = null;
  currentRolId: number;
  rutaId: number | null = null;




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rutaService: RutaService,
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rutaId = +params['id_ruta'];

    })


    this.validateToken();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');
      //console.log('currentrol',identityJSON);
      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        //console.log('ererer',this.id)
        if (this.currentRolId != 1) {
          this.router.navigate(['/home']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/home']);
    }
  }

}
