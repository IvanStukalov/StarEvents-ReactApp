import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
	label: string,
	placeholder: string,
	sendRequest: Function,
}

const Input: React.FC<Props> = ({ label, placeholder, sendRequest }) => {
	const [value, setValue] = useState<string>("");

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			sendRequest(value);
		}
	}

	return (
		<>
			<Form.Group className="input">
				<Form.Label>{label}</Form.Label>
				<Form.Control
					type="text"
					placeholder={placeholder}
					onKeyDown={handleKeyPress}
					onChange={(event) => setValue(event.target.value)}
				/>
			</Form.Group>
		</>
	);
}

export default Input;
