import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const Login = () => {
	 const [username, setUsername] = useState('');
		const [password, setPassword] = useState('');
		const [error, setError] = useState('');
		const navigate = useNavigate();

		const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			setError('');
			try {
				await login(username, password);
				navigate('/users'); // או לאן שתרצה לנווט אחרי התחברות מוצלחת
			} catch (err) {
				setError('התחברות נכשלה. אנא בדוק את שם המשתמש והסיסמה.');
				console.error('Login error:', err);
			}
		};

		return (
			<div className="login-container">
				<h2>התחברות</h2>
				{error && <p className="error">{error}</p>}
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">שם משתמש:</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="password">סיסמה:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit">התחבר</button>
				</form>
                <p>אין לך חשבון עדיין? <a href="/signup">הרשם כאן</a></p>
			</div>
		);
};

export default Login;