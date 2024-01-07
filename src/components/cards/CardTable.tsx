import React from "react";
import { ModelsStar } from "../../api/Api";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
	starList: ModelsStar[],
}

const CardTable: React.FC<Props> = ({ starList }) => {
	const navigate = useNavigate();
	const redirect = (event: any) => {
		navigate(`/star/${event.currentTarget.id}`)
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
					</tr>
				</thead>

				<tbody>
					{
						starList.map((star) => (
							<tr id={String(star.star_id)} key={star.star_id} onClick={redirect}>
								<th>{star.star_id}</th>
								<th>
									<div style={{ backgroundImage: `url(${star.image}), url('Star_Mock.jpeg')` }} className="table__img"></div>
								</th>
								<th>{star.name}</th>
								<th>{star.description}</th>
								<th>{star.distance}</th>
								<th>{star.age}</th>
								<th>{star.magnitude}</th>
							</tr>
						))
					}
				</tbody>
			</Table>

		</>
	);
}

export default CardTable;
