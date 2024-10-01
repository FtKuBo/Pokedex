import React from "react";
import { Link } from "react-router-dom"
import BaseTotal, {formatPokemonName} from "../../utils/util"
import "./PokemonRow.css";

const PokemonRow = ({ pokemonId, pokemonName, pokemonType, pokemonBase }) => {
    const image =`https://img.pokemondb.net/artwork/${formatPokemonName(pokemonName.english)}.jpg`;
    return (
      <>
        <tr className="row">
          <td><img className="avatar" src={image} alt="HIIIIII"/> {pokemonId}</td>
          <td><Link to={`/pokemon/${pokemonId}`}>{pokemonName.english}</Link></td>
          <td>{pokemonType.map((type, index)=>(
            <span key={index}>{type}</span>
          ))}</td>
          <td>{BaseTotal(pokemonBase)}</td>
          <td>{pokemonBase.HP}</td>
          <td>{pokemonBase.Attack}</td>
          <td>{pokemonBase.Defense}</td>
          <td>{pokemonBase.spAttack}</td>
          <td>{pokemonBase.spDefense}</td>
          <td>{pokemonBase.Speed}</td>
        </tr>
      </>
    );
  }

  export default PokemonRow;