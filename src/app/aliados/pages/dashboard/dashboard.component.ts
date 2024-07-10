import { Component } from '@angular/core';
import { AliadoService } from '../../../servicios/aliado.service';
import { User } from '../../../Modelos/user.model';
import { Router } from '@angular/router';
import { ChartType, ChartOptions, ChartDataset,  ChartData } from 'chart.js';



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

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public pendientesFinalizadasLabels: string[] = ['Pendientes', 'Finalizadas', 'Sin asignar', 'Asignadas'];
  public pendientesFinalizadasData:ChartDataset[] = [
    {
      label: 'Asesorías',
      data: [0, 0], // Estos valores serán actualizados después de cargar los datos
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
    }
  ];


  public pieChartLegend = true;
  public pieChartType: ChartType = 'doughnut';
  public barChartType: ChartType = 'bar';

  public asesoresLabels: string[] = ['Asesores'];
  public asesoresData: ChartData<'bar'> = {
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
          this.pendientesFinalizadasData[0].data = [
            data['Asesorias Pendientes'],
            data['Asesorias Finalizadas'],
            data['Asesorias Sin Asignar'], 
            data['Asesorias Asignadas']
          ];
        },
      (error) => {
        console.error(error);
      }
    );
  }
}
