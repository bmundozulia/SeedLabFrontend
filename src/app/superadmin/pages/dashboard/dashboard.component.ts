import { Component } from '@angular/core';
import { User } from '../../../Modelos/user.model';
import { SuperadminService } from '../../../servicios/superadmin.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AliadoService } from '../../../servicios/aliado.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

token: string | null = null;
user: User = null;
id:number;
currentRolId:number = null;
totalUsuarios:any[] = [];
totalSuperAdmin: any = {};
totalOrientador:any = {};
totalAliados:any = {};
totalAsesores:any = {};
totalEmprendedores:any = {};
topAliados:any = {};

//Barras top_aliados
public barChartOptions: ChartOptions<'bar'> ={
  responsive:true,
  maintainAspectRatio:true 
};

public barChartType: ChartType = 'bar';

topAliadosLabels: string[] = [];
public topAliadosData:ChartDataset[] = [
  {
    label: 'Top Aliados',
    data: [0,0],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
    ],
  }
];

//Pie-Asesorias
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
}
public pieChartLabels: string[] =['Asesorias asignadas', 'Asesorias sin asignar'];

public pieChartData: ChartDataset<'pie'>[] = [];
public pieChartLegend = true;
public pieChartPlugins = [];

//Grafica generos
public doughnutChartOptions: ChartOptions<'doughnut'> = {
  responsive:true
}

public doughnutChartLabels: string[] = ['Femenino', 'Masculino', 'Otros'];

public doughnutChartData: ChartDataset<'doughnut'>[] = [];



constructor(
  private superAdminService:SuperadminService,
  private aliadoService:AliadoService
) {}

ngOnInit() {
  this.validateToken();
  this.getDatosDashboard();
  this.getDatosGenerosGrafica();
};


validateToken():void{
  if(!this.token){
    this.token = localStorage.getItem('token');
    let identityJSON = localStorage.getItem('identity');

    if(identityJSON){
      let identity = JSON.parse(identityJSON);
      this.user = identity;
      this.id = this.user.id;
      this.currentRolId = this.user.id_rol;
      console.log(this.currentRolId);
      if(this.currentRolId != 1){
        
      }
    }
  }
}

getDatosDashboard():void{
  this.superAdminService.dashboardAdmin(this.token).subscribe(
    data => {
      this.totalUsuarios = data;
      this.totalSuperAdmin = data.superadmin;
      this.totalOrientador = data.orientador;
      this.totalAliados = data.aliado;
      this.totalAsesores = data.asesor;
      this.totalEmprendedores = data.emprendedor;
      this.topAliados = data.topAliados;
      this.topAliadosLabels = this.topAliados.map(aliado => aliado.nombre);
      this.topAliadosData[0].data = this.topAliados.map(aliado => aliado.asesorias);
      this.pieChartData = [{
        label: 'Asesorias',
        data: [data.conteoAsesorias.asesoriasAsignadas, data.conteoAsesorias.asesoriasSinAsignar],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
      }];
      console.log(data);
    },
    error => {
      console.log(error);
    }
  )
}

getDatosGenerosGrafica():void{
  this.aliadoService.graficaDatosGeneros(this.token).subscribe(
    data => {
      console.log('data generos',data);
      const dataGenero = data.map(item => item.total);
      this.doughnutChartData =[{
        label: 'Generos',
        data: dataGenero,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)'
        ]
      }]
    },
    error => {
      console.log(error);
    }
  )
}



}
