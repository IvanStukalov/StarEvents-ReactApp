import React, { useEffect } from "react";
import CardList from "../cards/CardList";
import Input from "../UI/Input";
import { ModelsStar } from "../../api/Api";

interface Props {
	starList: ModelsStar[],
	getStarList: Function,
	setURL: Function,
	setDraftId: (draftId: number) => void,
}

const StarListPage: React.FC<Props> = ({ starList, getStarList, setURL, setDraftId }) => {
	useEffect(() => {
		setURL();
	}, [])

	return (
		<>
			<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />
			<div className="star-list__page">
				<CardList starList={starList} emergeList={() => {}} isMain={true} isDraft={false} setDraftId={setDraftId} />
			</div>
		</>
	)
}

export default StarListPage;
