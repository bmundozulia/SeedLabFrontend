import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { EmprendedorService } from '../../../../servicios/emprendedor.service';
import { Empresa } from '../../../../Modelos/empresa.model';
import { User } from '../../../../Modelos/user.model';

@Component({
  selector: 'app-list-empresas',
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.css'],
  providers: [EmprendedorService],
})

export class ListEmpresasComponent implements OnInit {
  faPen = faPenToSquare;
  listaEmpresas: Empresa[] = [];
  listaUser: User[] = [];
  documento: string | null;
  public page!: number;
  token: string | null = null;
  isLoading: boolean = true; // Variable para gestionar el estado de carga
  userFilter: any = { nombre: '' };
  falupa = faMagnifyingGlass;
  user: any = null;
  currentRolId: number;


  constructor(
    private emprendedorService: EmprendedorService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,) {
    this.documento = this.aRoute.snapshot.paramMap.get('id');
  }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit(): void {
    this.validartoken();
    this.cargarEmpresas();
  }

  /* Valida el token del login */
  validartoken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol;

        if (this.currentRolId != 5) {
          this.router.navigate(['/inicio/body']);
        } else {
          this.documento = this.user.emprendedor.documento;
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  cargarEmpresas(): void {
    if (this.token) {
      this.emprendedorService.getEmpresas(this.token, this.documento).subscribe(
        (data) => {
          setTimeout(() => {
            this.listaEmpresas = data;
            this.isLoading = false;
          }, 500);
        },
        (err) => {
          console.log(err);
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      );
    }
  }
}
