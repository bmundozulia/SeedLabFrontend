// Gráfico de solicitudes por género
const generoCtx = document.getElementById('generoChart').getContext('2d');
new Chart(generoCtx, {
    type: 'doughnut',
    data: {
        labels: ['Hombres', 'No especificado', 'Mujeres'],
        datasets: [{
            data: [30, 50, 20],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Solicitudes por género'
        }
    }
});

// Gráfico de trl
const trlCtx = document.getElementById('trlChart').getContext('2d');
new Chart(trlCtx, {
    type: 'bar',
    data: {
        labels: ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'],
        datasets: [{
            label: 'Valores',
            data: [120, 60, 50, 40, 30],
            backgroundColor: '#36A2EB'
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Grafica de trl'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Gráfico de solicitudes
const solicitudesCtx = document.getElementById('solicitudesChart').getContext('2d');
new Chart(solicitudesCtx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [{
            label: 'Número de emprendedores',
            data: [30, 35, 28, 32, 38, 40, 35],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Solicitudes'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});