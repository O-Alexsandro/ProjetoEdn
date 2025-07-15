async function fetchData() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/relacionamento`);
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function populateTable(data) {
    const tbody = document.getElementById('inventory-body');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        // Nome
        const nomeId = document.createElement('td');
        nomeId.textContent = item.usuario.nomeUsuario;
        row.appendChild(nomeId);

        // Departamento
        const departamentoId = document.createElement('td');
        departamentoId.textContent = item.usuario.departamento.nomeDepartamento;
        row.appendChild(departamentoId);

        // Máquina
        const detalhes = document.createElement('td');
        detalhes.textContent = item.maquina.placaMae;
        row.appendChild(detalhes);

        // Software
        const softwareId = document.createElement('td');
        softwareId.textContent = item.software.nomeSoftware;
        row.appendChild(softwareId);

        // PIP
        const pip = document.createElement('td');
        pip.textContent = item.pip.nomePip;
        row.appendChild(pip);

        const acoes = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i> Apagar`;
        deleteButton.onclick = () => deleteItem(item.idUsuMaqSoftPip);

        deleteButton.style.backgroundColor = '#6c757d';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '6px';
        deleteButton.style.padding = '6px 12px';
        deleteButton.style.fontSize = '14px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.display = 'inline-flex';
        deleteButton.style.alignItems = 'center';
        deleteButton.style.gap = '6px';
                       
        acoes.appendChild(deleteButton);
        row.appendChild(acoes);
        row.onclick = () => mostrarDetalhes(item);
        tbody.appendChild(row);
    });
}


async function deleteItem(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este relacionamento?");
    console.log(id + "Para deleção")
    if (!confirmacao) return;

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/relacionamento/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Item excluído com sucesso!");
            fetchData();
        } else {
            alert("Erro ao excluir o item.");
        }
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir o item.");
    }
}

// Função que exibe os dados no card
function mostrarDetalhes(item) {
    document.getElementById('detalhes-usuario').style.display = 'block';

    // Nome
    document.getElementById('detalhes-nome-usuario').textContent = item.usuario.nomeUsuario;

    // Departamento
    document.getElementById('detalhes-departamento').textContent = item.usuario.departamento.nomeDepartamento;

    // Máquina
    document.getElementById('maquina-modelo').textContent = item.maquina.placaMae;
    document.getElementById('maquina-cpu').textContent = item.maquina.processador;
    document.getElementById('maquina-ram').textContent = item.maquina.quantidadeMemoria + " GB";

    // PIP
    document.getElementById('pip-codigo').textContent = item.pip.nomePip;

    const dataBruta = item.pip.dataCadastro.split('T')[0];
    const [ano, mes, dia] = dataBruta.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`; // Formato DD/MM/AAAA
    document.getElementById('pip-data').textContent = dataFormatada;

    // Software 
    document.getElementById('nome-software').textContent = item.software.nomeSoftware;
    document.getElementById('serial-software').textContent = item.software.serialSoftware;
}


function fecharDetalhes() {
    document.getElementById('detalhes-usuario').style.display = 'none';
}


async function exportToCSV() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/exportar`, {
        method: 'GET',
        });

        if (!response.ok) {
        throw new Error('Erro ao exportar dados');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // Nome do arquivo que será salvo
        a.download = 'inventario.xlsx';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Falha ao exportar os dados.');
    }
}

document.getElementById('inventory-search').addEventListener('input', function () {
    const termoBusca = this.value.toLowerCase().trim();
    const linhas = document.querySelectorAll('#inventory-body tr');

    linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        const corresponde = textoLinha.includes(termoBusca);
        linha.style.display = corresponde ? '' : 'none';
    });
});

window.onload = fetchData;