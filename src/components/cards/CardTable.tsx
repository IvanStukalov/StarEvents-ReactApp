import React from "react";
import { ModelsStar } from "../../api/Api";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

interface Props {
	starList: ModelsStar[],
	setStarChanged: (counter: any) => void,
}

const CardTable: React.FC<Props> = ({ starList, setStarChanged }) => {
	const navigate = useNavigate();
	const toStarDetails = (event: any) => {
		navigate(`/star/${event.currentTarget.id}`);
	}

	const toUpdateStar = (event: any) => {
		event.stopPropagation();
		navigate(`/star/create/${event.currentTarget.id}`);
	}

	const deleteStar = async (event: any) => {
		event.stopPropagation();
		await api.api.starDelete(event.currentTarget.id);
		setStarChanged((v: any) => v + 1);
	}

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Изображение</th>
						<th>Звезда</th>
						<th>Описание</th>
						<th>Расстояние, св. лет</th>
						<th>Возраст, млрд лет</th>
						<th>Звездная величина</th>
						<th>Редактировать</th>
						<th>Удалить</th>
					</tr>
				</thead>

				<tbody>
					{
						starList.map((star) => (
							<tr id={String(star.star_id)} key={star.star_id} onClick={toStarDetails} className="hover center">
								<th>{star.star_id}</th>
								<th>
									<div style={{ backgroundImage: `url(${star.image}), url('/Star_Mock.jpeg')` }} className="table__img"></div>
								</th>
								<th>{star.name}</th>
								<th>{star.description}</th>
								<th>{star.distance}</th>
								<th>{star.age}</th>
								<th>{star.magnitude}</th>
								<th>
									<Button id={String(star.star_id)} onClick={toUpdateStar}>Редактировать</Button>
								</th>
								<th>
									<Button id={String(star.star_id)} onClick={deleteStar}variant="danger">Удалить</Button>
								</th>
							</tr>
						))
					}
				</tbody>
			</Table>

		</>
	);
}

export default CardTable;
