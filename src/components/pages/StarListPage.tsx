import React, { useEffect, useState } from "react";
import CardList from "../CardList";
import Input from "../UI/Input";
import { Star } from "../../models/models";
import { StarListMock } from "../../models/mocks";

const StarListPage: React.FC = () => {
	const [starList, setStarList] = useState<Star[]>([]);

	useEffect(() => {
		getStarList("");
	}, []);

	const getStarList = async (queryParam: string) => {
		try {
			let queryString = "http://localhost:3000/api/star"
			if (queryParam) {
				queryString += `?name=${queryParam}`
			}
			const response = await fetch(queryString);
			const data = await response.json();
			setStarList(data.stars);
			console.log(data.stars);
		} catch (error) {
			console.error(error);
			setStarList(StarListMock);
		}
	}

	return (
		<>
			<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />

			<CardList starList={starList} />
		</>
	)
}

export default StarListPage;
