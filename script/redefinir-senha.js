document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nomeUsuario = document.getElementById('nomeCompleto').value;
    const emailUsuario = document.getElementById('emailCadastrado').value;
    const novaSenha = document.getElementById('nova-senha').value;

    if (!nomeUsuario) {
        showToast('Por favor, digite o seu nome', 'error');
        return;
    }

    if (!emailUsuario) {
        showToast('Por favor, digite o seu e-mail utilizado no cadastro', 'error');
        return;
    }

        if (!novaSenha) {
        showToast('Por favor, digite a sua nova senha', 'error');
        return;
    }

    console.log(nomeUsuario);
    console.log(emailUsuario);
    console.log(novaSenha);

        try {
        const response = await fetch(`${BACKEND_BASE_URL}/login/redefinir-senha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomeUsuario,
                email: emailUsuario,
                senha: novaSenha
            })
        });

        if (response.ok) {
            const data = await response.json();
            showToast('Senha redefinida com sucesso!', 'success');
            document.getElementById('login-form').reset();
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

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  
  // Cria o toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`; // Usando suas classes
  toast.textContent = message;
  
  // Adiciona o toast ao container
  container.appendChild(toast);
  
  // Animação de entrada
  toast.style.transform = 'translateY(100%)';
  toast.style.opacity = '0';
  setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
  }, 10);
  
  // Remove após 3 segundos
  setTimeout(() => {
      toast.style.transform = 'translateY(100%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
  }, 3000);
}