import React from "react";
import { Button, Form } from "react-bootstrap";
import Range from "./Range";
import { useStarList } from "../../hooks/useStarList";

interface Props {
	label: string,
	placeholder: string,
	sendRequest: Function,
}

const Input: React.FC<Props> = ({ label, placeholder, sendRequest }) => {
	const { distBot, distTop, ageBot, ageTop, magBot, magTop, searchValue,
		setDistMin, setDistMax, setAgeMin, setAgeMax, setMagMin, setMagMax, setSearchName, } = useStarList();

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			sendRequest(searchValue, distTop, distBot, ageTop, ageBot, magTop, magBot);
		}
	}

	const getMinDist = (v: number) => {
		setDistMin(v);
	}
	const getMaxDist = (v: number) => {
		setDistMax(v);
	}
	const getMinAge = (v: number) => {
		setAgeMin(v);
	}
	const getMaxAge = (v: number) => {
		setAgeMax(v);
	}
	const getMinMag = (v: number) => {
		setMagMin(v);
	}
	const getMaxMag = (v: number) => {
		setMagMax(v);
	}
	const inputHandler = (event: any) => {
		setSearchName(event.target.value);
	}

	return (
		<>
			<div className="main_page">
				<Form.Group className="input">
					<Form.Label>{label}</Form.Label>

					<div className="input__container">
						<Form.Control
							value={searchValue}
							className="input__field black-placeholder"
							type="text"
							placeholder={placeholder}
							onKeyDown={handleKeyPress}
							onChange={inputHandler}
							style={{ backgroundColor: "white", color: "black", borderRadius: "0", width: "90%" }}
						/>

						<Button variant="primary" onClick={() => sendRequest(searchValue, distTop, distBot, ageTop, ageBot, magTop, magBot)}>Найти</Button>
					</div>
				</Form.Group>

				<div className="range__container">
					<div className="range__block">
						<Range label="Минимальное расстояние, св. лет" min={0} max={100} init={distBot} emergeData={getMinDist} />
						<Range label="Максимальное расстояние, св. лет" min={0} max={100} init={distTop} emergeData={getMaxDist} />
					</div>

					<div className="range__block">
						<Range label="Минимальный возраст, млрд лет" min={0} max={13.8} init={ageBot} emergeData={getMinAge} />
						<Range label="Максимальный возраст, млрд лет" min={0} max={13.8} init={ageTop} emergeData={getMaxAge} />
					</div>

					<div className="range__block">
						<Range label="Минимальная звездная величина" min={-27} max={100} init={magBot} emergeData={getMinMag} />
						<Range label="Максимальная звездная величина" min={-27} max={100} init={magTop} emergeData={getMaxMag} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Input;
