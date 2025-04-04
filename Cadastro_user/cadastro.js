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