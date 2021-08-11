const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

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
  
  res.json({ name, email, birthDate })
})

app.listen(port, () => {
  console.log(`Api rodando no endereço http://localhost:${port}`)
})