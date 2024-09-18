import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';

const Signup: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		try {
			await signup(username, password);
			navigate('/users'); // או לאן שתרצה לנווט אחרי הרשמה מוצלחת
		} catch (err) {
			setError('ההרשמה נכשלה. אנא נסה שם משתמש אחר או בדוק את הפרטים.');
			console.error('Signup error:', err);
		}
	};

	return (
		<div className="signup-container">
			<h2>הרשמה</h2>
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
				<button type="submit">הירשם</button>
			</form>
			<p>
				כבר יש לך חשבון? <a href="/login">התחבר כאן</a>
			</p>
		</div>
	);
};

export default Signup;
