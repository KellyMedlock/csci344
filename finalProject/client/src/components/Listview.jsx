import React, { useState, useEffect } from "react";
import Listitem from "./Listitem";
import Addlistitem from "./Addlistitem";
import {getCharacters} from "../api.js";

export default function Listview({ setPageType, setSelectedCharacterId }) {
    const [userCharacters, setUserCharacters] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await getCharacters();
            // console.log(data);
            setUserCharacters(data);
        }
        getData();
    }, []);

    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden pb-6">
            {userCharacters.map((character) => (
                <Listitem 
                    setPageType={setPageType}
                    setSelectedCharacterId={setSelectedCharacterId} 
                    character={character} 
                    key={character.id} />
            ))}
            <Addlistitem setPageType={setPageType} />
        </div>
    );
}