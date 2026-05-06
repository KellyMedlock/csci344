import React, { useState } from "react";
import { clearToken, getUsername } from "../tokenStorage.js";
import Logo from "../assets/Logo.png";

export default function Navbar({ hasToken, setHasToken }) {
    const username = getUsername()

    function logOut() {
        clearToken();
        setHasToken(false);
    }

    return (
        <header className="w-full h-28 bg-linear-to-r from-[#397C93] to-[#4BA9C9] flex items-center px-5 md:px-12 justify-between shadow-lg shadow-[#18191A80] text-[#091519]">
            <img src={Logo} alt="Logo" className="h-20 w-20" />
            <ul className="flex gap-3 md:gap-6 md:text-2xl">
                <li>{username}</li>
                <li><button onClick={logOut} className="cursor-pointer hover:text-[#DAE1E3]">Logout</button></li>
            </ul>
        </header>
    );
}