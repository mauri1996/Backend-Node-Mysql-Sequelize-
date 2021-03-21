const nodemailer = require('nodemailer') // produccion

let mailConfig;


if (process.env.NODE_ENV === 'production'){
    console.log('Produccion papu')

}else{
    const options = {
        host: process.env.ethereal_host,
        port: process.env.ethereal_port,
        auth: {
            user: process.env.ethereal_user,
            pass: process.env.ethereal_pwd
        }        
    }
    mailConfig= options
}

module.exports = nodemailer.createTransport(mailConfig)