import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../api";
import { ModelsEvent } from "../../api/Api";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const OrderListPage: React.FC<Props> = ({ setURL }) => {
	const location = useLocation();
	useEffect(() => {
		setURL(location.pathname, "Заявки");
		getEventList();
	}, []);

	const [eventList, setEventList] = useState<ModelsEvent[]>([]);

	const getEventList = async () => {
		const response = await api.api.eventList();
		setEventList(response.data);
	}

	return (
		<>
			<div className="cart__page">
				<h2>Заявки</h2>

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
			</div>
		</>
	);
}

export default OrderListPage;
