import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModelsEvent, ModelsStar } from "../../api/Api";
import { api } from "../../api";
import CardList from "../cards/CardList";
import { Button } from "react-bootstrap";
import Loader from "../UI/Loader";
import TextInput from "../UI/TextInput";
import { useUser } from "../../hooks/useUser";

interface Props {
	setURL: (path: string, slug: string) => void,
	setDraftId: Function,
}

const OrderItemPage: React.FC<Props> = ({ setURL, setDraftId }) => {
	const id = Number(useParams().id);
	const [starList, setStarList] = useState<ModelsStar[]>([]);
	useEffect(() => {
		getStarList();
	}, [id]);

	const [event, setEvent] = useState<ModelsEvent>();
	const [loading, setLoading] = useState<boolean>(false);
	const [draftName, setDraftName] = useState<string>("");
	const [isDraft, setIsDraft] = useState<boolean>(false);

	const getStarList = async () => {
		setLoading(true);
		const response = await api.api.eventDetail(Number(id));
		setStarList(response.data.star_list);
		setDraftName(response.data.event.name);
		setIsDraft(response.data.event.status === "Создано");

		const eventData = response.data.event;
		let formDate = new Date(String(eventData.formation_date));
		eventData.formation_date = eventData.formation_date !== "0001-01-01T00:00:00Z" ? `${formDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}` : "-";

		let creationDate = new Date(String(eventData.creation_date));
		eventData.creation_date = `${creationDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}`;

		let completionDate = new Date(String(eventData.completion_date));
		eventData.completion_date = eventData.completion_date !== "0001-01-01T00:00:00Z" ? `${completionDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}` : "-";

		setEvent(eventData);
		setURL(`/orders`, response.data.event.name && response.data.event.name.length !== 0 ?
			`Заявки -> ${response.data.event.name}` :
			`Заявки -> ${response.data.event.event_id}`);
		setLoading(false);
	}

	const navigate = useNavigate();
	const formEvent = () => {
		api.api.eventFormUpdate();
		navigate("/orders");
	}
	const deleteEvent = async () => {
		await setDraftId(() => 0);
		await api.api.eventDelete();
		navigate("/");
	}

	const emergeList = (list: ModelsStar[]) => {
		setStarList(list);
	}

	const updateEventName = async () => {
		await api.api.eventUpdate(id, { name: draftName });
		const response = await api.api.eventDetail(Number(id));
		setStarList(response.data.star_list);
		setDraftName(response.data.event.name);
	}

	const updateDraftName = (value: string) => {
		setDraftName(value)
	}

	const { isAdmin } = useUser();

	return (
		<>
			<div className="cart__page">
				{
					!isDraft ?
						<>
							<h2 className="cart__header">Событие #{event?.name || id}</h2>
							<div>Статус: {event?.status}</div>
							<div>Дата создания: {event?.creation_date}</div>
							<div>Дата формирования: {event?.formation_date}</div>
							<div>Дата завершения: {event?.completion_date}</div>
							{
								isAdmin &&
								<div>Пользователь: {event?.creator}</div>
							}
							<div>Обработал: {event?.moderator?.length !== 0 ? event?.moderator : "-"}</div>
							<div>Процент cканирования: {event?.scanned_percent}</div>
						</>
						:
						<>
							<h2 className="cart__header">Событие-черновик</h2>
							<TextInput label="Название события" placeholder="Введите название для нового события" type="text" value={draftName} onChange={updateDraftName} />
							<Button variant="primary" onClick={updateEventName} style={{ height: "2.5em" }}>Установить</Button>
						</>
				}
				<CardList starList={starList} emergeList={emergeList} isMain={false} isDraft={isDraft} setDraftId={() => { }} />

				{
					isDraft &&
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Button variant="primary" onClick={formEvent} disabled={!starList || starList.length === 0} style={{ margin: "0 1em", width: "10em" }}>Сформировать</Button>
						<Button variant="danger" onClick={deleteEvent} style={{ margin: "0 1em", width: "10em" }}>Удалить</Button>
					</div>
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
