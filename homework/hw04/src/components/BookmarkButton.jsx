import React, {useState} from "react";
import {postDataToServer, deleteDataFromServer} from "../server-requests";

export default function BookmarkButton({ post, token }) {
    const [bookmarkID, setBookmarkID] = useState(post.current_user_bookmark_id);
    
    async function unBookmark() {
        // console.log("deleting bookmark...")
        const response = await deleteDataFromServer(
            token,
            "https://photo-app-secured.herokuapp.com/api/bookmarks/" + bookmarkID
        )

        setBookmarkID(undefined);
    }

    async function bookmark() {
        // console.log("creating bookmark...")
        const sendData = {
            "post_id": post.id
        }

        const response = await postDataToServer(
            token,
            "https://photo-app-secured.herokuapp.com/api/bookmarks/",
            sendData
        ) 

        setBookmarkID(response.id);
    }

    if (bookmarkID !== undefined) {
        return (
            <button onClick={unBookmark} aria-label="bookmark button">
                <i className="fas fa-bookmark"></i>
            </button>
        );
    } else {
        return (
            <button onClick={bookmark} aria-label="bookmark button">
                <i className="far fa-bookmark"></i>
            </button>
        );
    }
}