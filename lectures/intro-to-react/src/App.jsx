import React from "react";
import Profile from "./Profile.jsx";

export default function App() {
    const people = [
        {
            name: "Kelly",
            image_url: "https://picsum.photos/id/216/100/100"
        },
        {
            name: "Jack",
            image_url: "https://picsum.photos/id/217/100/100"
        },
        {
            name: "Myra",
            image_url: "https://picsum.photos/id/218/100/100"
        },
        {
            name: "Ben",
            image_url: "https://picsum.photos/id/219/100/100"
        }
    ]

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>

            <main>
                <Profile name="Ben" picture="https://picsum.photos/id/216/100/100"/>
                <Profile name="Kelly" picture="https://picsum.photos/id/217/100/100"/>
                <Profile name="Jack" picture="https://picsum.photos/id/218/100/100"/>
                <Profile name="Myra" picture="https://picsum.photos/id/219/100/100"/>
            </main>
        </>
    );
}