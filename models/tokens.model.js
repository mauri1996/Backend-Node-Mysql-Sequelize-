

module.exports =(sequelize, DataTypes)=> {
    const Token = sequelize.define("Tokens" , {        
        token:{
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: false
        }
    },{});

    Token.associate = (models)=>{        
        Token.belongsTo(models.users,{
            foreignKey:{
                name: '_id',                
            }
        })
    }
       
    return Token

}