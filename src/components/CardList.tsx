import React from 'react';
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { Star } from "../models/models.ts";
import { Link } from 'react-router-dom';

interface Props {
  starList: Star[];
}

const CardList: React.FC<Props> = ({ starList }) => {
  return (
    <>
      <CardGroup className="card-list">
        <Row xs={1} sm={2} md={3} className="card-row">
          {
            starList.map((star) => (

              <Col key={star.star_id}>
                <Card key={star.star_id} className="star-card">

                  <Link to={`/StarEvents-ReactApp/star/${star.star_id}`}>

                    <div className="card-img"
                      style={{ backgroundImage: `url(${star.image}), url('Star_Mock.jpeg')` }}
                    ></div>
                    <Card.Body className="card-body">

                      <div>
                        <Card.Title>{star.name}</Card.Title>
                        <Card.Text>{star.description}</Card.Text>
                      </div>

                    </Card.Body>
                  </Link>

                </Card>
              </Col>
            ))
          }
        </Row>
      </CardGroup>
    </>
  );
};

export default CardList;
