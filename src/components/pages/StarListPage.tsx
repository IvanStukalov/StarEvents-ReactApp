import React, { useEffect } from "react";
import CardList from "../cards/CardList";
import Input from "../UI/Input";
import { ModelsStar } from "../../api/Api";

interface Props {
	starList: ModelsStar[],
	getStarList: Function,
	setURL: Function,
}

const StarListPage: React.FC<Props> = ({ starList, getStarList, setURL }) => {
	useEffect(() => {
		setURL();
	}, [])

	return (
		<>
			<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />

			<CardList starList={starList} isMain={true} />
		</>
	)
}

export default StarListPage;
