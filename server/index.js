const express = require('express')
const app = express()
const PORT = 8000

app.get('/', (req, res) => {
    res.send('Hello Worldz!')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})