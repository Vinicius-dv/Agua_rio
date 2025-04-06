const btn_login = document.getElementById('btn_login')
btn_login.addEventListener('click',(e)=>{
  e.preventDefault()
  const nome_user_login = document.getElementById('nome_user_login').value
  const email_user_login = document.getElementById('email_user_login').value
  const senha_user_login = document.getElementById('senha_user_login').value
  fetch('https://agua-rio.onrender.com/login',{
    method:'Post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({nome:nome_user_login,email:email_user_login,senha:senha_user_login})
  })
  .then(res=>res.json())
  .then(dados=>{
    if(dados.success){
      if(dados.success){
        mensagem.innerText = dados.message
        mensagem.style.color = 'green'
         window.location.href = '/'
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
