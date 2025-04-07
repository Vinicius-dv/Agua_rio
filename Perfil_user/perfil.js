document.addEventListener('DOMContentLoaded',(e)=>{
    const nome_user = document.getElementById('nome_user')
    const email_user = document.getElementById('email_user')
    const senha_user = document.getElementById('senha_user')
    const matricula_user = document.getElementById('matricula_user')
    const cpf_user = document.getElementById('cpf_user')
    const telefone_user = document.getElementById('telefone_user')
    fetch('https://agua-rio.onrender.com/dados_perfil',{
        method:'get'
    })
    .then(res=>res.json())
    .then(dados=>{
        if(dados.success){
            nome_user.value = dados.projetos.nome
            email_user.value = dados.projetos.email
            senha_user.value = dados.projetos.senha
            matricula_user.value = dados.projetos.matricula
            cpf_user.value = dados.projetos.cpf
            telefone_user.value = dados.projetos.telefone
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

const btn_dados = document.getElementById('btn_dados')