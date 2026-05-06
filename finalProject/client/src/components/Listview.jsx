import React, { useState, useEffect } from "react";
import Listitem from "./Listitem";
import Addlistitem from "./Addlistitem";
import { getCharacters, getFavorites } from "../api.js";

export default function Listview({ setPageType, setSelectedCharacterId }) {
    const [userCharacters, setUserCharacters] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

    useEffect(() => {
        async function getData() {
            const characterData = await getCharacters();
            const favoriteData = await getFavorites();

            setUserCharacters(characterData);
            setFavorites(favoriteData);
        }
        getData();
    }, []);

    function isFavorited(characterId) {
        return favorites.some((fav) => fav.character?.id === characterId);
    }

    const displayedCharacters = showOnlyFavorites ? userCharacters.filter((character) => isFavorited(character.id)) : userCharacters;

    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden pb-6">
            <button
                type="button"
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className="bg-white w-fit px-4 py-2 rounded-md m-4"
            >
                {showOnlyFavorites ? "Show All Characters" : "Show Favorites"}
            </button>
            {displayedCharacters.map((character) => (
                <Listitem 
                    setPageType={setPageType}
                    setSelectedCharacterId={setSelectedCharacterId} 
                    character={character}
                    isFavorite={isFavorited(character.id)}
                    key={character.id}
                />
            ))}
            <Addlistitem setPageType={setPageType} />
        </div>
    );
}