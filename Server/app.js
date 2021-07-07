const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const connect = require('./connect/sequelize/config/config')
const Routes = require('./connect/sequelize/routes/Routes')


// TEST DB

connect.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err))


app.use(cors());
app.options('*', cors());
app.use(express.json()) // req body

// Routes Users
app.use('/', Routes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})