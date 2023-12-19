import React, { useEffect } from "react";
import CardList from "../CardList";
import Input from "../UI/Input";
import { Star } from "../../models/models";

interface Props {
	starList: Star[],
	getStarList: Function,
	emergeData: Function,
}

const StarListPage: React.FC<Props> = ({ starList, getStarList, emergeData }) => {
	useEffect(() => {
		emergeData();
	}, [])

	return (
		<>
			<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />

			<CardList starList={starList} />
		</>
	)
}

export default StarListPage;
