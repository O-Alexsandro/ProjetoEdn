document.addEventListener('DOMContentLoaded', async function() {
    await loadUsuarios();
    await loadMaquina();
    await loadSoftware();
    await loadPIP();

    document.getElementById('relacionamento-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const usuarioNome = document.getElementById('nomeUsuarioo').value;
        const maquinaNome = document.getElementById('nomeMaquina').value;
        const nomePib = document.getElementById('nomePip').value;
        const nomeSoftware = document.getElementById('nomeSoftware').value;

        console.log("nome" + usuarioNome)
        console.log(maquinaNome)
        console.log(nomePib)
        console.log(nomeSoftware)


    if (!maquinaNome) {
        showToast('Por favor, selecione uma máquina', 'error');
        return;
    }

    if (!nomePib) {
        showToast('Por favor, selecione um suprimento (PIB)', 'error');
        return;
    }

    if (!nomeSoftware) {
        showToast('Por favor, selecione um software', 'error');
        return;
    }

        try {
        const response = await fetch(`${BACKEND_BASE_URL}/relacionamento`
, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUsuario: usuarioNome,
                idMaquina: maquinaNome,
                idSoftware : nomeSoftware,
                idPip : nomePib
            })
        });

            if (response.ok) {
                console.log('a response é: ' + response)
                const data = await response.json();
                showToast('Relacionamento salvo com sucesso!', 'success');
                document.getElementById('relacionamento-form').reset();
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

async function loadUsuarios() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/usuarioSistema`
);
        if (response.ok) {
            const usuarios = await response.json();
            console.log('API Response:', usuarios); // Debug API response
            const select = document.getElementById('nomeUsuarioo');
            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.idUsuario;
                option.textContent = usuario.nomeUsuario;
                select.append(option);  
            });
        } else {
            console.error('Erro ao carregar usuarios');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function loadDepartamentosRelacionamento() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/departamento`
);
        if (response.ok) {
            const departamentos = await response.json();
            console.log('API Response:', departamentos); // Debug API response
            const select = document.getElementById('relacionamento-departamento');
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


async function loadMaquina() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/maquina`
);
        if (response.ok) {
            const maquinas = await response.json();
            console.log('API Response:', maquinas); // Debug API response
            const select = document.getElementById('nomeMaquina');
            maquinas.forEach(maquina => {
                const option = document.createElement('option');
                option.value = maquina.idMaquina;
                option.textContent = maquina.placaMae;
                select.append(option);  
            });
        } else {
            console.error('Erro ao carregar departamentos');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function loadPIP() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/pip`
);
        if (response.ok) {
            const pips = await response.json();
            console.log('API Response:', pips); // Debug API response
            const select = document.getElementById('nomePip');
            pips.forEach(pip => {
                const option = document.createElement('option');
                option.value = pip.idPip;
                option.textContent = pip.nomePip;
                select.append(option);  
            });
        } else {
            console.error('Erro ao carregar departamentos');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function loadSoftware() {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/software`
);
        if (response.ok) {
            const softwares = await response.json();
            console.log('API Response:', softwares); // Debug API response
            const select = document.getElementById('nomeSoftware');
            softwares.forEach(software => {
                const option = document.createElement('option');
                option.value = software.idSoftware;
                option.textContent = software.nomeSoftware;
                select.append(option);  
            });
        } else {
            console.error('Erro ao carregar departamentos');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}


document.getElementById('nomeMaquina').addEventListener('change', async function() {
    const maquinaId = this.value;
    if (maquinaId) {
        const maquina = await fetchMaquina(maquinaId);
        if (maquina) {
            document.getElementById('marcaProcessador').value = maquina.marcaProcessador.nomeMarcaProcessador;
            document.getElementById('processador').value = maquina.processador;
            document.getElementById('modeloMemoria').value = maquina.modeloMemoria.modeloMemoria;
            document.getElementById('frequenciaMemoria').value = maquina.frequenciaMemoria.frequenciaMemoria;
            document.getElementById('quantidadeMemoria').value = maquina.quantidadeMemoria;
            document.getElementById('tipoArmazenamento').value = maquina.tipoArmazenamento.tipoArmazenamento;
            document.getElementById('quantidadeArmazenamento').value = maquina.quantidadeArmazenamento;

            document.getElementById('subform-maquina').style.display = 'block';
        }
    } else {
        document.getElementById('subform-maquina').style.display = 'none';
    }
});

async function fetchMaquina(maquinaId) {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/maquina/${maquinaId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Erro ao carregar a máquina');
            return null;
        }
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}