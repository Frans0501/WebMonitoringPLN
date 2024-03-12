import express from 'express';
import router from './router/index.js';
import path from 'path'
import ejs from 'ejs'
import url from 'url'
import expressEjsLayouts from 'express-ejs-layouts';
import { initializeFirebaseApp } from '../utils/firebase.js';

const app = express();
const port = 3000;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
initializeFirebaseApp();

//middleware
app.set("views", path.join(__dirname,"views"));
app.engine("html", ejs.renderFile);
app.set("view engine","ejs");
app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, "../public"))); 
app.use(router)

app.listen(port, () => {
    console.log(`aplikasi anda berjalan pada http://localhost:${port}`);
});