import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
	label: string,
	placeholder: string,
	type: string,
	value: string,
	onChange: (val: string) => void,
}

const TextInput: React.FC<Props> = ({label, placeholder, type, value, onChange}) => {
	const [val, setVal] = useState(value);

	const inputHandler = (event: any) => {
		setVal(event.target.value);
		onChange(event.target.value);
	}

	return (
		<>
			<Form.Group className="input">
				<Form.Label>{label}</Form.Label>

				<div className="input__container">
					<Form.Control
						className="input__field black-placeholder"
						type={type}
						placeholder={placeholder}
						value={val}
						onChange={inputHandler}
						style={{ backgroundColor: "white", color: "black", borderRadius: "0" }}
					/>
				</div>
			</Form.Group>
		</>
	);
}

export default TextInput;
