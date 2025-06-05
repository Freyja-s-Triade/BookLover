import { NavLink } from "react-router";
import { useState } from "react";

import logo from "@src/assets/icons/logo.svg";

interface HeaderProps {
    className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
    // useState to manage the display of the burger menu
    const [isOpen, setIsOpen] = useState(false);

    // change the display of the burger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`p-4 ${className}`}>
            {/* logo */}
            <a href="/" className="logo">
                <img src={logo} alt="Logo BookLover" />
            </a>

            {/* burger menu */}
            <nav>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button onClick={toggleMenu}>
                    {isOpen ? (
                        // cross icon
                        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <line x1="10" y1="10" x2="40" y2="40" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                            <line x1="40" y1="10" x2="10" y2="40" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    ) : (
                        // menu burger icon
                        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <path d="M5 8A2 2 0 1 0 5 12L45 12A2 2 0 1 0 45 8L5 8zM5 23A2 2 0 1 0 5 27L45 27A2 2 0 1 0 45 23L5 23zM5 38A2 2 0 1 0 5 42L45 42A2 2 0 1 0 45 38L5 38z" />
                        </svg>
                    )}
                </button>

                {/* links are displayed on click on the burger menu */}
                {isOpen && (
                    <ul className="flex flex-col text-right">
                        <li>
                            <NavLink to="lists" className="nav-links">
                                Mes listes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="tags" className="nav-links">
                                Tags
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="account" className="nav-links">
                                Mon compte
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
