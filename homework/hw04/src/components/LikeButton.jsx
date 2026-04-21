import React, {useState} from "react";
import {postDataToServer, deleteDataFromServer} from "../server-requests";

export default function LikeButton({ post, token }) {
    const [likeID, setLikeID] = useState(post.current_user_like_id);
    
    async function unlike() {
        const response = await deleteDataFromServer(
            token,
            "https://photo-app-secured.herokuapp.com/api/likes/" + likeID
        )

        setLikeID(undefined);
    }

    async function like() {
        const sendData = {
            "post_id": post.id
        }

        const response = await postDataToServer(
            token,
            "https://photo-app-secured.herokuapp.com/api/likes/",
            sendData
        )

        setLikeID(response.id)
    }

    if (likeID !== undefined) {
        return (
            <button onClick={unlike} aria-label="like button"><i className="fas fa-heart text-red-600"></i></button>
        );
    } else {
        return (
            <button onClick={like} aria-label="like button"><i className="far fa-heart"></i></button>
        );
    }
}