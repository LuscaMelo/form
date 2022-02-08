const pesquisarCep = async () => {
    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const cepInvalido = document.querySelector('.danger')

    if(cepValido(cep)) {
        const dados = await fetch(url)
        const endereco = await dados.json()
    
        if (endereco.hasOwnProperty('erro')) {
            cepInvalido.innerHTML = '* cep inválido'
            limparTodosInputs()
        } else {
            cepInvalido.innerHTML = ''
            preencherFormulario(endereco)
        }
    } else {
        cepInvalido.innerHTML = '* cep inválido'
        limparTodosInputs()
    }
}

const cepValido = (cep) => cep.length == 8 ? true : false


const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const limparTodosInputs = () => {
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep)