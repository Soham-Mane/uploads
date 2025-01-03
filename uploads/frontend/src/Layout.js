// src/Layout.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './styles.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IoMdSunny } from "react-icons/io";
const Layout = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('dark-mode');
        if (savedTheme) {
            setDarkMode(JSON.parse(savedTheme));
            document.body.classList.toggle('dark-mode', JSON.parse(savedTheme));
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', JSON.stringify(!darkMode));
    };

    return (
        <div>
            <header>
            <button onClick={toggleDarkMode} className="p-2 rounded-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                {darkMode ? (
                    <IoMdSunny className="text-yellow-400 text-xl" />
                ) : (
                    <IoMdSunny className="text-gray-800 text-xl" />
                )}
            </button>
            </header>
            <main>
                <Outlet /> {/* Render other pages here */}
            </main>
        </div>
    );
};

export default Layout;
