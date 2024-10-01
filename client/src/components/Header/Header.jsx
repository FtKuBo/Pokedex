import React from "react";
import { Link } from 'react-router-dom'
import "./Header.css";

const Header = () => {
    return (
        <nav>
            <Link to="/" className="site-title">
            POKEDEX
            </Link>
        </nav>
    )
}

export default Header;