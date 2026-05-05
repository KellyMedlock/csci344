import React, { useState } from "react";
import { clearToken } from "../tokenStorage.js";

export default function Navbar({ hasToken, setHasToken }) {
    function logOut() {
        clearToken();
        setHasToken(false);
    }

    return (
        <header className="w-full h-28 bg-linear-to-r from-[#397C93] to-[#4BA9C9] flex items-center px-5 md:px-12 justify-between shadow-lg shadow-[#18191A80] text-[#091519]">
            <img src="#" alt="Logo" className="h-20 w-20 border" />
            <ul className="flex gap-3 md:gap-6 md:text-2xl">
                <li>Username</li>
                <li><button onClick={logOut} className="cursor-pointer">Logout</button></li>
            </ul>
        </header>
    );
}