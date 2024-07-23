"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const items_1 = __importDefault(require("./routes/items"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Implement CORS
class AppError extends Error {
    constructor(message, statusCode) {
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
    origin: (origin, callback) => {
        // (!origin) to allow Postman requests that comes with header: origin === undefined
        const allowPostman = !origin && process.env.NODE_ENV === 'development';
        return allowPostman || whitelist.indexOf(origin) !== -1
            ? callback(null, true) // allow request
            : callback(new AppError(`Origin: ${origin} Not allowed by CORS`, 403)); // deny request
    },
};
app.use((0, cors_1.default)(corsOptions));
// app.options('*', cors());
app.use('/api', items_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
