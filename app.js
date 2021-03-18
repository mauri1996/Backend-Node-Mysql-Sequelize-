/// iniciar servervidor
const app = require('./service/server')
const logger = require('morgan')

app.use(logger('dev'))


const userRoutes = require('./routes/api/users') 

app.get('/',(req,res)=>{
    res.send('hola mundo!!')
})
app.use('/api/users',userRoutes)

