import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ModelsStar } from "../../api/Api";
import { api } from "../../api";

interface Props {
	setURL: (path: string, slug: string) => void,
	setStarChanged: (counter: any) => void,
}

const CreateStarPage: React.FC<Props> = ({ setURL, setStarChanged }) => {
	const id = Number(useParams().id);
	const [star, setStar] = useState<ModelsStar>({});
	useEffect(() => {
		getStar();
	}, []);

	const getStar = async () => {
		if (id !== 0) {
			const response = await api.api.starDetail(id);
			setStar(response.data);
		}
	}

	const location = useLocation();
	useEffect(() => {
		if (id === 0) {
			setURL(location.pathname, "Создать звезду");
		} else {
			setURL(location.pathname, `Редактировать / ${star.name}`);
		}
	}, [star]);

	const validateDigits = (value: string) => {
		return /^\d*\.?\d*$/.test(value);
	}
	const validateMagnitude = (value: string) => {
		return /^-?\d*\.?\d*$/.test(value);
	}

	const [isEmptyName, setIsEmptyName] = useState(star?.name?.length === 0);
	const setName = (event: any) => {
		setIsEmptyName(event.target.value.length === 0)
		setStar({ ...star, name: event.target.value })
	}
	const setDescription = (event: any) => {
		setStar({ ...star, description: event.target.value })
	}
	const setDistance = (event: any) => {
		if (validateDigits(event.target.value)) {
			setStar({ ...star, distance: event.target.value })
		}
	}
	const setAge = (event: any) => {
		if (validateDigits(event.target.value)) {
			setStar({ ...star, age: event.target.value })
		}
	}
	const setMagnitude = (event: any) => {
		if (validateMagnitude(event.target.value)) {
			setStar({ ...star, magnitude: event.target.value })
		}
	}

	const [file, setFile] = useState<File>();
	const [filepath, setFilepath] = useState("");
	const changeFile = (event: any) => {
		setFile(event.target.files[0]);
		setFilepath(URL.createObjectURL(event.target.files[0]));
	}

	const navigate = useNavigate();
	const saveStar = async () => {
		if (star.name?.length) {
			let newStar: any = { name: star.name }
			if (star.description?.length) {
				newStar.description = star.description
			}
			if (star.distance) {
				newStar.distance = star.distance
			}
			if (star.age) {
				newStar.age = star.age
			}
			if (star.magnitude) {
				newStar.magnitude = star.magnitude
			}
			if (file) {
				newStar.image = file
			}

			if (id === 0) {
				await api.api.starCreate(newStar);
			} else {
				await api.api.starUpdateUpdate(id, newStar);
			}
			setStarChanged((v: any) => v + 1);
			navigate("/");
		}
	}

	return (
		<>
			<div className="page">
				{
					id === 0 ?
						<h2>Создание новой звезды</h2>
						:
						<h2>Редактирование звезды {star.name}</h2>
				}

				<Card style={{ padding: "1em" }}>
					<div style={{ backgroundImage: `url(${filepath}), url(${star.image}), url('/Star_Mock.jpeg')` }} className="create-star__img"></div>
					<Form.Group controlId="formFile" className="mb-1" style={{ padding: "1em" }}>
						<Form.Label>Выберите фото</Form.Label>
						<Form.Control onChange={changeFile} type="file" />
					</Form.Group>

					<Card.Body>
						{
							isEmptyName ?
								<div style={{ color: "red" }}>Обязательное поле</div>
								:
								<div>*</div>
						}
						<Form.Control value={star.name || ""} onChange={setName} size="lg" type="text" placeholder="Название звезды" style={{ marginBottom: "1em" }} />
						<Form.Control value={star.description || ""} onChange={setDescription} type="text" placeholder="Описание звезды" style={{ marginBottom: "1em" }} />

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em" }}>
							<div style={{ width: "25%" }}>
								<Form.Label>Расстояние, св. лет</Form.Label>
								<Form.Control value={star.distance || ""} onChange={setDistance} type="text" placeholder="Расстояние до звезды" />
							</div>
							<div style={{ width: "25%" }}>
								<Form.Label>Возраст, млрд лет</Form.Label>
								<Form.Control value={star.age || ""} onChange={setAge} type="text" placeholder="Возраст звезды" />
							</div>
							<div style={{ width: "25%" }}>
								<Form.Label>Звездная величина</Form.Label>
								<Form.Control value={star.magnitude || ""} onChange={setMagnitude} type="text" placeholder="Звездная величина" />
							</div>
						</div>

						<Button onClick={saveStar} variant="primary">Сохранить</Button>
					</Card.Body>
				</Card>
			</div>
		</>
	);
}

export default CreateStarPage;
