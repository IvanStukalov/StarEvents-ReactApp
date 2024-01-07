import React, { useEffect } from "react";
import CardList from "../cards/CardList";
import Input from "../UI/Input";
import { ModelsStar } from "../../api/Api";
import Loader from "../UI/Loader";
import { useUser } from "../../hooks/useUser";
import CardTable from "../cards/CardTable";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
	starList: ModelsStar[],
	getStarList: Function,
	setURL: Function,
	setDraftId: (draftId: number) => void,
	loading: boolean,
	setStarChanged: (counter: any) => void,
}

const StarListPage: React.FC<Props> = ({ starList, getStarList, setURL, setDraftId, loading, setStarChanged }) => {
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
						<>
							<Link to="/star/create/0">
								<Button variant="primary" style={{ margin: "1em 0", width: "100%" }}>Добавить</Button>
							</Link>
							<CardTable starList={starList} setStarChanged={setStarChanged} />
						</>
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
