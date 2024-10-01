import React from "react";
import { Link } from 'react-router-dom';
import {gql, useQuery} from "@apollo/client";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import TypeTable from "../TypeTable/TypeTable";
import BaseTotal, {formatPokemonName} from "../../utils/util";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./PokemonPage.css";

const PokemonPage = () => {
    const { id } = useParams(); 
    const nextPokemonId = parseInt(id, 10)+ 1;
    const prevPokemonId = parseInt(id, 10)- 1;
    const GET_POKEMON = gql`
    {
        pokemon(id:${id}){
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
    const { loading, error, data } = useQuery(GET_POKEMON);
    if (loading) return <LoadingPage/>;
    if (error) return `Error! ${error.message}`;
    const pokemonData = data.pokemon;

    const image =`https://img.pokemondb.net/artwork/${formatPokemonName(pokemonData.name.english)}.jpg`;

    return (
      <div className="page">
        <Header/>
        <div className="pokemonPage">
            <div className="pokemonPageHeader">
                <h1>{pokemonData.name.english}</h1> 
                <ul className="pokemonNav">
                    <li>
                    {prevPokemonId > 0 && <Link to={`/pokemon/${prevPokemonId}`}>{`◀ # ${prevPokemonId}`}</Link>}
                    </li>
                    <li>
                    {nextPokemonId <= 809 && <Link to={`/pokemon/${nextPokemonId}`}>{`# ${nextPokemonId} ▶`}</Link>}
                    </li>
                </ul>
            </div>
            <div className="pokemonInfo">
            <img src={image} alt=""/>
                <div className="pokemonData">
                    <strong>Pokemon Data</strong>
                    <ul>
                        <li>#  {pokemonData.id}</li>
                        <li>Type : {pokemonData.type.map((type, index)=>(
                            <span key={index}>{type}</span>
                        ))}</li>
                        <li>HP : {pokemonData.base.HP}<ProgressBar value={pokemonData.base.HP} minValue={1} maxValue={255}/></li>
                        <li>Attack : {pokemonData.base.Attack}<ProgressBar value={pokemonData.base.Attack} minValue={5} maxValue={181}/></li>
                        <li>Defense : {pokemonData.base.Defense}<ProgressBar value={pokemonData.base.Defense} minValue={5} maxValue={230}/></li>
                        <li>Sp.Atk : {pokemonData.base.spAttack}<ProgressBar value={pokemonData.base.spAttack} minValue={10} maxValue={173}/></li>
                        <li>Sp. Def : {pokemonData.base.spDefense}<ProgressBar value={pokemonData.base.spDefense} minValue={20} maxValue={230}/></li>
                        <li>Speed : {pokemonData.base.Speed}<ProgressBar value={pokemonData.base.Speed} minValue={5} maxValue={160}/></li>
                        <li>Total : {BaseTotal(pokemonData.base)}<ProgressBar value={BaseTotal(pokemonData.base)} minValue={175} maxValue={720}/></li>
                    </ul>
                </div>
            </div>
            <TypeTable pokemonType={pokemonData.type} />
        </div>
      </div>
    );
  };

  export default PokemonPage;
  