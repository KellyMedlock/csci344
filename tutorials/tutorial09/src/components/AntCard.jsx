import React from "react";
import { Card } from 'antd';
const { Meta } = Card;

export default function AntCard({ name, image_url, description }) {
    return(
    <Card
        hoverable
        style={{ width: 240 }}
        cover={
        <img
            draggable={false}
            alt={name}
            src={image_url}
        />
        }
    >
        <Meta title={name} description={description} />
    </Card>);
}