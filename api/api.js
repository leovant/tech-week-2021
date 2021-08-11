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

/*
  Pode ser chamada com o comando curl:
  curl --request POST \
  --url http://localhost:3000/person \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'name=Leovan Tavares' \
  --data email=leovant@gmail.com \
  --data birthDate=04/09/1984
 */
app.post('/person', (req, res) => {
  const { name, email, birthDate } = req.body

  console.log('New person received:')
  console.table([ name, email, birthDate ])

  try {
    const file = fs.createWriteStream('people.txt', { flags: 'a' }) // a flat 'a' é para incluir dados, mantendo os anteriores
    file.write(`${String(name).padEnd(100, ' ')}${String(email).padEnd(30, ' ')}${String(birthDate).padStart(15)}\n`)
    file.end()
  } catch (e) {
    console.error(e.message)
    return res.status(500).json({ message: e.message })
  }
  
  res.status(201).json({ name, email, birthDate })
})

app.listen(port, () => {
  console.log(`Api rodando no endereço http://localhost:${port}`)
})