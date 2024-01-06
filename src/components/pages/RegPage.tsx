import React, { useEffect, useState } from "react";
import TextInput from "../UI/TextInput";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useUser } from "../../hooks/useUser";

interface Props {
	setURL: (path: string, slug: string) => void,
}

const RegPage: React.FC<Props> = ({ setURL }) => {
	const location = useLocation();
	useEffect(() => {
		setURL(location.pathname.slice(1), "Регистрация");
	}, []);

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { authorize } = useUser();

	const signUp = async () => {
		try {
			const response = await api.api.signUpCreate({
				login: login,
				password: password,
			})
			if (response.status === 201) {
				const resSignIn = await api.api.signInCreate({
					login: login,
					password: password,
				})
				if (resSignIn.status === 200) {
					authorize();
					navigate("/");
				}
			}
		} catch (error: any) {
			console.log(error.response.data)
		}
	}

	return (
		<>
			<div className="login_page">
				<h2 className="login_page__header">Регистрация</h2>
				<TextInput label="Логин" placeholder="Введите логин" type="text" value={login} onChange={setLogin} />
				<TextInput label="Пароль" placeholder="Введите пароль" type="password" value={password} onChange={setPassword} />

				<Button variant="primary" onClick={signUp}>Зарегистрироваться</Button>
			</div>
		</>
	);
}

export default RegPage;
