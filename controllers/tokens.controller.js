const db = require('../models')
const Token = db.tokens
const crypto = require('crypto')
console.log(db)

module.exports = {
    list: function(req,res,next){            
        console.log('ok')
    },
    create: (id)=>{
        const token = {
            _id: id,
            token: crypto.randomBytes(16).toString('hex')
        }
        Token.create(token)
        .then(data =>{
            //User.enviarEmailBienvenida(data.id)
            console.log(data)
        })
    }

}