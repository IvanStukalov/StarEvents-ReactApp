import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Range from "./Range";

interface Props {
	label: string,
	placeholder: string,
	sendRequest: Function,
}

const Input: React.FC<Props> = ({ label, placeholder, sendRequest }) => {
	const [value, setValue] = useState<string>("");

	const [minDist, setMinDist] = useState<number>(0);
	const [maxDist, setMaxDist] = useState<number>(100);
	const [minAge, setMinAge] = useState<number>(0);
	const [maxAge, setMaxAge] = useState<number>(13.8);
	const [minMag, setMinMag] = useState<number>(-27);
	const [maxMag, setMaxMag] = useState<number>(100);

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			sendRequest(value, maxDist, minDist, maxAge, minAge, maxMag, minMag);
		}
	}

	const getMinDist = (v: number) => {
		setMinDist(v);
	}

	const getMaxDist = (v: number) => {
		setMaxDist(v);
	}

	const getMinAge = (v: number) => {
		setMinAge(v);
	}

	const getMaxAge = (v: number) => {
		setMaxAge(v);
	}

	const getMinMag = (v: number) => {
		setMinMag(v);
	}

	const getMaxMag = (v: number) => {
		setMaxMag(v);
	}

	return (
		<>
			<div className="main_page">
				<Form.Group className="input">
					<Form.Label>{label}</Form.Label>

					<div className="input__container">
						<Form.Control
							className="input__field"
							type="text"
							placeholder={placeholder}
							onKeyDown={handleKeyPress}
							onChange={(event) => setValue(event.target.value)}
						/>

						<Button variant="primary" onClick={() => sendRequest(value, maxDist, minDist, maxAge, minAge, maxMag, minMag)}>Найти</Button>
					</div>
				</Form.Group>

				<div className="range__container">
					<div className="range__block">
						<Range label="Минимальное расстояние, св. лет" min={0} max={100} init={0} emergeData={getMinDist} />
						<Range label="Максимальное расстояние, св. лет" min={0} max={100} init={100} emergeData={getMaxDist} />
					</div>

					<div className="range__block">
						<Range label="Минимальный возраст, млрд лет" min={0} max={13.8} init={0} emergeData={getMinAge} />
						<Range label="Максимальный возраст, млрд лет" min={0} max={13.8} init={13.8} emergeData={getMaxAge} />
					</div>

					<div className="range__block">
						<Range label="Минимальная звездная величина" min={-27} max={100} init={-27} emergeData={getMinMag} />
						<Range label="Максимальная звездная величина" min={-27} max={100} init={100} emergeData={getMaxMag} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Input;
