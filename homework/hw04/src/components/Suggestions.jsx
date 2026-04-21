import React, {useEffect, useState} from "react";
import { getDataFromServer } from "../server-requests.jsx";
import Suggestion from "./Suggestion.jsx";

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions() {
        const suggestionResponse = await getDataFromServer(
            token,
            "https://photo-app-secured.herokuapp.com/api/suggestions/"
        );

        const suggestionInfo = suggestionResponse.map((suggestion) => ({
            username: suggestion.username,
            profileImg: suggestion.thumb_url
        }));

        setSuggestions(suggestionInfo);
    }

    useEffect(() => {
        getSuggestions()
    }, [token]);
    
    return (
        <div className="mt-4">
            <p className="text-base text-gray-400 font-bold mb-4">
                Suggestions for you
            </p>

            {suggestions.map((suggestion, index) => <Suggestion suggestion={suggestion} key={index} />)}
        </div>
    );
}
