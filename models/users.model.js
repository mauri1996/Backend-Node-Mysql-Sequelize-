module.exports = (sequelize, DataTypes)=> {
    const User = sequelize.define("Users" , {
        cedula:{
            type: DataTypes.STRING,
            allowNull: false            
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false,
            isEmail:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },{})
    
    User.associate = (models) =>{
        
        User.hasOne(models.tokens,{
            onDelete: "cascade",            
            foreignKey:{
                name: '_id',
                allowNull: false,
            }            
        })
    }    

    return User

}