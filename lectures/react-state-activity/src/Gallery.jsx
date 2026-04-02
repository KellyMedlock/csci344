import React from 'react';
import "./Gallery.css";

export default function Galleries({ 
    galleries,
    currentGalleryID,
    onSelectGallery 
}) {

    return (
        <>
            {galleries.map((gallery) => {
                return (
                    <div className="gallery">
                        <button key={gallery.id} className={gallery.id === currentGalleryID ? "selected" : ""} onClick={() => {onSelectGallery(gallery.id)}}>{gallery.name}</button>
                    </div>
                );
            })}
        </>
    );
}