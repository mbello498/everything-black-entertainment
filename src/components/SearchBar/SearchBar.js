import React from 'react';
import "./SearchBar.scss";

export const SearchBar = (props) => {
    return (
        <form className="search">
            <input onChange={props.handleInput} type="search" placeholder="Search here..." required/>
            <button type="submit" onClick={props.handleSearch}>Search</button>
        </form> 
    );
}