import orederModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing  user order for fronted
const placeOrder = async (req, res) => {
    const frontend_url="http://localhost:5173";
    try {
        const newOrder = new orederModel(
            {
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address// data that get from input
            }
        )
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                    images: [item.images]
                },
                unit_amount: item.price *100
            },
            quantity: item.quantity
        
      }))
      line_items.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: "Delivry charges",
            images: ["https://i.imgur.com/EHyR2nP.png"]
          },
          unit_amount: 2000
        },
        quantity: 1
      })
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
      })
      res.json({ success: true, session_url:session.url})
}
  catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}

const verifyOrder = async(req,res)=>{
  const {orderId,success} =req.body;
try {
  if (success=="true") {
    await orederModel.findByIdAndUpdate(orderId,{payment:true});
    res.json({success:true,message:"Paid"})
  }
  else{
    await orederModel.findByIdAndDelete(orderId);
    res.json({success:false,message:"Not Paid"})
  }
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}
//User Order
const userOrders = async (req,res)=>{
  try{
    const orders = await orederModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  }  catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

//Listing orders for Admin Panel
const listOrders = async(req,res)=>{
  try {
    const orders = await orederModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

//api for updating status
const updateStatus = async(req,res) =>{
  try {
      await orederModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,message:"status updated"})
  } catch (error) {
      console.log(error);
      res.json({success:false,mesage:"Error"});
  }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus}