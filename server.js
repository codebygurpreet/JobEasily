// -------------------- Importing Modules -------------------- //
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

// -------------------- Importing Routes -------------------- //
import jobRouter from './src/routes/job.route.js';
import userRouter from './src/routes/user.route.js';

// -------------------- Initialize App -------------------- //
const app = express();

// -------------------- Session Middleware -------------------- //
app.use(session({
    secret: 'keyboard cat',  // Change in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false // Set to true in production (with HTTPS)
    }
}));

// -------------------- cookieParser Middleware -------------------- //
app.use(cookieParser());
app.use(setLastVisit);

// -------------------- Global Middleware -------------------- //
// Makes user data available in EJS views as `user`
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// -------------------- Body Parsers -------------------- //
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true })); // Parses form data

// -------------------- Static Files -------------------- //
// Public folder path: src/public (e.g., images, CSS, JS)
app.use(express.static(path.resolve("src", "public")));

// -------------------- EJS Layout Setup -------------------- //
app.use(ejsLayouts); // DRY layout mechanism
app.set('view engine', 'ejs'); // View engine: EJS
app.set('views', path.join(path.resolve(), 'src', 'views')); // Views folder
app.set('layout', 'layouts/layout'); // Default layout file

// -------------------- Register Routes -------------------- //
app.use(userRouter);
app.use(jobRouter);

// -------------------- Start Server -------------------- //
const PORT = 3200;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
