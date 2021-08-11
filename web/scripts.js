// Obter referências dos campos
const personName = document.getElementById('person-name')
const personEmail = document.getElementById('person-email')
const personBirth = document.getElementById('person-birth')

// Limpar campos
const buttonClear = document.getElementById('form-clear')

function clearForm(event) {
  event.preventDefault()

  personName.value = '';
  personEmail.value = '';
  personBirth.value = '';
}

function toggleValid(element, valid) {
  if (valid) {
    element.classList.remove('invalid')
  } else {
    element.classList.add('invalid')
  }
}

// Validar nome: só pode ter letras e espaços
function validatePersonName() {

  const name = personName.value.trim()

  if (!name) {
    return toggleValid(personName, false)
  }

  const valid = /^[a-zA-Z ]*$/.test(name)

  return toggleValid(personName, valid)
}

// Validar e-mail: texto@texto.texto
function validatePersonEmail() {

  const email = personEmail.value.trim()

  if (!email) {
    return toggleValid(personEmail, false);
  }

  const valid = /\S+@\S+\.\S+$/.test(email)

  return toggleValid(personEmail, valid)
}

// Mascarar data: dd/mm/yyyy
function maskDate() {
  const birthDate = personBirth.value
  let maskedBirthDate = birthDate.replace(/\D/g, "") // Remove o que não for número
  maskedBirthDate = maskedBirthDate.replace(/(\d{2})(\d)/, "$1/$2") // Inclui a primeira barra
  maskedBirthDate = maskedBirthDate.replace(/(\d{2})(\d)/, "$1/$2") // Inclui a segunda barra
  personBirth.value = maskedBirthDate.slice(0, 10) // Remove caracteres extras no final
}

// Validar data
function validatePersonBirth() {
  const birthDate = String(personBirth.value)

  if (birthDate.length != 10) {
    return toggleValid(personBirth, false)
  }

  const [day, month, year] = birthDate.split('/')
  const date = new Date(`${year}-${month}-${day}`)

  if (date == 'Invalid Date') {
    return toggleValid(personBirth, false)
  }
  return toggleValid(personBirth, true)
}
// Habilitar botão
