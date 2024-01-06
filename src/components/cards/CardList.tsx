import React from 'react';
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ModelsStar } from '../../api/Api.ts';

interface Props {
  starList: ModelsStar[],
  isMain: boolean,
}

const CardList: React.FC<Props> = ({ starList, isMain }) => {
  const toCart = (event: any) => {
    event.preventDefault();

  }

  return (
    <>
      <CardGroup className="card-list">
        <Row xs={1} sm={2} md={3} className="card-row">
          {
            starList.map((star) => (

              <Col key={star.star_id}>
                <Card key={star.star_id} className="star-card">

                  <Link to={`star/${star.star_id}`}>

                    <div className="card-img"
                      style={{ backgroundImage: `url(${star.image}), url('Star_Mock.jpeg')` }}
                    ></div>
                    <Card.Body className="card-body">

                      <div className="card-info">
                        <Card.Title>{star.name}</Card.Title>
                        <Card.Text>{star.description}</Card.Text>
                      </div>

                      {isMain &&
                        <Button variant="primary" onClick={toCart}>Добавить в корзину</Button>
                      }

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
