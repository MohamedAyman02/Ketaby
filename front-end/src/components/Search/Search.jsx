import React, { useState, useEffect, useContext } from 'react';
//import { StoreContext } from '../../context/StoreContext';
import'./Search.css'
const SearchFeature= ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term.trim()); // Trim whitespace from the search term and pass it to the parent component
    };

    return (
        <div className="search-form">
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};


export default SearchFeature;
