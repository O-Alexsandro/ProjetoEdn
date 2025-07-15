document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('departamento-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const departmentName = document.getElementById('departamento').value.trim();

    if (!departmentName) {
        showMessage('Por favor, digite um nome para o departamento', 'error');
        return;
    }

        try {
        const response = await fetch(`${BACKEND_BASE_URL}/departamento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: departmentName
            })
        });

        if (response.ok) {
            const data = await response.json();
            showToast('Departamento salvo com sucesso!', 'success');
            document.getElementById('departamento-form').reset();
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

function showMessage(message, type) {
const responseElement = document.getElementById('responseMessage');
responseElement.textContent = message;
responseElement.className = `response-message ${type}`;
responseElement.style.display = 'block';

    setTimeout(() => {
        responseElement.style.display = 'none';
    }, 5000);
}