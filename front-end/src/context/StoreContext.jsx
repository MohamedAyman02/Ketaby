import { createContext, useContext, useEffect } from "react";
import { booklist } from "../assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider =(props)=>{


    const [cartItems,setCartItems]=useState({});

    // const {getTotalCartAmount}=useContext(StoreContext);
    const addToCart = (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

   const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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

    const ContextValue={
        booklist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount


    }


   return(

    <StoreContext.Provider value={ContextValue}>
        {props.children}
    </StoreContext.Provider>
   )





}

export default StoreContextProvider;
