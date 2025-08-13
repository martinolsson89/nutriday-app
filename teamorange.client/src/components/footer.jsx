
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { Instagram, Tiktok, Twitter, Youtube, Facebook } from 'react-bootstrap-icons';

export default function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">

                <div className="col-md-4 d-flex align-items-center">
                    <Link to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                </div>

         

                <div className="col-md-4 text-center text-light">
                    <h2>Länkar</h2>
                    <ul className="list-unstyled">
                        <li>
                            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '18px' }}>
                                Hem
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '18px' }}>
                                Matlistan
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '18px' }}>
                                Om oss
                            </Link>
                        </li>
                    </ul>
                </div>

            </footer>

            <div className="footer-info border-top pt-3">
                <span style={{ color: '#fff' }}>Copyright &copy; NutriDay Inc. Alla rättigheter förbehållna.</span>
                <button
                    className="btn btn-outline-light mt-2"
                    onClick={() => window.scrollTo(0, 0)}>
                    Till toppen
                </button>
            </div>
        </div>
    );
}

