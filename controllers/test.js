const Usuario = require('../models/users')

module.exports = {
    list: function(req,res,next){

        //await Usuario.listAllUser(req,)

        db.getBase().query(`SELECT * FROM baseOp.usuarios`, function(err,rows,fields){
            if(err) throw err;
            res.status(200).json({
                rows
            })
        })                
    },
    create: function(req,res,next){
        console.log(req.body)        
        db.getBase().query(`
            INSERT INTO baseOp.usuarios 
            (Cedula, Nombre, Apellido, Correo, Password, id) 
            VALUES ('${req.body.cedula}', '${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.password}', NULL);                        
            `, function(err,rows,fields){
                if(err) throw err;
                console.log(req.body)
                res.status(200).json({mensaje:'Creado con exito.!!'})
        })        
    }

}