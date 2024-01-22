import React, { useEffect, useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { ModelsEvent } from "../../api/Api";
import { useEventList } from "../../hooks/useEventList";
import { useUser } from "../../hooks/useUser";
import TextInput from "../UI/TextInput";
import { useQuery } from "react-query";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const OrderListPage: React.FC<Props> = ({ setURL }) => {
	const { isAdmin } = useUser();

	const location = useLocation();
	useEffect(() => {
		setURL(location.pathname, "Заявки");
	}, []);

	const { status, minDate, maxDate, setStatus, setMinDate, setMaxDate } = useEventList();
	const [eventList, setEventList] = useState<ModelsEvent[]>([]);

	const getEventList = async () => {
		const response = await api.api.eventList({
			status: status,
			start_formation: minDate.length !== 0 ? `${minDate} 00:00:00` : "",
			end_formation: maxDate.length !== 0 ? `${maxDate} 23:59:59` : "",
		});

		const data = response.data;
		for (let event of data) {
			let formDate = new Date(String(event.formation_date));
			event.formation_date = event.formation_date !== "0001-01-01T00:00:00Z" ? `${formDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}` : "-";

			let creationDate = new Date(String(event.creation_date));
			event.creation_date = `${creationDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}`;

			let completionDate = new Date(String(event.completion_date));
			event.completion_date = event.completion_date !== "0001-01-01T00:00:00Z" ? `${completionDate.toLocaleString('ru-RU', { timeZone: 'Europe/London' })}` : "-";
		}
		setEventList(data);
	}

	useQuery('star-events', getEventList, { refetchInterval: 3000 });

	useEffect(() => {
		getEventList();
	}, [status, minDate, maxDate]);

	const navigate = useNavigate();
	const redirect = (event: any) => {
		navigate(`/orders/${event.currentTarget.id}`)
	}

	const changeStatusAccepted = async (event: any) => {
		event.stopPropagation();
		const eventId = event.currentTarget.id;
		await api.api.eventStatusUpdate(eventId, { status: "Принято" });
	}
	const changeStatusCanceled = async (event: any) => {
		event.stopPropagation();
		await api.api.eventStatusUpdate(event.currentTarget.id, { status: "Отклонено" });
	}

	const [login, setLogin] = useState("");
	const findUser = (value: string) => {
		setLogin(value);
	}

	return (
		<>
			<div className="cart__page">
				<h2>События</h2>

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
						<Dropdown.Item onClick={() => setStatus("Сформировано")}>Сформировано</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Принято")}>Принято</Dropdown.Item>
						<Dropdown.Item onClick={() => setStatus("Отклонено")}>Отклонено</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<div style={{ display: "flex", marginBottom: "1em" }}>
					<div style={{ marginRight: "3em" }}>
						<div>Формирование от</div>
						<input type="date" value={minDate} onChange={(event) => setMinDate(event.target.value)} style={{ backgroundColor: "white", color: "black" }} />
					</div>
					<div>
						<div>Формирование до</div>
						<input type="date" value={maxDate} onChange={(event) => setMaxDate(event.target.value)} style={{ backgroundColor: "white", color: "black" }} />
					</div>
				</div>

				{
					isAdmin &&
					<TextInput label="Фильтрация по пользователю" placeholder="Имя пользователя" type="text" value={login} onChange={findUser} />
				}

				<Table striped bordered hover variant="light" style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Событие</th>
							{
								isAdmin &&
								<th>Создатель</th>
							}
							<th>Статус</th>
							<th>Создано</th>
							<th>Сформировано</th>
							<th>Завершено</th>
							<th>Обработал</th>
							<th>% Сканирования</th>
							{
								isAdmin &&
								<>
									<th>Принять</th>
									<th>Отклонить</th>
								</>
							}
						</tr>
					</thead>

					<tbody>
						{
							eventList.filter(event => event.creator?.includes(login)).map((event) => (
								<tr id={String(event.event_id)} key={event.event_id} onClick={redirect} className="hover">
									<th>{event.event_id}</th>
									<th>{event.name}</th>
									{
										isAdmin &&
										<th>{event.creator}</th>
									}
									<th>{event.status}</th>
									<th>{event.creation_date}</th>
									<th>{event.formation_date}</th>
									<th>{event.completion_date}</th>
									<th>{event.moderator}</th>
									<th>{event.scanned_percent}</th>
									{
										isAdmin &&
										<>
											<th>
												{
													event.status === "Сформировано" &&
													<Button id={String(event.event_id)} onClick={changeStatusAccepted} variant="success">О</Button>
												}
											</th>
											<th>
												{
													event.status === "Сформировано" &&
													<Button id={String(event.event_id)} onClick={changeStatusCanceled} variant="danger">X</Button>
												}
											</th>
										</>
									}
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
