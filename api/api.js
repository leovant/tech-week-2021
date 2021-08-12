const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/ping', (req, res) => {
  res.send('Pong')
})

app.post('/person', function(request, response) {
  const { name, email, birthDate } = request.body

  console.log('New person received:')
  console.table([ name, email, birthDate ])

  try {
    const file = fs.createWriteStream('people.txt', { flags: 'a' }) // a flag 'a' é para incluir dados, mantendo os anteriores
    const line = `${String(name).padEnd(100, ' ')}${String(email).padEnd(30, ' ')}${String(birthDate).padStart(15, ' ')}\n`

    file.write(line)
    file.end()
  } catch (e) {
    console.error(e.message)
    return response.status(500).json({ message: e.message })
  }

  response.status(201).json({ name, email, birthDate })
})

app.listen(port, () => {
  console.log(`Api rodando no endereço http://localhost:${port}`)
})