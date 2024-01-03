import React, { useEffect } from "react";
import TextInput from "../UI/TextInput";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const RegPage: React.FC<Props> = ({ setURL }) => {
	const location = useLocation();
	useEffect(() => {
		console.log(location.pathname)
		setURL(location.pathname.slice(1), "Регистрация");
	}, []);

	return (
		<>
			<div className="login_page">
				<h2 className="login_page__header">Регистрация</h2>
				<TextInput label="Логин" placeholder="Введите логин" type="text" />
				<TextInput label="Пароль" placeholder="Введите пароль" type="password" />

				<Button variant="primary">Primary</Button>
			</div>
		</>
	);
}

export default RegPage;
