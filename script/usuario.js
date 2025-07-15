document.addEventListener('DOMContentLoaded', async function() {
    await loadDepartamentos();

    document.getElementById('usuario-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const usuarioName = document.getElementById('nomeUsuario').value.trim();
        const departamentoId = document.getElementById('nomeDepartamento').value;

        if (!usuarioName) {
            showToast('Por favor, digite um nome para o usuário', 'error');
            return;
        }

        if (!departamentoId) {
            showToast('Por favor, selecione um departamento', 'error');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: usuarioName,
                    idDepartamento: departamentoId
                })
            });

            if (response.ok) {
                console.log('a response é: ' + response)
                const data = await response.json();
                showToast('Usuário salvo com sucesso!', 'success');
                document.getElementById('usuario-form').reset();
            } else {
                const errorData = await response.json();
                showToast(`Erro ao cadastrar: ${errorData.message || 'Erro desconhecido'}`, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showToast('Erro na conexão com o servidor', 'error');
        }
    });
});

async function loadDepartamentos() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/departamento`);
        if (response.ok) {
            const departamentos = await response.json();
            console.log('API Response:', departamentos); // Debug API response
            const select = document.getElementById('nomeDepartamento');
            departamentos.forEach(departamento => {
                const option = document.createElement('option');
                option.value = departamento.idDepartamento;
                option.textContent = departamento.nomeDepartamento;
                select.append(option);  
            });
        } else {
            console.error('Erro ao carregar departamentos');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}