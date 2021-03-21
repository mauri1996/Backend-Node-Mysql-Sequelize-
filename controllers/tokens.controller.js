const db = require('../models')
const User = db.users
const Token =db.tokens
const bcrypt = require('bcrypt')

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
    },
    getToken:(req,res)=>{

        if(!req.body.correo || !req.body.password){
            res.status(400).json({
                message: 'Correo/contraseña no debe ser vacio'
            })
        }else{
            User.findOne({
                where:{
                    correo: req.body.correo,                
                },
                include: Token
            }).then(user =>{
                if(user){
                    if(bcrypt.compareSync(req.body.password,user.password)){

                        if(user.verificado){
                            res.status(200).json({
                                user: user.nombre,
                                token: user.Token.token
                            })
                        }else{
                            res.status(400).json({
                                message: 'Usuario no verificado'
                            })
                        }

                        
                    }else{  
                        res.status(400).json({
                            message: 'Contraseña incorrecta'
                        })
                    }
                }else{
                    res.status(400).json({
                        message: 'Correo incorrecto'
                    })
                }
            })
        }
          
    }

}