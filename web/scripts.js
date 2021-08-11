// Obter referência dos campos
const personName = document.getElementById("person-name")
const personEmail = document.getElementById("person-email")
const personBirth = document.getElementById("person-birth")
const buttonClear = document.getElementById("form-clear")

/**
 * Limpa os campos do formulário
 */
function clearForm(event) {
  event.preventDefault()

  personName.value = ''
  personEmail.value = ''
  personBirth.value = ''
}

buttonClear.addEventListener('click', clearForm)

/**
 * Valida o nome: deve aceitar apenas letras
 */
function validatePersonName() {
  const name = String(personName.value).trim()

  if (!name) {
    return personName.classList.add('invalid')
  }

  const valid = /^[a-zA-Z]+$/.test(name)

  if (valid) {
    return personName.classList.remove('invalid')
  }
  return personName.classList.add('invalid')
}

/**
 * Valida e-mail: formato texto@texto.com
 */
 function validatePersonEmail() {
  const email = String(personEmail.value).trim()

  if (!email) {
    return personEmail.classList.add('invalid')
  }

  const valid = /^\S+@\S+\.\S+$/.test(email)

  if (valid) {
    return personEmail.classList.remove('invalid')
  }
  return personEmail.classList.add('invalid')
}

/**
 * Mascara a data
 */
function maskDate() {
  const birthDate = personBirth.value
  let maskedBirthDate = birthDate.replace(/\D/g, '') // Remove o que não é número
  maskedBirthDate = maskedBirthDate.replace(/(\d{2})(\d)/, '$1/$2') // Inclui a primeira barra
  maskedBirthDate = maskedBirthDate.replace(/(\d{2})(\d)/, '$1/$2') // Inclui a segunda barra

  personBirth.value = maskedBirthDate.slice(0, 10)
}