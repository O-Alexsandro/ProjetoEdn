document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pip-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nomePip = document.getElementById('nome-Pip').value;
    const descricaoPip = document.getElementById('descricaoPip').value;

    console.log(nomePip);
    console.log(descricaoPip);


    if (!nomePip) {
        showMessage('Por favor, digite um nome para o PIP', 'error');
        return;
    }

    if (!descricaoPip) {
    showMessage('Por favor, digite uma descrição para o PIP', 'error');
    return;
}
        try {
        const response = await fetch(`${BACKEND_BASE_URL}/pip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomePip,
                descricao: descricaoPip
            })
        });

        if (response.ok) {
            const data = await response.json();
            showToast('PIP salvo com sucesso!', 'success');
            document.getElementById('pip-form').reset();
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