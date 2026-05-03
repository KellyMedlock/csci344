import React, { useState, useEffect } from "react";
import Listitem from "./Listitem";
import Addlistitem from "./Addlistitem";
import {getCharacters} from "../api.js";

export default function Listview({ setPageType }) {
    const [userCharacters, setUserCharacters] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await getCharacters();
            console.log(data);
            setUserCharacters(data);
        }
        getData();
    }, []);

    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden pb-6">
            {userCharacters.map((character, index) => (
                <Listitem setPageType={setPageType} character={character} key={index} />
            ))}
            <Addlistitem setPageType={setPageType} />
        </div>
    );
}