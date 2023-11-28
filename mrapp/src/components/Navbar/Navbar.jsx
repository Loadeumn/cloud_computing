import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TapeIcon, HomeIcon, MenueIcon, PlusIcon } from '../Icons/Icons'
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="menu-button">
                        <MenueIcon />
                        Menu
                    </button>
                    {isOpen && (
                        <div className="dropdown-content">
                            <ul>
                                <li>
                                    <Link to="/home"><HomeIcon />Home</Link>
                                </li>
                                <li>
                                    <Link to="/add-movie"><PlusIcon /> Movie</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/home" className='logo'> <TapeIcon /> Movie Review <TapeIcon /></Link>
            </div>
        </nav>
    );
};

export default Navbar;
