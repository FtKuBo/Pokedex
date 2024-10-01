import React, { useState, useEffect } from "react";
import {gql, useQuery} from "@apollo/client";
import PokemonTable from "../PokemonTable/PokemonTable";
import SearchBar from "../SearchBar/SearchBar";
import Header from "../Header/Header";
import "./FilterableTable.css";
import LoadingPage from "../LoadingPage/LoadingPage";


const FilterableProductTable = () => {
  const GET_POKEMONS = gql`
    {
        pokemons{
            id,
            name{
                english
            },
            type,
            base{
                HP,
                Attack,
                Defense,
                spAttack,
                spDefense,
                Speed
            }
      }
    }
    `;
    const { loading, error, data } = useQuery(GET_POKEMONS);
    
    const [filterText, setFilterText] = useState(() => {
      return localStorage.getItem("filterText") || '';
    });
    const [typeFilter, setTypeFilter] = useState(() => {
      const savedTypeFilter = localStorage.getItem("typeFilter");
      return savedTypeFilter ? JSON.parse(savedTypeFilter) : [];
    });
    
    useEffect(() => {
      localStorage.setItem("filterText", filterText);
    }, [filterText]);
  
    useEffect(() => {
      localStorage.setItem("typeFilter", JSON.stringify(typeFilter));
    }, [typeFilter]);
  
    if (loading) return <LoadingPage/>;
    if (error) return `Error! ${error.message}`;
  
    return (
      <>
      <Header/>
        <div className="table">
          <SearchBar 
          filterText={filterText} 
          typeFilter={typeFilter}
          onFilterTextChange={setFilterText}
          onSetTypeFilterChange={setTypeFilter}
          />
          <PokemonTable data={data} filterText={filterText} typeFilter={typeFilter} />
        </div>
      </>
    );
  }

  export default FilterableProductTable;