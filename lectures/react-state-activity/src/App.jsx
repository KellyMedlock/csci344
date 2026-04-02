import React from "react";
import Carousel from "./Carousel";
import Gallery from "./Gallery";
import "./App.css";
import { useState } from "react";

const galleries = [
    {
        id: "nature",
        name: "Nature",
        photos: [
            "https://picsum.photos/id/190/600/430",
            "https://picsum.photos/id/127/600/430",
            "https://picsum.photos/id/140/600/430",
            "https://picsum.photos/id/141/600/430"
        ]
    },
    {
        id: "cities",
        name: "Cities",
        photos: [
            "https://picsum.photos/id/164/600/430",
            "https://picsum.photos/id/122/600/430",
            "https://picsum.photos/id/43/600/430",
            "https://picsum.photos/id/57/600/430"
        ]
    },
    {
        id: "animals",
        name: "Animals",
        photos: [
            "https://picsum.photos/id/40/600/430",
            "https://picsum.photos/id/169/600/430",
            "https://picsum.photos/id/200/600/430",
            "https://picsum.photos/id/219/600/430"
        ]
    }
];

export default function App() {
    const [currentGalleryID, setCurrentGalleryID] = useState(galleries[0].id);

    function getCurrentGallery(currentGalleryID) {
        for (let i = 0; i < galleries.length; i++) {
            if (galleries[i].id === currentGalleryID) {
                return galleries[i];
            }
        }
        return galleries[0];
    }

    const currentGallery = getCurrentGallery(currentGalleryID);

    return (
        <div>
            <h1>{currentGallery.name} Photo Carousel</h1>
            <Gallery galleries={galleries}  currentGalleryID={currentGalleryID} onSelectGallery={setCurrentGalleryID} />
            <Carousel gallery={currentGallery.photos} />
        </div>
    );
}
