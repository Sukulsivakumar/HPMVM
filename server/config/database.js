const mongoose = require('mongoose');

const connectDataBase = ()=>{
    mongoose.connect(process.env.DB_URL).then(con =>{
        console.log(`MongoDb Database connected with Host: ${con.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDataBase;