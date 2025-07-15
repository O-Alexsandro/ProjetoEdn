document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('maquina-form').addEventListener('submit', async function(e) {
        e.preventDefault();

    const placa_mae = document.getElementById('placa-mae').value.trim();
    const marca_processador = document.getElementById('marca-processador').value.trim();
    const processador = document.getElementById('processador-maquina').value.trim();
    const modelo_memoria = document.getElementById('modelo-memoria').value.trim();
    const frequencia_memoria = document.getElementById('frequencia-memoria').value.trim();
    const quantidade_memoria = document.getElementById('quantidade-memoria').value.trim();
    const tipo_armazenamento = document.getElementById('tipo-armazenamento').value.trim();
    const quantidade_armazenamento = document.getElementById('quantidade-armazenamento').value.trim();

    console.log('placa_mae:', placa_mae);
    console.log('marca_processador:', marca_processador);
    console.log('processador:', processador);
    console.log('modelo_memoria:', modelo_memoria);
    console.log('frequencia_memoria:', frequencia_memoria);
    console.log('quantidade_memoria:', quantidade_memoria);
    console.log('tipo_armazenamento:', tipo_armazenamento);
    console.log('quantidade_armazenamento:', quantidade_armazenamento);


    if (!placa_mae) {
        showMessage('Por favor, digite a placa mãe', 'error');
        return false;
    }
    if (!marca_processador) {
        showMessage('Por favor, digite a marca do processador', 'error');
        return false;
    }
    if (!processador) {
        showMessage('Por favor, digite o nome do processador', 'error');
        return false;
    }
    
    if (!modelo_memoria) {
        showMessage('Por favor, digite o modelo da memória', 'error');
        return false;
    }
    if (!frequencia_memoria) {
        showMessage('Por favor, digite a frequência da memória', 'error');
        return false;
    }
    if (!quantidade_memoria) {
        showMessage('Por favor, digite a quantidade de memória', 'error');
        return false;
    }
    if (!tipo_armazenamento) {
        showMessage('Por favor, digite o tipo de memória', 'error');
        return false;
    }
    if (!quantidade_armazenamento) {
        showMessage('Por favor, digite a quantidade de armazenamento', 'error');
}
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/maquina`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    placaMae: placa_mae,
                    marcaProcessador: marca_processador,
                    processador: processador,
                    modeloMemoria: modelo_memoria,
                    frequenciaMemoria: frequencia_memoria,
                    quantidadeMemoria: quantidade_memoria,
                    tipoArmazenamento: tipo_armazenamento,
                    quantidadeArmazenamento: quantidade_armazenamento
                })
            });

            if (response.ok) {
                const data = await response.json();
                showToast('MÁQUINA SALVA COM SUCESSO!', 'success');
                document.getElementById('maquina-form').reset();
            } else {
                const errorData = await response.json();
                showToast(`ERRO AO CADASTRAR: ${errorData.message || 'ERRO DESCONHECIDO'}`, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showToast('ERRO NA CONEXÃO COM O SERVIDOR', 'error');
        }
    });
});