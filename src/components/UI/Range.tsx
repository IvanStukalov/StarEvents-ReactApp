import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
	min: number,
	max: number,
	init: number,
	label: string,
	emergeData: Function,
}

const Range: React.FC<Props> = ({ min, max, init, label, emergeData }) => {
	const [value, setValue] = useState<number>(init);
	
	const onChangeHandler = (event: any) => {
		setValue(Number(event.target.value));
		emergeData(Number(event.target.value));
	}

	return (
		<>
			<Form.Group className="range">
				<Form.Label>{label}: {value}</Form.Label>
				<Form.Range min={min} max={max} value={value} onChange={onChangeHandler} step="0.1" />
			</Form.Group>
		</>
	);
}

export default Range;
