import React, {useEffect, useState} from "react";
import { getDataFromServer } from "../server-requests.jsx";

export default function Profile({ token }) {
    const [imgURL, setImgURL] = useState(null);
    const [username, setUsername] = useState("");
    
    async function getProfileData() {
            const response = await getDataFromServer(
                token,
                "https://photo-app-secured.herokuapp.com/api/profile/"
            )
            setImgURL(response.thumb_url);
            setUsername(response.username);
        }


    useEffect(() => {getProfileData()}, [token]);
    
    return (
        <header className="flex gap-4 items-center">
            <img src={imgURL} className="rounded-full w-16" alt="profile image"/>
            <h2 className="font-Comfortaa font-bold text-2xl">{username}</h2>
        </header>
    );
}
