const express = require('express')
const app = express()

const date = new Date();
const localeTime = date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})
const localeDate = date.toLocaleDateString('en-US', {month: "numeric", day: "numeric", year: "numeric"})

app.get('/', function (req, res) {
    res.send('Hello user!\nThe current date and time is: ' + localeDate + ", " +localeTime)
})

app.listen(3000)