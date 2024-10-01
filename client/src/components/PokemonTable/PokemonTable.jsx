import React, { useState, useEffect } from "react";
import PokemonRow from "../PokemonRow/PokemonRow";
import {getSortedTableData} from "../../utils/util";
import { TablePagination } from '@mui/material';
import "./PokemonTable.css";

const PokemonTable = ({ data, filterText, typeFilter }) => {
  //getting data from localstorage
    const [sortCol, setSort] = useState(() => {
      const savedSortData = localStorage.getItem("SortData");
      return savedSortData ? JSON.parse(savedSortData) : {key: "id", direction:"asc"}
    });  //Sorting column and direction
    const [Indexpage, setPage] = useState(() => {
      const savedIndex = localStorage.getItem("Index");
      return savedIndex ? JSON.parse(savedIndex) : 0
    });  // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(() => {
      const savedNumRows = localStorage.getItem("NumRows");
      return savedNumRows ? JSON.parse(savedNumRows) : 50
    });  // Number of rows per page

    useEffect(() => {
        localStorage.setItem("SortData", JSON.stringify(sortCol));
      }, [sortCol]);

    useEffect(() => {
        localStorage.setItem("Index", JSON.stringify(Indexpage));
      }, [Indexpage]);

    useEffect(() => {
        localStorage.setItem("NumRows", JSON.stringify(rowsPerPage));
      }, [rowsPerPage]);
    
    const rows = [];
    const filter = [];
    const headers = [{
        id : 1,
        KEY : "id",
        LABEL : "#"
      },
      {
        id : 2,
        KEY : "name.english",
        LABEL : "Name"
      },
      {
        id : 3,
        KEY : "type",
        LABEL : "Type"
      },
      {
        id : 4,
        KEY : "Total",
        LABEL : "Total"
      },
      {
        id : 5,
        KEY : "base.HP",
        LABEL : "HP"
      },
      {
        id : 6,
        KEY : "base.Attack",
        LABEL : "Attack"
      },
      {
        id : 7,
        KEY : "base.Defense",
        LABEL : "Defense"
      },
      {
        id : 8,
        KEY : "base.spAttack",
        LABEL : "Sp. Atk"
      },
      {
        id : 9,
        KEY : "base.spDefense",
        LABEL : "Sp. Def"
      },
      {
        id : 10,
        KEY : "base.Speed",
        LABEL : "Speed"
      }
    ];

    typeFilter.forEach(item => {
      filter.push(item.value)
    })

    //sorts the table based on columns
    var sortedTableData = getSortedTableData([...data.pokemons], sortCol);

    sortedTableData.forEach(item => {
      if(item.name.english.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
        return ; // filters the table with the search bar
      }
      if(JSON.stringify(item.type) !== JSON.stringify(filter) && filter.length > 0){
        return ; // filters the table with the selected types
      }
      
      rows.push(
      <PokemonRow key={item.id}
        pokemonId={item.id}
        pokemonName={item.name}
        pokemonType={item.type}
        pokemonBase={item.base}
      />
    )
    })

    function handleChangePage(event, newPage){
      setPage(newPage);
    }

    function handleChangeRowsPerPage(event){
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);  // Resets the table to the first page whenever rows per page changes
 }; 

    function handleHeaderClick(header){
      setSort({
        key: header.KEY,
        direction:
          header.KEY === sortCol.key ? sortCol.direction === "asc" ? "desc" : "asc" : "desc"
      })
    }

    return (
      <>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}> 
                  <span className="header-column" onClick={() => handleHeaderClick(header)}>
                    {header.LABEL}
                    {
                    header.KEY === sortCol.key
                    &&
                    <span>{sortCol.direction === "asc" ? "▲" : "▼"}</span>
                    }
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(Indexpage * rowsPerPage, Indexpage * rowsPerPage + rowsPerPage)}
          </tbody>
        </table>
        <TablePagination
          component={"div"}
          className="table-pagination"
          count={rows.length}
          page={Indexpage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} // Rows per page options
        />
      </>
    );
  }
  
  export default PokemonTable;