import React from 'react';
import './SearchBar.scss';

export const SearchBar = (props) => {

    return (
        <form className="search" onSubmit={props.handleSearch}>
            <input type="search" placeholder="Type in your favorite movie genre..." onChange={props.handleInput} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;