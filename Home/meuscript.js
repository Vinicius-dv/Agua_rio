document.addEventListener("DOMContentLoaded", () => {
  fetch("https://agua-rio.onrender.com/info_user", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(dados => {
    if (dados.logado) {
      const cardCadastro = document.getElementById("main_cadastro")
      if (cardCadastro) cardCadastro.style.display = "none"

      const linkCadastro = document.getElementById("link_cadastro")
      if (linkCadastro) linkCadastro.style.display = "none"

      
      const link_login = document.getElementById("link_login")
      if (link_login) link_login.style.display = "none"

      const linkLogout = document.getElementById("link_sair")
      if (linkLogout) linkLogout.style.display = "block"

      const linkPerfil = document.getElementById("link_perfil")
      if (linkPerfil) linkPerfil.style.display = "block"
    } else {
      const cardCadastro = document.getElementById("main_cadastro")
      if (cardCadastro) cardCadastro.style.display = "flex"

      const linkCadastro = document.getElementById("link_cadastro")
      if (linkCadastro) linkCadastro.style.display = "block"

      const link_login = document.getElementById("link_login")
      if (link_login) link_login.style.display = "block"

      const linkLogout = document.getElementById("link_sair")
      if (linkLogout) linkLogout.style.display = "none"

      const linkPerfil = document.getElementById("link_perfil")
      if (linkPerfil) linkPerfil.style.display = "none"
    }
  })
  .catch(err => {
    console.log("Erro ao buscar info_user:", err)
  })
})


function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

    let soma = 0, resto

    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) return false

    soma = 0
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) return false

    return true
  }

  const inputCPF = document.getElementById('cpf_user')

  inputCPF.addEventListener('input', () => {
    let valor = inputCPF.value.replace(/\D/g, '')
    if (valor.length > 3) valor = valor.replace(/^(\d{3})(\d)/, '$1.$2')
    if (valor.length > 6) valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    if (valor.length > 9) valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    inputCPF.value = valor

    if (inputCPF.value.length === 14) {
      if (validarCPF(inputCPF.value)) {
        inputCPF.classList.add('valido')
        inputCPF.classList.remove('invalido')
      } else {
        inputCPF.classList.add('invalido')
        inputCPF.classList.remove('valido')
      }
    } else {
      inputCPF.classList.remove('valido', 'invalido')
    }
  })
const mensagem = document.getElementById('mensagem')
const btn_cad = document.getElementById('btn_cad')
btn_cad.addEventListener('click',(e)=>{
  e.preventDefault()
  const nome = document.getElementById('nome_user').value
  const email = document.getElementById('email_user').value
  const senha = document.getElementById('senha_user').value
  const matricula = document.getElementById('mat_rio').value
  const cpf = document.getElementById('cpf_user').value
  const telefone = document.getElementById('tel_user').value

  fetch('https://agua-rio.onrender.com/receber_codigo',{
    method:'Post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({nome:nome,email:email,senha:senha,cpf:cpf,matricula:matricula,telefone:telefone})
  })
  .then(res=>res.json())
  .then(dados=>{
    if(dados.success){
      if(dados.success){
        mensagem.innerText = dados.message
        mensagem.style.color = 'green'
        window.location.href =  window.location.href = '../Verificar_codigo/verificar_codigo.html'
    }else{
        mensagem.innerText = dados.message
        mensagem.style.color = 'red'
    }
    }
  })
  .catch((err)=>{
    mensagem.innerText = 'Erro ao conectar ao servidor!'
    mensagem.style.color = 'red'
    console.log('Ocorreu um erro'+err)
})
})




document.getElementById('link_sair').addEventListener('click', () => {
  fetch('https://agua-rio.onrender.com/logout', {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(res => res.json())
  .then( dados=> {
    if(dados.success){
      mensagem.innerText = dados.message
      mensagem.style.color = 'green'

      const cardCadastro = document.getElementById("main_cadastro")
      if (cardCadastro) cardCadastro.style.display = "block"

      const linkCadastro = document.getElementById("link_cadastro")
      if (linkCadastro) linkCadastro.style.display = "block"

      const linkLogout = document.getElementById("link_sair")
      if (linkLogout) linkLogout.style.display = "none"
    }else{
      mensagem.innerText = dados.message
      mensagem.style.color = 'red'
    }
  })
  .catch(err=>{
    mensagem.innerText = 'algo deu errado'+err
    mensagem.style.color = 'red'
  })
})