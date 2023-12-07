import React from 'react';
import { Card } from "react-bootstrap";
import { Star } from "../../models/models.ts";

interface Props {
  star: Star;
}

const CardItem: React.FC<Props> = ({ star }) => {
  return (
    <Card className="star-card--item" >
      <Card.Body className="star-card__body">
        <Card.Title className="star-card__title">{star.name}</Card.Title>
        <Card.Text>{star.description}</Card.Text>
        <Card.Text>Возраст: {star.age} млрд лет</Card.Text>
        <Card.Text>Расстояние: {star.distance} св. лет</Card.Text>
        <Card.Text>Видимая звездная величина: {star.magnitude}</Card.Text>
      </Card.Body>
      <Card.Img variant="top" src={star.image} className="star-card__img--item" />
    </Card>
  );
};

export default CardItem;
