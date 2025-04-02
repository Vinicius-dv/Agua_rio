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