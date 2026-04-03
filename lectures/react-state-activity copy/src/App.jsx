import React from "react";
import Carousel from "./Carousel";
import Gallery from "./Gallery";
import "./App.css";
import { useEffect, useState } from "react";

const galleries2 = [
    {
        id: "cats",
        name: "Cats",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=cat"
    },
    {
        id: "dogs",
        name: "Dogs",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=dog"
    },
    {
        id: "birds",
        name: "Birds",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=bird"
    }
]

export default function App() {
    const [photos, setPhotos] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);

    async function getPhotos(endpoint) {
        setPhotos([]);

        const response = await fetch(endpoint);

        const data = await response.json();

        const imageURLs = data.map((item) => {
            return item
        });
        setPhotos(imageURLs);
    }

    const [currentGalleryID, setCurrentGalleryID] = useState(galleries2[0].id);

    function getCurrentGallery(currentGalleryID) {
        for (let i = 0; i < galleries2.length; i++) {
            if (galleries2[i].id === currentGalleryID) {
                return galleries2[i];
            }
        }
        return galleries2[0];
    }

    const currentGallery = getCurrentGallery(currentGalleryID);

    useEffect(() => {
        getPhotos(currentGallery.endpoint);
    }, [currentGallery]);

    if (photos.length === 0) {
        return (
            <div>
            <h1>{currentGallery.name} Photo Carousel</h1>
            <Gallery galleries={galleries2}  currentGalleryID={currentGalleryID} onSelectGallery={setCurrentGalleryID} />
            <div className="loadingDiv">
                <p className="loading">Photos Loading...</p>
            </div>
        </div>
        )
    } else {
        return (
            <div>
                <h1>{currentGallery.name} Photo Carousel</h1>
                <Gallery galleries={galleries2}  currentGalleryID={currentGalleryID} onSelectGallery={setCurrentGalleryID} />
                <Carousel gallery={photos} />
            </div>
        );
    }
}
