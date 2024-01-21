import React, { useEffect, useState } from "react";
import CardList from "../cards/CardList";
import Input from "../UI/Input";
import Loader from "../UI/Loader";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { Button } from "react-bootstrap";
import { api } from "../../api";
import { useStarList } from "../../hooks/useStarList";
import { StarListMock } from "../../models/mocks";
import { Star } from "../../models/models";

interface Props {
	setURL: Function,
	draftId: number,
	setDraftId: (draftId: number) => void,
	starChanged: number,
}

const StarListPage: React.FC<Props> = ({ setURL, draftId, setDraftId, starChanged }) => {
	useEffect(() => {
		setURL();
	}, [])

	const [draftChanged, setDraftChanged] = useState<any>(0);
	useEffect(() => {
		setDraftChanged((v: number) => v + 1);
	}, [draftId])

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
				setStarList(res.data.stars);
				setDraftId(res.data.draft_id);
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

	const {isAdmin, isAuthorized} = useUser();

	const navigate = useNavigate();
	const toCart = () => {
		navigate(`/orders/${draftId}`);
	}

	return (
		<>
			{
				isAuthorized && !isAdmin && draftChanged > 0 &&
				<Button onClick={toCart} disabled={draftId === 0} className="cart">Корзина</Button>
			}

			<Input label="Поиск звезд" placeholder="Введите название звезды" sendRequest={getStarList} />
			<div className="star-list__page">
				{
					starList && starList.length !== 0 &&
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
