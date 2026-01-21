import fs from 'fs';
import UserModel from "../models/User.model.js";
import attendanceModel from '../models/attendance.model.js';
import { compareFaces } from '../CompareFace/index.js'


const addUser = async (req, res) =>{
    
    const {name , email } = req.body;

    const existedUser = await UserModel.findOne({email});

    if(existedUser){
        fs.unlinkSync(req.file.path)
        return res.send("User already exist !!")
    }

    const imagePath = await req.file.path;

    await UserModel.create({
        name,
        email,
        imagePath
    })

    return res.send("User created");
}

const Attendance = async(req , res) => {

    const { email } = req.body;

    const existedUser = await UserModel.findOne({email});


    if(!existedUser){
        fs.unlinkSync(req.file.path);
        return res.send("Email is not resister");
    }
    
    const bool = true;

    // const bool = await compareFaces( existedUser.imagePath,req.file.path);

    if(!bool){
        fs.unlinkSync(req.file.path);
        return res.send("User face not detected");
    }

    await attendanceModel.create({
        userId: existedUser._id,
        date: new Date(),
        status: "PRESENT",
        imagePath: req.file.path
    })

    return res.send("Presend");

}

export { addUser  , Attendance}