import { Component } from '@angular/core';
import { AliadoService } from '../../../servicios/aliado.service';
import { User } from '../../../Modelos/user.model';
import { Router } from '@angular/router';
import { ChartType, ChartOptions, ChartDataset, registerables, ChartData } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  token: string | null = null;
  user: User = null;
  id: number;
  currentRolId: number;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pendientesFinalizadasLabels: string[] = ['Pendientes', 'Finalizadas', 'Sin asignar', 'Asignadas'];
  public pendientesFinalizadasData: ChartData<'pie'> = {
    labels: this.pendientesFinalizadasLabels,
    datasets: [
      { data: [0, 0], label: 'Asesorías' } 
    ]
  };

 
  public pieChartLegend = true;
  public pieChartType: ChartType = 'pie';

  public asesoresLabels: string[] = ['Asesores'];
  public asesoresData: ChartData<'pie'> = {
    labels: this.asesoresLabels,
    datasets: [
      { data: [0], label: 'Asesores' } 
    ]
  };



  constructor(
    private aliadoService: AliadoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.validateToken();
    this.loadChartData();
  }

  /* Valida el token del login */
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        if (this.currentRolId != 3) {
          this.router.navigate(['/inicio/body']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  loadChartData() {
    this.aliadoService.getDashboard(this.token, this.id).subscribe(
      data => {
        console.log(data);
        this.pendientesFinalizadasData = {
          labels: this.pendientesFinalizadasLabels,
          datasets: [
            { data: [data['Asesorias Pendientes'], data['Asesorias Finalizadas'], data['Asesorias Sin Asignar'], data['Asesorias Asignadas']], label: 'Asesorías' }
          ]
        };
        this.asesoresData = {
          labels: this.asesoresLabels,
          datasets: [
            { data: [data['Mis Asesores']], label: 'Asesores' }
          ]
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
