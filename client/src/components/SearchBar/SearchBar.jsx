import React from "react";
import DropDownBar from "../DropDownBar/DropDownBar";
import "./SearchBar.css"


const SearchBar = ({filterText, typeFilter, onFilterTextChange, onSetTypeFilterChange}) => {

    return (
      <div className="search-bar">
        <form key = {"searchBar"} onSubmit={e => {
            e.preventDefault();
          }}>
            <input 
            key={"searchBarInput"}
            type="text" 
            value={filterText}
            placeholder="Search..." 
            onChange={(newText) => onFilterTextChange(newText.target.value)}
            />
            <DropDownBar typeFilter={typeFilter} onSetTypeFilterChange={onSetTypeFilterChange}/>
          </form>
      </div>
    );
  }

  export default SearchBar;
  