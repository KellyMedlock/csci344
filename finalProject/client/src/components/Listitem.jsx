import React from "react";

export default function Listitem({ setPageType, setSelectedCharacterId, character }) {
    function showCharacterSheet() {
        setSelectedCharacterId(character.id);
        setPageType("CharacterView");
    }

    return (
        <button onClick={showCharacterSheet} className="w-full h-24 grid grid-cols-[96px_1fr] md:grid-cols-[96px_1fr_96px] hover:z-10 hover:shadow-md shadow-[#18191A80] transition-shadow duration-50 ease-in text-[#091519] cursor-pointer">
            <img src="#" alt="Class Logo" className="h-24 w-24 col-start-1 col-end-2 border-r border-b" />
            <div className="col-start-2 col-end-3 flex flex-col md:flex-row">
                <div className="h-full w-full col-start-2 col-end-3 md:border-r flex justify-center items-center bg-[#DAE1E3] border-b z-0 text-lg md:text-3xl"><p>{character.character_name}</p></div>
                <div className="h-full w-full col-start-3 col-end-4 md:border-r flex justify-center items-center bg-[#DAE1E3] border-b z-0 text-lg md:text-3xl"><p className="capitalize">{character.race} {character.class_dnd}</p></div>
            </div>
            <div className="hidden h-24 w-24 col-start-3 col-end-4 md:flex justify-center items-center border-b bg-[#C3C8C9]">
                <svg className="w-10 h-10" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    {/* <defs>
                        <style>
                        .cls-1 {
                            fill: none;
                            stroke: #000;
                            stroke-linejoin: round;
                            stroke-width: 3.06px;
                        }
                        </style>
                    </defs> */}
                    <polygon className="fill-none stroke-[#397C93] stroke-[3px] [stroke-linecap:round] [stroke-linejoin:round]" points="25.83 13.57 38.45 15.44 29.65 24.67 31.78 37.24 20.28 31.74 8.98 37.64 10.66 25 1.55 16.08 14.1 13.78 19.77 2.36 25.83 13.57"/>
                </svg>
            </div>
        </button>
    );
}