import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModelsStar } from "../../api/Api";
import { api } from "../../api";
import CardList from "../cards/CardList";
import { Button } from "react-bootstrap";

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

	const getStarList = async () => {
		const response = await api.api.eventDetail(Number(id));
		console.log(response.data);
		setStarList(response.data.star_list);
		setURL(`/orders/${response.data.event.event_id}`, `Заявки / ${response.data.event.event_id}`);
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

	return (
		<>
			<div className="cart__page">
				{
					draftId !== id ?
						<h2 className="cart__header">Заявка #{id}</h2>
						:
						<h2 className="cart__header">Заявка-черновик</h2>
				}
				<CardList starList={starList} emergeList={emergeList} isMain={false} isDraft={draftId === id} setDraftId={() => {}} />

				{
					draftId === id &&
						<Button variant="primary" onClick={form} disabled={!starList || starList.length === 0} style={{display: "block", margin: "auto"}}>Сформировать</Button>
				}
			</div>
		</>
	);
}

export default OrderItemPage;
