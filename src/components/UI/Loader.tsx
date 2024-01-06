import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "3em" }}>
			<Spinner animation="border" />
		</div>
	);
}

export default Loader;
