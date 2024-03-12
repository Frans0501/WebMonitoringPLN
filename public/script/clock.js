import { getDataUsers, getDataAdmin } from "./authFirebase.js";
function clock() {
    var today = new Date();

    // Update tanggal
    document.getElementById('Date').innerHTML = today.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Update jam, menit, detik
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    document.getElementById('hours').innerHTML = h;
    document.getElementById('min').innerHTML = m;
    document.getElementById('sec').innerHTML = s;
}

// Menghentikan setInterval sebelumnya agar tidak ada interval ganda
clearInterval(inter);

// Perbarui jam setiap detik
var inter = setInterval(clock, 1000);

// Pertama kali panggil fungsi untuk menampilkan jam saat halaman dimuat
clock();

const keluar = document.getElementById('keluar');
keluar.addEventListener('click', function () {
    window.location.href = "login";
});

const detail = document.getElementById('detail');
detail.addEventListener('click', function () {
    window.location.href = "../pages/detailUser.html";
});

const add = document.getElementById('add');
add.addEventListener('click', function () {
    window.location.href = "../addUser";
});