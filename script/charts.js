document.addEventListener('DOMContentLoaded', async function() {

  await loadTotalItens();
  await loadTotalMaquinas();
  await loadUltimoCadastro();

});

async function loadTotalItens() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/relacionamento/itens`
);
        if (response.ok) {
            const totalItens = await response.json();
            console.log('API Response:', totalItens);

            const select = document.getElementById('total-items');
            select.innerHTML = '';

            const option = document.createElement('option');
            option.value = totalItens;
            option.textContent = totalItens;
            
            option.style.color = 'white';
            option.style.fontWeight = 'bold';
            select.style.color = 'white';
            select.style.fontWeight = 'bold';
            
            select.appendChild(option);
        } else {
            console.error('Erro ao carregar total de itens');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}


async function loadTotalMaquinas() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/maquina/itens`
);
        if (response.ok) {
            const totalMaquinas = await response.json();
            console.log('API Response:', totalMaquinas);

            const select = document.getElementById('total-maquinas');
            select.innerHTML = '';

            const option = document.createElement('option');
            option.value = totalMaquinas;
            option.textContent = totalMaquinas;

            option.style.color = 'white';
            option.style.fontWeight = 'bold';
            select.style.color = 'white';
            select.style.fontWeight = 'bold';

            select.appendChild(option);
        } else {
            console.error('Erro ao carregar total de itens');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function loadUltimoCadastro() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/relacionamento/cadastro`
);
        if (response.ok) {
            const ultimoCadastro = await response.json();
            console.log('API Response:', ultimoCadastro);

            const select = document.getElementById('last-item');
            select.innerHTML = '';

            // Extrair apenas a data (YYYY-MM-DD)
            const dataBruta = ultimoCadastro.dataCadastro.split('T')[0];
            const [ano, mes, dia] = dataBruta.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`; // Formato DD/MM/AAAA

            const option = document.createElement('option');
            option.value = ultimoCadastro.dataCadastro;
            option.textContent = dataFormatada;

            option.style.color = 'white';
            option.style.fontWeight = 'bold';
            select.style.color = 'white';
            select.style.fontWeight = 'bold';

            select.appendChild(option);
        } else {
            console.error('Erro ao carregar ultimo cadastro');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

let hardwareChart;
let sectorChart;

async function initCharts() {
  const hardwareCanvas = document.getElementById('hardware-chart');
  const sectorCanvas = document.getElementById('sector-chart');

  if (!hardwareCanvas || !sectorCanvas || !document.getElementById('home-page').classList.contains('active')) return;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/relacionamento`
);
    const inventories = await response.json();

    const hardwareCounts = {};
    const sectorCounts = {};

    inventories.forEach(item => {
      const hardware = item.maquina.placaMae || 'Não informado';
      const setor = item.usuario.departamento.nomeDepartamento || 'Sem setor';

      hardwareCounts[hardware] = (hardwareCounts[hardware] || 0) + 1;
      sectorCounts[setor] = (sectorCounts[setor] || 0) + 1;
    });

    const backgroundColors = [
      '#4361ee', '#3f37c9', '#4895ef', '#4cc9f0',
      '#560bad', '#b5179e', '#7209b7', '#f72585'
    ];

    // Destroi gráficos antigos se existirem
    if (hardwareChart) hardwareChart.destroy();
    if (sectorChart) sectorChart.destroy();

    // Gráfico de Hardware (Pizza)
    hardwareChart = new Chart(hardwareCanvas, {
      type: 'doughnut',
      data: {
        labels: Object.keys(hardwareCounts),
        datasets: [{
          data: Object.values(hardwareCounts),
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' }
        }
      }
    });

    // Gráfico de Setor (Barra)
    sectorChart = new Chart(sectorCanvas, {
      type: 'bar',
      data: {
        labels: Object.keys(sectorCounts),
        datasets: [{
          label: 'Itens por Setor',
          data: Object.values(sectorCounts),
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  } catch (error) {
    console.error('Erro ao carregar dados dos gráficos:', error);
  }
}

// Chame a função ao carregar ou quando a aba "home-page" for ativada
window.onload = () => {
  fetchData();
  initCharts();
};
