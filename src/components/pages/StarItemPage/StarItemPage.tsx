import React from "react";
import { Star } from "../../../models/models";
import CardItem from "../../CardItem/CardItem";
import { useParams } from "react-router-dom";

interface Props {
	starList: Star[]
}

const StarItemPage: React.FC<Props> = ({ starList }) => {
	const { id } = useParams()

	return (
		<>
			<div>
				{
					starList[Number(id)]
						?
						<CardItem star={starList[Number(id)]} />
						:
						<h1>Not Found</h1>
				}
			</div>
		</>
	)
}

export default StarItemPage;

