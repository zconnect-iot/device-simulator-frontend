const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const status = require('./status.json')
const auth_200 = require('./auth-ok.json')

const variation = 0.1

app.get('/api/v1/:id/status', (req, res) => {
  Object.keys(status).forEach((type) => {
    Object.keys(status[type]).forEach((variable) => {
      const previous = status[type][variable].value
      const max = status[type][variable].max
      const min = status[type][variable].min
      const increase = Math.random() < 0.5
      const change = previous * (variation * Math.random())
      const value = increase ? previous + change : previous - change
      status[type][variable].value = increase ? Math.min(value, max) : Math.max(value, min)
    })
  })
  res.setHeader('Content-Type', 'application/json')
  res.json(status)
})

app.post('/api/v1/auth', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(auth_200)
})

app.post('/api/v1/:id/variables', (req, res) => {
  const variable = Object.keys(req.body)[0]
  const value = req.body[variable]
  status.variables[variable].value = value
  res.setHeader('Content-Type', 'application/json')
  res.json(status)
})

app.listen(4000)
