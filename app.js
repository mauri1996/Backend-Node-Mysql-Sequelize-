/// iniciar servidor
const app = require('./service/server')
const logger = require('morgan')  /// libreria para ver peticiones

const db= require('./models')  // models contiene index


/// reinicia la tabla si ya existe
db.sequelize.sync({force: true})
            .then(()=>{
                console.log('Drop ana re-sync db')
            })

app.use(logger('dev'))

const userRoutes = require('./routes/api/user.routes') 

app.get('/',(req,res)=>{
    res.send('hola mundo!!')
})

// uso de rutas
app.use('/api/users',userRoutes)

