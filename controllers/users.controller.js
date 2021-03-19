const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op
const bcrypt = require('bcrypt')
const saltRounds=10

module.exports = {
    list: (req,res)=>{
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
    },
    create: (req,res)=>{
        if(!req.body.nombre || !req.body.apellido || !req.body.correo || !req.body.password ||!req.body.cedula){
            res.status(400).json({
                message: 'Conent can not be empty'
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
                res.send(data)
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