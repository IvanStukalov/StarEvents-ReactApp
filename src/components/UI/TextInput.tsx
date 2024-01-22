import React from "react";
import { Form } from "react-bootstrap";

interface Props {
	label: string,
	placeholder: string,
	type: string,
}

const TextInput: React.FC<Props> = ({ label, placeholder, type }) => {

	return (
		<>
			<Form.Group className="input">
				<Form.Label>{label}</Form.Label>

				<div className="input__container">
					<Form.Control
						className="input__field black-placeholder"
						type={type}
						placeholder={placeholder}
						style={{ backgroundColor: "white", color: "black", borderRadius: "0" }}
					/>
				</div>
			</Form.Group>
		</>
	);
}

export default TextInput;