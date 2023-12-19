import React, { useEffect, useState } from "react";
import { Star } from "../../models/models";
import CardItem from "../CardItem";
import { useParams } from "react-router-dom";
import { StarListMock } from "../../models/mocks";

interface Props {
	emergeData: Function,
}

const StarItemPage: React.FC<Props> = ({ emergeData }) => {
	const { id } = useParams();
	console.log(id)
	const [star, setStar] = useState<Star>();

	useEffect(() => {
		getStarById();
	}, []);

	const getStarById = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/star/${id}`);
			const data = await response.json();
			setStar(data);
			emergeData(data.name);
		} catch (error) {
			console.log(error)
			setStar(StarListMock[Number(id)]);
			emergeData(StarListMock[Number(id)].name);
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

