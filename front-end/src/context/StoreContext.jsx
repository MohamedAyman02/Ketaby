import axios from "axios";
import { createContext, useContext, useEffect } from "react";
//import { booklist } from "../assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider =(props)=>{


    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const[token,setToken]=useState("")
    const[booklist,setBooklist]=useState([])
    // const {getTotalCartAmount}=useContext(StoreContext);
    const addToCart = async(itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

   const removeFromCart=async(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
   }

   const loadCartData = async(token)=>{
     const response=await axios.post("/api/cart/get",{},{headers:{token}})
     setCartItems(response.data.cartData)
   }

//    useEffect(()=>{
//     console.log(cartItems)
//    },[cartItems])

const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
        let itemInfo=booklist.find((product)=>product._id===item);
        totalAmount+=itemInfo.price*cartItems[item];
    }
    return totalAmount;
}

const fetchBooklist=async()=>{
    const response=await axios.get(url+"/api/book/list")
    setBooklist(response.data.data)
}
   useEffect(()=>{
    async function loadData(){
        await fetchBooklist();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
    }
    loadData();
   },[])
   
    const ContextValue={
        booklist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    }


   return(

    <StoreContext.Provider value={ContextValue}>
        {props.children}
    </StoreContext.Provider>
   )





}

export default StoreContextProvider;
