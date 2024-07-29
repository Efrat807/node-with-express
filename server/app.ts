import express, { Application } from 'express';
import bodyParser from 'body-parser';
import router from './routes/items';
import connectDB from './db';
import cors from 'cors';
import { authenticateToken, generateToken } from './controllers/authController';

const app: Application = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Implement CORS

class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
 
  constructor(message: string, statusCode: number) {
    super(message);
 
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
 
    Error.captureStackTrace(this, this.constructor);
  }
}
 
// export default AppError;



const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions = {
	credentials: true, // allow cookies
	origin: (
		origin: any,
		callback: (arg0: AppError | null, arg1?: boolean | undefined) => any
	) => {
		// (!origin) to allow Postman requests that comes with header: origin === undefined
		const allowPostman = !origin && process.env.NODE_ENV === 'development';
		return allowPostman || whitelist.indexOf(origin) !== -1
			? callback(null, true) // allow request
			: callback(new AppError(`Origin: ${origin} Not allowed by CORS`, 403)); // deny request
	},
};

app.use(cors(corsOptions));
// app.options('*', cors());

app.use('/api', router);

// שימוש בפונקציות אלו בנתיבים הרלוונטיים
app.post('/login', (req, res) => {
	// בדוק את פרטי המשתמש (לדוגמה, מול מסד נתונים)
	const { username, password } = req.body;
	// אם האימות הצליח:
	const userId = '123'; // לדוגמה, מזהה המשתמש ממסד הנתונים
	const token = generateToken(userId);
	res.json({ token });
});

// דוגמה לנתיב מוגן
app.get('/protected', authenticateToken, (req: any, res) => {
	res.json({ message: 'גישה מאושרת', userId: req.user.userId });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

export default app;
