import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/auth/signup";
			const { data: res } = await axios.post(url, {
  name: `${data.firstName} ${data.lastName}`,
  email: data.email,
  password: data.password
});

// Auto-login: save token and user
localStorage.setItem("token", res.jwtToken);
localStorage.setItem("user", JSON.stringify({
  name: `${data.firstName} ${data.lastName}`,
  email: data.email
}));
localStorage.setItem("isLoggedIn", "true");

// Redirect to HomePage
navigate("/");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<>
			<style>{`
				.signup_container {
					width: 100%;
					min-height: 100vh;
					background-color: #f5f5f5;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.signup_form_container {
					width: 900px;
					height: 500px;
					display: flex;
					border-radius: 10px;
					box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
						0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
				}
				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-color: #3bb19b;
					border-top-left-radius: 10px;
					border-bottom-left-radius: 10px;
				}
				.left h1 {
					margin-top: 0;
					color: white;
					font-size: 35px;
					align-self: center;
				}
				.right {
					flex: 2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-color: white;
					border-top-right-radius: 10px;
					border-bottom-right-radius: 10px;
				}
				.form_container {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.form_container h1 {
					font-size: 40px;
					margin-top: 0;
					color:black;
				}
				.input {
					outline: none;
					border: none;
					width: 370px;
					padding: 15px;
					border-radius: 10px;
					background-color: #edf5f3;
					margin: 5px 0;
					font-size: 14px;
				}
				.error_msg {
					width: 370px;
					padding: 15px;
					margin: 5px 0;
					font-size: 14px;
					background-color: #f34646;
					color: white;
					border-radius: 5px;
					text-align: center;
				}
				.white_btn,
				.green_btn {
					border: none;
					outline: none;
					padding: 12px 0;
					background-color: white;
					border-radius: 20px;
					width: 180px;
					font-weight: bold;
					font-size: 14px;
					cursor: pointer;
				}
				.green_btn {
					background-color: #3bb19b;
					color: white;
					margin: 10px;
				}
			`}</style>

			<div className="signup_container">
				<div className="signup_form_container">
					<div className="left">
						<h1>Welcome Back</h1>
						<Link to="/">
							<button type="button" className="white_btn">
								Sign in
							</button>
						</Link>
					</div>
					<div className="right">
						<form className="form_container" onSubmit={handleSubmit}>
							<h1>Create Account</h1>
							<input
								type="text"
								placeholder="First Name"
								name="firstName"
								onChange={handleChange}
								value={data.firstName}
								required
								className="input"
							/>
							<input
								type="text"
								placeholder="Last Name"
								name="lastName"
								onChange={handleChange}
								value={data.lastName}
								required
								className="input"
							/>
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
								className="input"
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className="input"
							/>
							{error && <div className="error_msg">{error}</div>}
							<button type="submit" className="green_btn">
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;