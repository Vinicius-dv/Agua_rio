document.addEventListener("DOMContentLoaded", function() {
    const btn_enviar = document.getElementById("btn_enviar")

    btn_enviar.addEventListener("click", function(e) {
        e.preventDefault()

        const form = document.getElementById("form")
        if (form) {
            form.addEventListener("submit", function(event) {
                event.preventDefault()
            })
        }

        const nome = document.getElementById("nome").value.trim()
        const cpf = document.getElementById("cpf").value.trim()
        const matricula = document.getElementById("matricula").value.trim()
        const whatsapp = document.getElementById("whatsapp").value.trim()
        const email = document.getElementById("email").value.trim()

        if (!nome || !cpf || !matricula || !whatsapp || !email) {
            alert("Preencha todos os campos antes de enviar.")
            return
        }

        const numero = "5516991950657";
        const mensagem = `Olá, segue meus dados:\n\n👤 Nome: ${nome}\n🆔 CPF: ${cpf}\n📌 Matrícula: ${matricula}\n📱 WhatsApp: ${whatsapp}\n📧 E-mail: ${email}`

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
        window.open(url, "_blank")
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