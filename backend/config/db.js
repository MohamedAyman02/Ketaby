import mongoose from "mongoose";

export const connectDB =async ()=> {
    await mongoose.connect('mongodb+srv://greatstack:ta7iaty@cluster0.upnvt6s.mongodb.net/Project').then(()=>console.log("DB connected"));

}