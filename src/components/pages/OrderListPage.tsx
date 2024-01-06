import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../api";
import { ModelsEvent } from "../../api/Api";
import { useEventList } from "../../hooks/useEventList";
import Loader from "../UI/Loader";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const OrderListPage: React.FC<Props> = ({ setURL }) => {
	const location = useLocation();
	useEffect(() => {
		setURL(location.pathname, "Заявки");
	}, []);

	const { status, minDate, maxDate, setStatus, setMinDate, setMaxDate } = useEventList();
	const [eventList, setEventList] = useState<ModelsEvent[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const getEventList = async () => {
		setLoading(true);
		const response = await api.api.eventList({
			status: status,
			start_formation: minDate.length !== 0 ? `${minDate} 00:00:00` : "",
			end_formation: maxDate.length !== 0 ? `${maxDate} 23:59:59` : "",
		});
		const data = response.data;
		for (let event of data) {
			let formDate = new Date(String(event.formation_date));
			event.formation_date = `${formDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}`;

			let creationDate = new Date(String(event.creation_date));
			event.creation_date = `${creationDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}`;

			let completionDate = new Date(String(event.completion_date));
			event.completion_date = `${completionDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}`;
		}
		setEventList(data);
		setLoading(false);
	}

	useEffect(() => {
		getEventList();
	}, [status, minDate, maxDate]);


	return (
		<>
			<div className="cart__page">
				<h2>Заявки</h2>

				<Dropdown style={{ margin: "1em 0" }}>
					<Dropdown.Toggle variant="primary" id="dropdown-basic">
						{
							status.length !== 0 ?
								status
								:
								<>Статус</>
						}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => setStatus("")}>Все</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Создано")}>Создано</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Сформировано")}>Сформировано</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Принято")}>Принято</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Отклонено")}>Отклонено</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Завершено")}>Завершено</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<div style={{ display: "flex", marginBottom: "1em" }}>
					<div style={{ marginRight: "3em" }}>
						<div>Формирование от</div>
						<input type="date" value={minDate} onChange={(event) => setMinDate(event.target.value)} />
					</div>
					<div>
						<div>Формирование до</div>
						<input type="date" value={maxDate} onChange={(event) => setMaxDate(event.target.value)} />
					</div>
				</div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Событие</th>
							<th>Создатель</th>
							<th>Статус</th>
							<th>Создано</th>
							<th>Сформировано</th>
							<th>Завершено</th>
							<th>Обработал</th>
						</tr>
					</thead>

					<tbody>
						{
							eventList.map((event) => (
								<tr key={event.event_id}>
									<th>
										<Link to={`/orders/${event.event_id}`}>
											{event.event_id}
										</Link>
									</th>
									<th>{event.name}</th>
									<th>{event.creator}</th>
									<th>{event.status}</th>
									<th>{event.creation_date}</th>
									<th>{event.formation_date}</th>
									<th>{event.completion_date}</th>
									<th>{event.moderator}</th>
								</tr>
							))
						}
					</tbody>
				</Table>

				{
					loading &&
					<Loader />
				}

			</div>
		</>
	);
}

export default OrderListPage;
