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
        if (cardCadastro) cardCadastro.style.display = "block"
  
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


document.getElementById('btn_whatsapp').addEventListener('click', function() {
    window.open("https://wa.me/5516991950657", "_blank")
})