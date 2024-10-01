import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterableTable from "./components/FilterableTable/FilterableTable"
import PokemonPage from "./components/PokemonPage/PokemonPage";


export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FilterableTable/>} />
          <Route path="/pokemon/:id" element={<PokemonPage/>} />
        </Routes>
      </Router>
    </>
  )
}
