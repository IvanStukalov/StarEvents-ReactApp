import React, { useEffect, useState } from 'react';
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ModelsStar } from '../../api/Api.ts';
import { api } from '../../api/index.ts';
import { useUser } from '../../hooks/useUser.ts';

interface Props {
  starList: ModelsStar[],
  emergeList: (list: ModelsStar[]) => void,
  isMain: boolean,
  isDraft: boolean,
  setDraftId: (draftId: any) => void,
}

const CardList: React.FC<Props> = ({ starList, emergeList, isMain, isDraft, setDraftId }) => {
  const [list, setList] = useState(starList);

  useEffect(() => {
    setList(starList);
  }, [starList]);

  const addToCart = async (event: any) => {
    event.preventDefault();
    await api.api.starEventCreate({ star_id: event.target.id });
    const response = await api.api.starList();
    setDraftId(response.data.draft_id);
  }

  const removeFromCart = async (event: any) => {
    event.preventDefault();
    const response = await api.api.starEventStarIdDelete(event.target.id);
    setList(response.data.star_list);
    emergeList(response.data.star_list);
    api.api.eventDetail(92);
  }

  const {isAuthorized, isAdmin} = useUser();

  return (
    <>
      {
        list && list.length !== 0 ?
          <CardGroup className="card-list">
            <Row xs={1} sm={2} md={3} className="card-row">
              {
                list.map((star) => (

                  <Col key={star.star_id}>
                    <Card key={star.star_id} className="star-card" bg="light" style={{color: "black"}}>

                      <Link to={`/star/${star.star_id}`}>

                        <div className="card-img"
                          style={{ backgroundImage: `url(${star.image}), url('/Star_Mock.jpeg')` }}
                        ></div>
                        <Card.Body className="card-body">

                          <div className="card-info">
                            <Card.Title>{star.name}</Card.Title>
                            <Card.Text>{star.description}</Card.Text>
                          </div>

                          {
                            isMain && isAuthorized && !isAdmin &&
                            <Button variant="primary" id={String(star.star_id)} onClick={addToCart}>Добавить в корзину</Button>
                          }

                          {
                            isDraft && isAuthorized && !isAdmin &&
                            <Button variant="primary" id={String(star.star_id)} onClick={removeFromCart}>Удалить из корзины</Button>
                          }

                        </Card.Body>
                      </Link>

                    </Card>
                  </Col>
                ))
              }
            </Row>
          </CardGroup>
          :
          <h3>Не добавлено ни одной звезды</h3>
      }
    </>
  );
};

export default CardList;
