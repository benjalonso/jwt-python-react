import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate();



	const handleClick = () => {
		actions.login(email, password).then(() => {
			navigate('/')
		})
	}

	return (
		<div className="text-center mt-5">
			<h1>Login!!</h1>
			{store.token && store.token != '' && store.token != undefined ?
				('You are logged with this token ==>', store.token)
				:
				(
					<div>
						<input type='text' placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
						<input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
						<button onClick={handleClick}>Login</button>
					</div >

				)}
		</div >
	);
};
