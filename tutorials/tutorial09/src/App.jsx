import React from "react";
import { Image } from 'antd';
import Card from "./components/Card.jsx"
import AntCard from "./components/AntCard.jsx";
import AntCarousel from "./components/AntCarousel.jsx";
import AntCalendar from "./components/AntCalendar.jsx";

export default function App() {
    return (
        <>
            <section className="cardsContainer">
                <Card name="Kelly" image_url="https://picsum.photos/id/218/100/100" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in erat gravida, pretium neque non, pretium sem. Ut molestie porta tortor. Etiam venenatis malesuada mi ut auctor."/>
                <Card name="Myra" image_url="https://picsum.photos/id/217/100/100" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in erat gravida, pretium neque non, pretium sem. Ut molestie porta tortor. Etiam venenatis malesuada mi ut auctor."/>
                <Card name="Jack" image_url="https://picsum.photos/id/219/100/100" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in erat gravida, pretium neque non, pretium sem. Ut molestie porta tortor. Etiam venenatis malesuada mi ut auctor."/>
                <Image width={200} alt="basic" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                <AntCard name="Kelly" image_url="https://picsum.photos/id/218/100/100" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in erat gravida, pretium neque non, pretium sem. Ut molestie porta tortor. Etiam venenatis malesuada mi ut auctor."/>
            </section>
            
            <AntCarousel />

            <AntCalendar />
        </>
    );
}