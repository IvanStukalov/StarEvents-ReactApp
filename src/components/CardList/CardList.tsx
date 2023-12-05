import React from 'react';
import {Card, CardGroup, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Star} from "../../models/models.ts";

interface Props {
  starList: Star[];
}

const CardList: React.FC<Props> = ({ starList }) => {
  return (
    <CardGroup className="card-list">
      <Row xs={1} md={3} className="g-4">
        {
          starList.map((star) => (
            <Col>
              <Card key={star.id} className="star-card">
                <Card.Img className="card-img" variant="top" src={star.image}/>
                <Card.Body className="card-body">
                  <div>
                    <Card.Title>{star.name}</Card.Title>
                    <Card.Text>{star.description}</Card.Text>
                  </div>
                  <Button variant="dark">К звезде</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </CardGroup>
  );
};

export default CardList;
