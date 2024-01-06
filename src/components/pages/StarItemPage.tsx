import React, { useEffect, useState } from "react";
import { Star } from "../../models/models";
import { useParams } from "react-router-dom";
import { StarListMock } from "../../models/mocks";
import { Card } from "react-bootstrap";
import Loader from "../UI/Loader";

interface Props {
	setURL: Function,
}

const StarItemPage: React.FC<Props> = ({ setURL }) => {
	const { id } = useParams();
	const [star, setStar] = useState<Star>();

	useEffect(() => {
		getStarById();
	}, []);

	const getStarById = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/star/${id}`);
			const data = await response.json();
			setStar(data);
			setURL(`/star/${data.star_id}`, data.name);
		} catch (error) {
			console.log(error)
			setStar(StarListMock[Number(id)]);
			setURL(`/star/${StarListMock[Number(id)].star_id}`, StarListMock[Number(id)].name);
		}
	}

	return (
		<>
			{
				star ?
					<Card className="star-card--item" >
						<Card.Body className="star-card__body">
							<Card.Title className="star-card__title">{star.name}</Card.Title>
							<Card.Text>{star.description}</Card.Text>
							<Card.Text>Возраст: {star.age} млрд лет</Card.Text>
							<Card.Text>Расстояние: {star.distance} св. лет</Card.Text>
							<Card.Text>Видимая звездная величина: {star.magnitude}</Card.Text>
						</Card.Body>
						<div className="star-card__img--item"
							style={{ backgroundImage: `url(${star.image}), url('/Star_Mock.jpeg')` }}
						></div>
					</Card>
					:
					<Loader/>
			}
		</>
	)
}

export default StarItemPage;

