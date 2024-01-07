import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModelsStar } from "../../api/Api";
import { api } from "../../api";
import CardList from "../cards/CardList";
import { Button } from "react-bootstrap";
import Loader from "../UI/Loader";
import TextInput from "../UI/TextInput";
import { useDraft } from "../../hooks/useDraft";

interface Props {
	setURL: (path: string, slug: string) => void,
	draftId: number,
	setDraftId: (draftId: number) => void,
}

const OrderItemPage: React.FC<Props> = ({ setURL, draftId, setDraftId }) => {
	const id = Number(useParams().id);
	const [starList, setStarList] = useState<ModelsStar[]>([]);
	useEffect(() => {
		getStarList();
	}, [id]);

	const [eventName, setEventName] = useState();
	const [loading, setLoading] = useState<boolean>(false);
	const getStarList = async () => {
		setLoading(true);
		const response = await api.api.eventDetail(Number(id));
		setStarList(response.data.star_list);
		setEventName(response.data.event.name);
		setURL(`/orders`, `Заявки / ${response.data.event.name}`);
		setLoading(false);
	}

	const navigate = useNavigate();
	const form = () => {
		api.api.eventFormUpdate();
		navigate("/")
		setDraftId(0);
	}

	const emergeList = (list: ModelsStar[]) => {
		setStarList(list);
	}

	const updateEventName = async () => {
		await api.api.eventUpdate(draftId, {name: draftName});
	}

	const { draftName, setDraftName } = useDraft();
	const updateDraftName = (value: string) => {
		setDraftName(value)
	}


	return (
		<>
			<div className="cart__page">
				{
					draftId !== id ?
						<h2 className="cart__header">Заявка #{eventName}</h2>
						:
						<>
							<h2 className="cart__header">Заявка-черновик</h2>
							<TextInput label="Название события" placeholder="Введите название для нового события" type="text" value={draftName} onChange={updateDraftName} />
							<Button variant="primary" onClick={updateEventName} style={{ height: "2.5em" }}>Установить</Button>
						</>
				}
				<CardList starList={starList} emergeList={emergeList} isMain={false} isDraft={draftId === id} setDraftId={() => { }} />

				{
					draftId === id &&
					<Button variant="primary" onClick={form} disabled={!starList || starList.length === 0} style={{ display: "block", margin: "auto" }}>Сформировать</Button>
				}

				{
					loading &&
					<Loader />
				}
			</div>
		</>
	);
}

export default OrderItemPage;
