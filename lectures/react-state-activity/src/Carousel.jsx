import React from "react";
import "./Carousel.css";
import { useState } from "react";

export default function Carousel({ gallery }) {
    console.log(gallery);

    const [index, setIndex] = useState(0);

    function next() {
        if (index + 1 === gallery.length) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    function prev() {
        if (index + 1 === 1) {
            setIndex(gallery.length - 1);
        } else {
            setIndex(index - 1);
        }
    }

    return (
        <div className="carousel">
            {/* display the first image in the gallery array below */}
            <img src={gallery[index]} />
            {/* also display a "Photo X of Y" message below the image */}
            <p className="progress">
                Photo {index + 1} of {gallery.length}
            </p>

            <button onClick={prev} className="btn btn-left"><i className="fa-solid fa-angle-left"></i></button>
            <button onClick={next} className="btn btn-right"><i className="fa-solid fa-angle-right"></i></button>
        </div>
    );
}
