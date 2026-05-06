import React from "react";

export default function Addlistitem({ setPageType }) {
    function showCreateSheet() {
        setPageType("CreateView");
    }

    return (
        <button onClick={showCreateSheet} className="w-full h-24 border-b flex justify-center items-center bg-[#C3C8C9] text-7xl hover:shadow-md shadow-[#18191A80] cursor-pointer" type="button" aria-label="addCharacter">
            <div className="fill-[#397C93] cursor-pointer">
                <svg width={35} height={35} id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    <path d="M40,24.09s-5.95-1.16-17.23-1.33c.16,11.28,1.33,17.23,1.33,17.23h-8.18s1.21-5.95,1.38-17.23c-11.33.16-17.3,1.33-17.3,1.33v-8.18s5.97,1.22,17.3,1.38c-.16-11.32-1.38-17.3-1.38-17.3h8.18s-1.17,5.98-1.33,17.3c11.28-.17,17.23-1.38,17.23-1.38v8.18Z"/>
                </svg>
            </div>
        </button>
    );
}