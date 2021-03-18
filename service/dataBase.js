var mysql = require('mysql')
base =  mysql.createConnection({
    host:'localhost',
    user: 'mauri',
    password: 'admin'
})


module.exports = db ={
    getBase(){
        return base
    },    
    conectar(){
        base.connect()
    },
    desconectar(){
        base.end()
    }    
}



