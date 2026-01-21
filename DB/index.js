import mongoose from "mongoose";

const ConnectDB = async () =>{
    try{
        const DBinstance = await mongoose.connect(`${process.env.DBstring}/task`);
        console.log(`\n Mongodb connect !! DB Host: ${DBinstance.connection.host} `)

    }catch(err){
        console.log("Connection failed from DB",err);
        throw err;
    }
}

export default ConnectDB