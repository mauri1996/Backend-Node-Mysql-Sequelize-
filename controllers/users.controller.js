const db = require('../models')
const User = db.users
const Token =db.tokens
const Op = db.Sequelize.Op
const bcrypt = require('bcrypt')
const saltRounds=10
const crypto = require('crypto')
const mailer= require('../service/mailer/mailer')

module.exports = {
    list: (req,res)=>{
        if(!req.params.token){
            res.status(400).json({
                message: 'Token requerido'
            })
        }else{
    
            Token.findOne({
                where:{
                    token:req.params.token
                }
            })
            .then(token => {
                if(token){
                    
                    User.findByPk(token._id)
                    .then(user=>{
                        if(user.verificado){
                            User.findAll({})
                            .then(users =>{
                                res.status(200).json({
                                    users
                                })
                            })
                            .catch(err =>{
                                res.status(500).json({
                                    message: err.message
                                })
                            })
                        }else{
                            res.status(400).json({
                                message: 'Usuario no verificado'
                            })
                        }
                    })
                                    
                }else{
                    res.status(400).json({
                        message: 'Token no valido'
                    })

                }
            })
        }        
    },
    create: (req,res)=>{
        if(!req.body.nombre || !req.body.apellido || !req.body.correo || !req.body.password ||!req.body.cedula){
            res.status(400).json({
                message: 'Content can not be empty'
            })
        }
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cedula: req.body.cedula,
            correo: req.body.correo,
            password: bcrypt.hashSync(req.body.password,saltRounds),            
        }

        User.create(user)
            .then(data =>{
                const token = {
                    _id: data.id,
                    token: crypto.randomBytes(16).toString('hex')
                }
                Token.create(token)
                .then(token =>{

                    const mailOptions={
                        from: 'no-reply@backend.com',
                        to: data.correo,
                        subject: 'Account Verification',
                        text: 'Hola,\n \n' + 'Please, to verify your account, click on the following link: \n\n'+ 'http://localhost:3000' + '\/api/token/validar\/'+token.token
                    }

                    mailer.sendMail(mailOptions, function(err){
                        if(err){
                            return console.log(err.message)
                        }
                        console.log('Mensaje enviado')
                    })

                    res.send({message: 'Usuario creado on exito'})
                })                
            })
            .catch(err =>{
                res.status(500).send({
                    meesage : err.message || "Error algo ocurrio"
                })
            })

    },
    findbyId: (req,res)=>{
        if (!req.params.id){
            res.status(400).json({
                message: 'id not defined'
            })
        }
        User.findByPk(req.params.id,{})
        .then(users =>{
            res.status(200).json({
                usuarios: users
            })
        })
        .catch(err =>{
            res.status(500).json({
                message: err.message
            })
        })
    }
    

}