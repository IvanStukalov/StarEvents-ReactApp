import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../UI/Input";
import Loader from "../UI/Loader";
import CardTable from "../cards/CardTable";
import { api } from "../../api";
import { useStarList } from "../../hooks/useStarList";
import { StarListMock } from "../../models/mocks";
import { Star } from "../../models/models";

interface Props {
	setURL: Function,
	starChanged: number,
	setStarChanged: (counter: any) => void,
}

const StarTablePage: React.FC<Props> = ({ setURL, starChanged, setStarChanged }) => {
	useEffect(() => {
		setURL(location.pathname, "Таблица звезд");
	}, [])

	const { isAdmin } = useUser();

	const [starList, setStarList] = useState<Star[]>([]);
	const { distBot, distTop, ageBot, ageTop, magBot, magTop, searchValue } = useStarList();
	const [loading, setLoading] = useState<boolean>(false);

	const getStarList = async (queryParam: string, distTop: number, distBot: number, ageTop: number, ageBot: number, magTop: number, magBot: number) => {
		setLoading(true);
		await api.api.starList({
			name: queryParam ?? "",
			dist_top: distTop ?? "",
			dist_bot: distBot ?? "",
			age_top: ageTop ?? "",
			age_bot: ageBot ?? "",
			mag_top: magTop ?? "",
			mag_bot: magBot ?? "",
		})
			.then(res => {
				setStarList(res.data.stars)
			})
			.catch(error => {
				console.log(error.response)
				setStarList(StarListMock.filter(star =>
					star.distance > distBot && star.distance < distTop &&
					star.age > ageBot && star.age < ageTop &&
					star.magnitude > magBot && star.magnitude < magTop &&
					star.name.includes(queryParam)));
			})
		setLoading(false);
	}

	useEffect(() => {
		getStarList(searchValue, distTop, distBot, ageTop, ageBot, magTop, magBot);
	}, [starChanged]);


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
