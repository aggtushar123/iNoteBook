const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = async () =>{
   try {
    mongoose.connect(mongoURI)
        console.log("Connected to Mongo Successfully");
    }
    catch(error){
        console.log(error);
    }
   } 


module.exports = connectToMongo;