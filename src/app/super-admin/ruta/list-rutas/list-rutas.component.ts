import { Component, OnInit } from '@angular/core';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { RutaService } from '../../../servicios/rutas.service';
import { Ruta } from '../../../Modelos/ruta.modelo';
import { User } from '../../../Modelos/user.model';
import { SwitchService } from '../../../servicios/switch.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalcrearSuperadminComponent } from '../../modalcrear-superadmin/modalcrear-superadmin.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrls: ['./list-rutas.component.css'],
  providers: [RutaService]
})
export class ListRutasComponent implements OnInit {
  userFilter: any = { nombre: '', estado: 'Activo', fecha_creacion: '' };


  public page: number = 1;
  listaRutas: Ruta[] = [];
  fax = faXmark;
  falupa = faMagnifyingGlass;
  faeye = faEye;
  token: string | null = null;
  user: User | null = null;
  currentRolId: number;
  modalSwitch: boolean;
  listaRutasFiltrada: Ruta[] = [];

  constructor(
    private rutaService: RutaService,
    private router: Router,
    private modalSS: SwitchService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarRutas();
    this.modalSS.$modal.subscribe((valor) => { this.modalSwitch = valor });
  }


  openModal(rutaId: number | null): void {
    let dialogRef: MatDialogRef<ModalComponent>;
    dialogRef = this.dialog.open(ModalComponent, {
      data: { rutaId: rutaId }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol;
        if (this.currentRolId != 1) {
          this.router.navigate(['/inicio/body']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }


  cargarRutas(): void {
    if (this.token) {
      this.rutaService.getAllRutas(this.token, this.userFilter.estado).subscribe(
        (data) => {
          this.listaRutas = data;
          console.log('listaRutas filtrada:', this.listaRutas);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.error('Token is not available');
    }
  }

  onEstadoChange(event: any): void {
    const estado = event.target.value;
    this.userFilter.estado = estado === '1' ? 'Activo' : 'Inactivo';
    this.cargarRutas();
  }

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo', fecha_creacion: '' };
    this.cargarRutas();
  }
  
  openModalSINId(): void {
    this.openModal(null);
  }

}
