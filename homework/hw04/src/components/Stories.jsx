import React, {useEffect, useState} from "react";
import { getDataFromServer } from "../server-requests.jsx";

export default function Stories({ token }) {
    const [stories, setStories] = useState([]);

    async function getStories() {
        const stories = await getDataFromServer(
            token,
            "https://photo-app-secured.herokuapp.com/api/stories/"
        );

        const storiesInfo = stories.map((story) => ({
            username: story.user.username,
            profileImg: story.user.thumb_url
        }));

        setStories(storiesInfo);
    }

    useEffect(() => {
        getStories()
    }, [token]);
    
    return (
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
            {stories.map((story, index) => (
                <div className="flex flex-col justify-center items-center" key={index}>
                    <img src={story.profileImg} className="rounded-full border-4 border-gray-300 max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px]" alt="profile image" />
                    <p className="text-xs text-gray-500">{story.username}</p>
                </div>
            ))}
        </header>
    );
}
