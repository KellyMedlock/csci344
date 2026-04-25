import React from "react";

export default function Navbar() {
    return (
        <header className="w-full h-28 bg-linear-to-r from-[#397C93] to-[#4BA9C9] flex items-center px-12 justify-between shadow-lg shadow-[#18191A80] text-[#091519]">
            <img src="#" alt="Logo" className="h-20 w-20 border" />
            <ul className="flex gap-6 text-2xl">
                <li>Username</li>
                <li><button className="cursor-pointer">Logout</button></li>
            </ul>
        </header>
    );
}