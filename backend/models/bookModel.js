import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    name:{type:"string",required:true},
    description:{type:"string",required:true},
    price:{type:"number",required:true},
    category:{type:"string",required:true},
    image:{type:"string",required:true},
});

const bookModel = mongoose.models.book || mongoose.model("book",bookSchema);


export default bookModel;