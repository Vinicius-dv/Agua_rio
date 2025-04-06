document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const nome_user = document.getElementById('nome_user').value
    const email_user = document.getElementById('email_user').value
    const senha_user = document.getElementById('senha_user').value
    const matricula_user = document.getElementById('matricula_user').value
    const cpf_user = document.getElementById('cpf_user').value
    const telefone_user = document.getElementById('telefone_user').value
    fetch('https://agua-rio.onrender.com/info_user',{
        method:'get'
    })
    .then(res=>res.json())
    .then(dados=>{
        if(dados.success){
            nome_user.innerText = dados.projetos.nome
            email_user.innerText = dados.projetos.email
            senha_user.innerText = dados.projetos.senha
            matricula_user.innerText = dados.projetos.matricula
            cpf_user.innerText = dados.projetos.cpf
            telefone_user.innerText = dados.projetos.telefone
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

const btn_dados = document.getElementById('btn_dados')