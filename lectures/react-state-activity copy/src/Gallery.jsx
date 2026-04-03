import React from 'react';
import "./Gallery.css";

export default function Galleries({ 
    galleries,
    currentGalleryID,
    onSelectGallery 
}) {
    return (
        <div className="gallery">
            {galleries.map((gallery) => (
                <button 
                    key={gallery.id} 
                    className={
                        gallery.id === currentGalleryID ? "selected" : ""
                    } 
                    onClick={() => {onSelectGallery(gallery.id)}}
                >
                    {gallery.name}
                </button>  
            ))}
        </div>
    );
}