import "./Card.css";
import React from "react";

export default function Card({ name, image_url, description }) {
    return(<>
        <section className="card">
            <h2 className="cardName">{name}</h2>
            <img src={image_url} alt={name} className="cardImg"/>
            <p className="cardDescription">{description}</p>
        </section>
    </>);
}