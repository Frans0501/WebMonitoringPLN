import express from 'express';
import url from 'url';
import { getAllDataCollection, getAllDataSubCollection, getDataByRequest, deleteData, uploadProcessedData } from '../../utils/firebase.js';
import { get } from 'http';

const router = express.Router();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//Home Page
router.get('/', (req, res) => {
    res.send('Selamat Datang!');
});

//Login Page
router.get('/login', (req, res) => {
    const data={
        title: "Login Aplikasi",
        layout: "layouts/main-layout",
        styles: "styles/login.css",
        js: "script/loginAuth.js",
    }
    res.render("login",data);
});

router.get('/admin',async (req, res) => {
    const allData = await getAllDataCollection();
    const data={
        title: "Admin Dashboard",
        layout: "layouts/main-layout",
        styles: "styles/adminDashboard.css",
        js: "script/clock.js",
        allData,
    }
    res.render("adminDashboard",data);
});

router.get('/addUser', (req,res) => {
    const data={
        title: "Tambah User",
        layout: "layouts/main-layout",
        styles: "styles/tambahPengguna.css",
        js: "script/tambahPengguna.js",
    }
    res.render("addUser",data);
});

router.get('/hapus/:id',async (req, res) => {
    
    try{
        await deleteData(req.params.id);
        res.redirect('/admin');
    }catch(error){
        console.log(error);
    }
});

//User Page 
router.get('/user/:id',async (req, res) => {
    try{
        const dataUser = await getDataByRequest(req.params.id);
        const dataKwhUser = await getAllDataSubCollection(req.params.id);
        const data={
            title: "User",
            layout: "layouts/main-layout",
            styles: "../styles/userDashboard.css",
            js: "script/slider.js",
            dataUser,
            dataKwhUser,
        }
        res.render("userDashboard",data);
    }catch(error){
        console.log(error);
    }
});

router.get('/detailUser/:noMeteran',async (req, res) => {
    try{
        const dataUser = await getDataByRequest(req.params.noMeteran);
        const dataKwhUser = await getAllDataSubCollection(req.params.noMeteran);
        const data={
            title: "Detail User",
            layout: "layouts/main-layout",
            styles: "../styles/user.css",
            js: "script/editProfile.js",
            dataUser,
            dataKwhUser,
        }
        res.render("user",data);
    }catch(error){
        console.log(error);
    }
});

router.use("/", (req,res)=>{
    res.status(404);
    res.send("Ini adalah halaman 404");
})


export default router;