const btn_cad = document.getElementById('btn_cad')
btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()
    const codigo = document.getElementById('codigo').value
    const email = document.getElementById('email_user').value
    const mensagem = document.getElementById('mensagem')
    fetch('https://agua-rio.onrender.com/verificar_codigo',{
        method:'Post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({codigo:codigo,email:email})
    })
    .then(res=>res.json())
    .then(dados=>{
        if(dados.success){
            mensagem.innerText = dados.message
            mensagem.style.color = 'green'
            window.location.href = '../index.html'
        }else{
            mensagem.innerText = dados.mensagem
            mensagem.style.color = 'red'
        }
    })
    .catch((err)=>{
        mensagem.innerText = 'Erro ao conectar ao servidor!'
        mensagem.style.color = 'red'
        console.log('Ocorreu um erro'+err)
    })
})


const btn_reenviar = document.getElementById('reenviar_codigo')

btn_reenviar.addEventListener('click', () => {
  const email = document.getElementById('email_user').value
  const mensagem = document.getElementById('mensagem')

  if (!email) {
    mensagem.innerText = 'Digite seu e-mail primeiro!'
    mensagem.style.color = 'red'
    return
  }

  btn_reenviar.disabled = true
  setTimeout(() => {
    btn_reenviar.disabled = false
  }, 30000)

  fetch('https://agua-rio.onrender.com/reenviar_codigo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    mensagem.innerText = data.message
    mensagem.style.color = data.success ? 'green' : 'red'
  })
  .catch(() => {
    mensagem.innerText = 'Erro ao conectar com o servidor.'
    mensagem.style.color = 'red'
  })
})