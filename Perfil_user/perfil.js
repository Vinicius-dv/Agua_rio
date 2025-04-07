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
            const user = dados.usuario
            nome_user.value = user.nome
            email_user.value = user.email
            senha_user.value = user.senha
            matricula_user.value = user.matricula
            cpf_user.value = user.cpf
            telefone_user.value = user.telefone
            
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

const btn_dados = document.getElementById('btn_dados')