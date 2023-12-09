import React, { useEffect, useState } from "react";
import { Star } from "../../models/models";
import CardItem from "../CardItem";
import { useParams } from "react-router-dom";
import { StarListMock } from "../../models/mocks";

const StarItemPage: React.FC = () => {
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
			console.log(data);
		} catch (error) {
			console.error(error);
			setStar(StarListMock[Number(id)]);
		}
	}

	return (
		<>
			<div>
				{
					star &&	<CardItem star={star} />
				}
			</div>
		</>
	)
}

export default StarItemPage;

