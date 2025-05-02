const express = require('express')
const app = express()
const port = 3000

app.get('/login', (req, res) => {
    res.send('Hello World!')
})