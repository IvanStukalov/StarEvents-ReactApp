import React, { useEffect } from "react";
import CardList from "../cards/CardList";
import Input from "../UI/Input";
import { ModelsStar } from "../../api/Api";
import Loader from "../UI/Loader";
import { useUser } from "../../hooks/useUser";
import CardTable from "../cards/CardTable";

interface Props {
	starList: ModelsStar[],
	getStarList: Function,
	setURL: Function,
	setDraftId: (draftId: number) => void,
	loading: boolean
}

const StarListPage: React.FC<Props> = ({ starList, getStarList, setURL, setDraftId, loading }) => {
	useEffect(() => {
		setURL();
	}, [])

	const { isAdmin } = useUser();

	return (
		<>
			<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />
			<div className="star-list__page">
				{
					starList && starList.length !== 0 &&
						isAdmin ?
						<CardTable starList={starList} />
						: 
						<CardList starList={starList} emergeList={() => { }} isMain={true} isDraft={false} setDraftId={setDraftId} />
				}

				{
					loading &&
					<Loader />
				}
			</div>
		</>
	)
}

export default StarListPage;
