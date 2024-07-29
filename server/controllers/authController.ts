import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // בפרויקט אמיתי, שמור זאת כמשתנה סביבה

// פונקציה ליצירת טוקן
export const generateToken = (userId: string): string => {
	return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

// מידלוור לאימות הטוקן
export const authenticateToken = (req: any, res: any, next: any) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};


