import React from 'react'
import { Link } from 'react-router-dom';
import {NavMenu} from '../router/navmenu';
import logo from '../img/logo.png';
import '../App.css'; 


export default function Header()
{
    return (
    <div className="container">
            <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
            </Link>
        <br />
            <NavMenu />

    </div>
    );
}
 //</Link>
