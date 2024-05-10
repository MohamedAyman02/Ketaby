import { deserialize } from "v8";
import bookModel from "../models/bookModel.js";
import fs from "fs"

//add book item
const addBook = async (req,res)=>{
    let image_filename =`${req.file.filename}`;
    const book = new bookModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename

    })
    try{
        await book.save();
        res.json({success: true, message:"Book Added"})

    } catch(error){
    
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//all book list
const listBook = async(req,res) =>{

    try{
        const books = await bookModel.find();
        res.json({success: true, data: books});
    } catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//remove book item
const removeBook = async(req,res) =>{
    try{
        const book = await bookModel.findById(req.body.id);
        fs.unlink(`uploads/${book.image}`,() =>{})
        await bookModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Book Removed"})

    } catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {addBook,listBook,removeBook}