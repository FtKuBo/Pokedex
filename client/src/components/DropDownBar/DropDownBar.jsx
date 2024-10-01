import React from "react";
import {gql, useQuery} from "@apollo/client";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import "./DropDownBar.css";

function DropDownBar({typeFilter, onSetTypeFilterChange}) {
  const GET_TYPES = gql `
  {
      types{
          english
      }
  }
  `;
  const { loading, error, data } = useQuery(GET_TYPES);
  const animatedComponents = makeAnimated();
  const dataTypes = [];
  if (loading) return '';
  if (error) return `Error! ${error.message}`;
  
  data.types.map(item => {
      dataTypes.push({label: item.english, value: item.english})
    });
    return (
      <div className = "typeDrop"> 
      <Select 
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={dataTypes}
        defaultValue={typeFilter}
        isMulti
        onChange={(selectedValues) => onSetTypeFilterChange(selectedValues)}
        /> 
      </div>
    );
}

export default DropDownBar;