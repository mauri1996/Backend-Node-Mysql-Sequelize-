const db = require('../models')
const User = db.users
const Token =db.tokens

module.exports = {
    confirmation: (req,res)=>{            
        Token.findOne({
            where:{
                token: req.params.token
            }
            
        })
        .then(token =>{
            if(token){
                User.findByPk(token._id)
                .then(user =>{
                    if(user){
                        user.verificado = true
                        user.save()
                        res.status(200).json({
                            message: 'Cuenta verificada!!'
                        })
                    }else{
                        res.status(400).json({
                            message: 'Usuario no encontrado'
                        })
                    }                    
                })
                .catch(err =>{
                    res.status(500).json({
                        message: err.message
                    })
                })

            }else{                
                res.status(400).json({
                    message: 'Usuario no encontrado con ese token'
                })
            }
        })
    }    
}