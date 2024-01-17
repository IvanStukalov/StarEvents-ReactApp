import React, { useEffect } from "react";
import { ModelsStar } from "../../api/Api";
import { useUser } from "../../hooks/useUser";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../UI/Input";
import Loader from "../UI/Loader";
import CardTable from "../cards/CardTable";

interface Props {
	starList: ModelsStar[],
	getStarList: Function,
	setURL: Function,
	loading: boolean,
	setStarChanged: (counter: any) => void,
}

const StarTablePage: React.FC<Props> = ({ starList, getStarList, setURL, loading, setStarChanged }) => {
	useEffect(() => {
		setURL(location.pathname, "Таблица звезд");
	}, [])

	const { isAdmin } = useUser();

	return (
		<>
			{
				isAdmin ?
					<>
						<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />
						<div className="star-list__page">
							{
								starList && starList.length !== 0 &&
								<>
									<Link to="/star/create/0">
										<Button variant="primary" style={{ margin: "1em 0", width: "100%" }}>Создать</Button>
									</Link>
									<CardTable starList={starList} setStarChanged={setStarChanged} />
								</>
							}

							{
								loading &&
								<Loader />
							}
						</div>
					</>
					:
					<h2>Forbidden</h2>
			}

		</>
	);
}

export default StarTablePage;
