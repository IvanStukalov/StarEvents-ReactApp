import React from "react";
import { Form, Button } from "react-bootstrap";

const Input: React.FC = () => {
	return (
		<>
			<Form className="input">
				<Form.Group className="mb-3" controlId="starSearch">
					<Form.Label>Star name</Form.Label>
					<Form.Control type="text" placeholder="Enter star name" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}

export default Input
