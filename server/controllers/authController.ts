import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req: any, res: any) => {
	try {
		const { username, password } = req.body;

		// בדיקה אם המשתמש כבר קיים
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'שם המשתמש כבר תפוס' });
		}

		// הצפנת הסיסמה
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// יצירת משתמש חדש
		const newUser = new User({
			username,
			password: hashedPassword,
		});

		// שמירת המשתמש במסד הנתונים
		await newUser.save();

		// יצירת טוקן JWT
		const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

		// שליחת תגובה עם הטוקן
		res.status(201).json({
			message: 'המשתמש נוצר בהצלחה',
			token,
			user: {
				id: newUser._id,
				firstName: newUser.firstName,
			},
		});
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).json({ message: 'שגיאה בשרת בעת יצירת המשתמש' });
	}
};

export const login = async (req: any, res: any) => {
	try {
		const { username, password } = req.body;
		console.log(username);
    

		// בדיקה אם המשתמש קיים
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: 'שם משתמש או סיסמה לא נכונים' });
		}

		// בדיקת הסיסמה
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: 'שם משתמש או סיסמה לא נכונים' });
		}

		// יצירת טוקן JWT
		const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

		// שליחת תגובה עם הטוקן
		res.json({
			message: 'התחברות בוצעה בהצלחה',
			token,
			user: {
				id: user._id,
				username: user.firstName,
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'שגיאה בשרת בעת התחברות' });
	}
};

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
