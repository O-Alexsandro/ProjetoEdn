document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('software-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nomeSoftware = document.getElementById('nomeSoftwaree').value.trim();
    const nomeSerial = document.getElementById('nomeSeriall').value.trim();


    if (!nomeSoftware) {
        showMessage('Por favor, digite um nome para o software', 'error');
        return;
    }

    if (!nomeSerial) {
    showMessage('Por favor, digite um nome para o serial', 'error');
    return;
}
        try {
        const response = await fetch(`${BACKEND_BASE_URL}/software`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomeSoftware,
                serial: nomeSerial
            })
        });

        if (response.ok) {
            const data = await response.json();
            showToast('Software salvo com sucesso!', 'success');
            document.getElementById('software-form').reset();
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