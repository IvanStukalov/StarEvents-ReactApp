import React, { useEffect, useState } from "react";
import TextInput from "../UI/TextInput";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { api } from "../../api";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const AuthPage: React.FC<Props> = ({ setURL }) => {
	const location = useLocation();
	useEffect(() => {
		setURL(location.pathname, "Авторизация");
	}, []);

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	
	const signIn = () => {
		api.api.signInCreate({
			login: login,
			password: password,
		})
			.then(res => console.log(res))
			.catch(err => console.log(err.response.data))
	}

	return (
		<>
			<div className="login_page">
				<h2 className="login_page__header">Авторизация</h2>
				<TextInput label="Логин" placeholder="Введите логин" type="text" value={login} onChange={setLogin} />
				<TextInput label="Пароль" placeholder="Введите пароль" type="password" value={password} onChange={setPassword} />

				<Button variant="primary" onClick={signIn}>Войти</Button>
			</div>
		</>
	);
}

export default AuthPage;
