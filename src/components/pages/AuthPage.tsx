import React, { useEffect, useState } from "react";
import TextInput from "../UI/TextInput";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useUser } from "../../hooks/useUser";
import Loader from "../UI/Loader";

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
	const navigate = useNavigate();
	const { authorize } = useUser();
	const [loading, setLoading] = useState<boolean>(false);

	const signIn = async () => {
		setLoading(true);
		try {
			const response = await api.api.signInCreate({
				login: login,
				password: password,
			})
			if (response.status === 200) {
				await authorize();
				navigate("/");
			}
		} catch (error: any) {
			console.log(error)
		}
		setLoading(false);
	}

	return (
		<>
			<div className="login_page">
				<h2 className="login_page__header">Авторизация</h2>
				<TextInput label="Логин" placeholder="Введите логин" type="text" value={login} onChange={setLogin} />
				<TextInput label="Пароль" placeholder="Введите пароль" type="password" value={password} onChange={setPassword} />

				<Button variant="primary" onClick={signIn}>Войти</Button>

				{
					loading && 
					<Loader/>
				}
			</div>
		</>
	);
}

export default AuthPage;
