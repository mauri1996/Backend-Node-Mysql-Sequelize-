const User = require('./users.model')

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
    // Token.associate = function (models) {
    //     // associations can be defined here
    //     Token.belongsToMany(models.Users, {
    //       through: 'users',
    //       as: 'usuarios',
    //       foreignKey: 'TokenId',
    //     });
    //   };
    // Token.associate = (models)=>{
    //     console.log('entro------------------')
    //     Token.belongsTo(models.User,{
    //         foreignKey:{
    //             allowNull:false
    //         }
    //     })
    // }
       
    return Token

}