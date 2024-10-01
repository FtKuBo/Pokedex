import React from "react";
import {gql, useQuery} from "@apollo/client";
import "./TypeTable.css";

const TypeTable = ({pokemonType}) => {
    const typeArgument = [];

    pokemonType.forEach(type => {
        typeArgument.push("\""+type+"\"");
    }) 

    const GET_TYPE_DATA = gql`
        {
            type(name:[${typeArgument}]){
                english,
                effective,
                ineffective,
                no_effect
            }
        }
    `;
    const headers = [{
        id : 1,
        KEY : "english",
        LABEL : "Type"
      },
      {
        id : 2,
        KEY : "effective",
        LABEL : "Effective Types"
      },
      {
        id : 3,
        KEY : "ineffective",
        LABEL : "Ineffective Types"
      },
      {
        id : 4,
        KEY : "no_effect",
        LABEL : "No Effect Types"
      },
    ];

    const { loading, error, data } = useQuery(GET_TYPE_DATA);
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    const dataType = data.type;
    var rowId = 0;
    //pokemon's types data table
    return(
        <div className="dataTableContainer">
            <table>
                <tbody>
                    {headers.map((header) => (
                    <tr key={header.id}>
                        <td>{header.LABEL}</td>
                        <td>{dataType.map((typeArray)=>{
                            if(typeArray[header.KEY].constructor === Array){
                                return(
                                    typeArray[header.KEY].map((type)=> (
                                        <span key={rowId++}>{type}</span>
                                    ))
                                )
                            };
                            return (<span key={rowId++}>{typeArray[header.KEY]}</span>)
                            })}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TypeTable;