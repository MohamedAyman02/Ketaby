import React, { useState } from 'react';
import './Filter.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import BookItem from '../BookItem/BookItem';
import SearchFeature from '../Search/Search';

const Filter = () => {
    const { booklist } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredBooks = booklist.filter((item) =>
        searchTerm === '' ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className='book-display' id='book-display'>
            
            <div className="search-filter">
                <SearchFeature onSearch={handleSearch} />
            </div>
            <div className="book-display-list">
                {filteredBooks.map((item, index) => (
                    <BookItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
}

export default Filter;
