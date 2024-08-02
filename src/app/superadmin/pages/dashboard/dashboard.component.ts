import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../../Modelos/user.model';
import { SuperadminService } from '../../../servicios/superadmin.service';
import { AliadoService } from '../../../servicios/aliado.service';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  token: string | null = null;
  user: User = null;
  id: number;
  currentRolId: number = null;
  totalUsuarios: any[] = [];
  totalSuperAdmin: any = {};
  totalOrientador: any = {};
  totalAliados: any = {};
  totalAsesores: any = {};
  totalEmprendedores: any = {};
  topAliados: any = {};
  pieChartOption: echarts.EChartsOption;
  doughnutChartOption: echarts.EChartsOption;

  // Barras top_aliados
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false 
  };

  public barChartType: ChartType = 'bar';
  topAliadosLabels: string[] = [];
  public topAliadosData: ChartDataset[] = [
    {
      label: 'Top Aliados',
      data: [0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
    }
  ];

  // Pie-Asesorias
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public pieChartLabels: string[] = ['Asesorias asignadas', 'Asesorias sin asignar'];
  public pieChartData: ChartDataset<'pie'>[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Gráfica géneros
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public doughnutChartLabels: string[] = ['Femenino', 'Masculino', 'Otros'];
  public doughnutChartData: ChartDataset<'doughnut'>[] = [];

  constructor(
    private superAdminService: SuperadminService,
    private aliadoService: AliadoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.validateToken();
    this.getDatosDashboard();
    this.getDatosGenerosGrafica();
  }

  ngAfterViewInit() {
    // El gráfico se inicializará cuando se carguen los datos
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        console.log(this.currentRolId);
        if (this.currentRolId != 1) {
          this.router.navigate(['home']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['home']);
    }
  }

  getDatosDashboard(): void {
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
        this.pieChartOption = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Asesorías',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: data.conteoAsesorias.asesoriasAsignadas, name: 'Asesorías asignadas' },
                { value: data.conteoAsesorias.asesoriasSinAsignar, name: 'Asesorías sin asignar' }
              ]
            }
          ]
        };

        // Inicializa el gráfico aquí después de obtener los datos
        this.initEChartsPie();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  initEChartsPie(): void {
    const chartDom = document.getElementById('echarts-pie');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      myChart.setOption(this.pieChartOption);
    } else {
      console.error('No se pudo encontrar el elemento con id "echarts-pie"');
    }
  }

  getDatosGenerosGrafica(): void {
    this.aliadoService.graficaDatosGeneros(this.token).subscribe(
      data => {
        console.log('data generos', data);
        const dataGenero = data.map(item => item.total);
        this.doughnutChartOption = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Géneros',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: data.map(item => ({ value: item.total, name: item.genero }))
            }
          ]
        };

        // Inicializa el gráfico aquí después de obtener los datos
        this.initEChartsDoughnut();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  initEChartsDoughnut(): void {
    const chartDom = document.getElementById('echarts-doughnut');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      myChart.setOption(this.doughnutChartOption);
    } else {
      console.error('No se pudo encontrar el elemento con id "echarts-doughnut"');
    }
  }
}
