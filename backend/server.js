 import express from "express"
 import cors from "cors"
import { connectDB } from "./config/db.js"
import bookRouter from "./routes/bookRoute.js"

//app configuration

 const app = express()
 const port = 4000

 //middleware
 app.use(express.json())
 app.use(cors())

//db connection
connectDB();

//api endpoint
app.use("/api/book",bookRouter)
app.use("/images",express.static('uploads'))

 app.get("/", (req,res)=>{
    res.send("API WORKING")
 })

 app.listen( port, ()=>{
    console.log(`"server statted on http://localhost:${port}"`) 
 })

