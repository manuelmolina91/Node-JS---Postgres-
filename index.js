const express = require('express')
const bodyParser = require('body-parser')
const tasksRoutes = require('./src/routes/task')
const usersRoutes = require('./src/routes/user')
const nasaApiRoutes = require('./src/routes/nasaApi')
const authRouter = require('./src/routes/auth')
const {controlAuthentication} = require('./src/middelware/auth')
const roversRoutes = require('./src/routes/rover')
const sequelize = require('./src/services/db')
const dotenv = require('dotenv')

dotenv.config()


const startApp = async () => {
    const app = express()
    const port = 8000

     app.use(bodyParser.json())
     app.use(bodyParser.urlencoded({
         extended: true
     }))

     app.get('/', (request, response) => {
         response.json('Hello World')
     })

     app.use(controlAuthentication)
     app.use('/tasks', tasksRoutes)
     app.use('/users', usersRoutes)
     app.use('/sync-api', nasaApiRoutes)
     app.use('/rovers', roversRoutes)
     app.use('/auth' , authRouter)


    try {
        await sequelize.sync({force: true})
        app.listen(port, () => {
            console.log('APP running on port ' + port)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

startApp()