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

// Validar nome: só pode ter letras e espaços
function validatePersonName() {

  const name = personName.value.trim()

  if (!name) {
    personName.classList.add('invalid')
    return;
  }

  const valid = /^[a-zA-Z ]*$/.test(name)

  if (valid) {
    personName.classList.remove('invalid')
    return;
  }

  return personName.classList.add('invalid')
}

// Validar e-mail: texto@texto.texto

// Mascarar data: dd/mm/yyyy

// Validar data

// Habilitar botão
