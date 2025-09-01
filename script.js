document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('fone');
    const tableBody = document.querySelector('tbody');
    
    function formatPhone(phone) {
        const numbers = phone.replace(/\D/g, '');
        
        if (numbers.length === 11) {
            return `(${numbers.substring(0, 2)})${numbers.substring(2, 7)}-${numbers.substring(7)}`;
        }
        else if (numbers.length === 10) {
            return `(${numbers.substring(0, 2)})${numbers.substring(2, 6)}-${numbers.substring(6)}`;
        }
        return phone;
    }
    
    function contactExists(name, phone) {
        const rows = tableBody.querySelectorAll('tr');
        const formattedPhone = formatPhone(phone);
        
        for (let row of rows) {
            const existingName = row.cells[0].textContent.toLowerCase().trim();
            const existingPhone = row.cells[1].textContent.trim();
            
            if (existingName === name.toLowerCase().trim() || existingPhone === formattedPhone) {
                return true;
            }
        }
        return false;
    }
    
    phoneInput.addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length >= 7) {
                if (value.length === 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
                } else if (value.length === 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
                } else if (value.length >= 6) {
                    value = value.replace(/(\d{2})(\d+)/, '($1)$2');
                } else if (value.length >= 2) {
                    value = value.replace(/(\d{2})/, '($1)');
                }
            } else if (value.length >= 2) {
                value = value.replace(/(\d{2})/, '($1)');
            }
        }
        
        event.target.value = value;
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (name === '' || phone === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (contactExists(name, phone)) {
            alert('Este nome ou número de telefone já está cadastrado!');
            return;
        }
        
        const formattedPhone = formatPhone(phone);
        
        const newRow = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        const phoneCell = document.createElement('td');
        
        nameCell.textContent = name;
        phoneCell.textContent = formattedPhone;
        
        newRow.appendChild(nameCell);
        newRow.appendChild(phoneCell);
        
        tableBody.appendChild(newRow);
        
        nameInput.value = '';
        phoneInput.value = '';
        
        nameInput.focus();
    });
});

/*
EXPLICAÇÃO DO CÓDIGO JAVASCRIPT:

Este código cria um sistema de cadastro de contatos com as seguintes funcionalidades:

1. INICIALIZAÇÃO:
   - document.addEventListener('DOMContentLoaded') garante que o código execute apenas após o carregamento completo da página
   - Seleciona os elementos HTML necessários: formulário, campos de entrada (nome e telefone) e o corpo da tabela

2. FUNÇÃO formatPhone():
   - Remove todos os caracteres não numéricos do telefone digitado
   - Formata números de 11 dígitos no padrão (xx)xxxxx-xxxx (celular)
   - Formata números de 10 dígitos no padrão (xx)xxxx-xxxx (telefone fixo)
   - Retorna o telefone original se não tiver o formato correto

3. FUNÇÃO contactExists():
   - Percorre todas as linhas existentes na tabela
   - Compara o nome digitado com os nomes já cadastrados (ignorando maiúsculas/minúsculas)
   - Compara o telefone formatado com os telefones já cadastrados
   - Retorna true se encontrar duplicata, false caso contrário

4. FORMATAÇÃO EM TEMPO REAL:
   - phoneInput.addEventListener('input') detecta quando o usuário digita no campo telefone
   - Remove caracteres não numéricos e aplica formatação automática conforme o usuário digita
   - Limita a entrada a no máximo 11 dígitos
   - Aplica formatação progressiva: (xx) -> (xx)xxxxx -> (xx)xxxxx-xxxx

5. SUBMISSÃO DO FORMULÁRIO:
   - form.addEventListener('submit') detecta quando o formulário é enviado
   - event.preventDefault() impede o recarregamento da página
   - Valida se os campos estão preenchidos
   - Verifica se não há duplicatas usando contactExists()
   - Formata o telefone usando formatPhone()
   - Cria novos elementos HTML (tr, td) para adicionar uma linha na tabela
   - Adiciona a nova linha ao final da tabela
   - Limpa os campos do formulário e retorna o foco para o campo nome

O sistema previne cadastros duplicados e mantém a formatação consistente dos telefones na tabela.
*/
