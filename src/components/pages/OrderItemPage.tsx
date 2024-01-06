import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ModelsStar } from "../../api/Api";
import { api } from "../../api";
import CardList from "../cards/CardList";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const OrderItemPage: React.FC<Props> = ({ setURL }) => {
	const { id } = useParams();
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

	return (
		<>
			<div className="cart__page">
				<h2 className="cart__header">Заявка #{id}</h2>

				<CardList starList={starList} isMain={false} />
			</div>
		</>
	);
}

export default OrderItemPage;
