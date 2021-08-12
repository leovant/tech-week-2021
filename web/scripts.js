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

function toggleValid(element, valid) {
  if (valid) {
    element.setCustomValidity('')
    element.classList.remove('invalid')
  } else {
    element.setCustomValidity('Invalid value')
    element.classList.add('invalid')
  }
}

/**
 * Valida o nome: deve aceitar apenas letras
 */
function validatePersonName() {
  const name = String(personName.value).trim()

  if (!name) {
    return toggleValid(personName, false)
  }

  const valid = /^[a-zA-Z]+$/.test(name)

  return toggleValid(personName, valid)
}

/**
 * Valida e-mail: formato texto@texto.com
 */
 function validatePersonEmail() {
  const email = String(personEmail.value).trim()

  if (!email) {
    return toggleValid(personEmail, false)
  }

  const valid = /^\S+@\S+\.\S+$/.test(email)

  return toggleValid(personEmail, valid)
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

/**
 * Valida data
 */
function validatePersonBirth() {
  const birthDate = String(personBirth.value)

  if (birthDate.length != 10) {
    return toggleValid(personBirth, false)
  }

  const [day, month, year] = birthDate.split('/')
  const date = new Date(`${year}-${month}-${day}`) // yyyy-mm-dd

  if (date == 'Invalid Date') {
    return toggleValid(personBirth, false)
  }
  return toggleValid(personBirth, true)
}

/**
 * Habilita botão Enviar
 */
const button = document.getElementById('form-submit')
const form = document.getElementById('person-form')

form.addEventListener('change', function() {
  button.disabled = !form.checkValidity()
})

/**
 * Envia dados para a API
 */
function submitData(event) {
  event.preventDefault()

  const formData = new FormData(form)
  const { name, email, birthDate } = Object.fromEntries(formData)
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `name=${name}&email=${email}&birthDate=${birthDate}`
  }

  fetch('http://localhost:3000/person', parameters)
  .then(function(response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  })
  .then(function(data) {
    console.log('Response received', data)
  })
  .catch(function(error) {
    console.error(error)
    alert('Dados não enviados!')
  })
}