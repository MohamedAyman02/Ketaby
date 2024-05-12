import React from 'react'
import './BookDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import BookItem from '../BookItem/BookItem'
import Filter from '../SearchFilter/Filter'
const BookDisplay = ({category}) => {

    const{booklist}=useContext(StoreContext)
  return (
    <div className='book-display' id='book-display'>
      <h2>Top Books</h2>
      <div className="book-display-list">
        {booklist.map((item,index)=>{
        if (category==="All" || category===item.category) {
            return <BookItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            
        }
        
        })}
      </div>
    </div>
  )
}

export default BookDisplay