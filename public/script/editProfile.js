// editProfile.js

function editProfile() {
    // Menyimpan data awal ke dalam variabel sementara
    var initialData = {};
    var labels = document.querySelectorAll('.text label');
    labels.forEach(function(label) {
        var key = label.getAttribute('for');
        var value = label.nextElementSibling.querySelector('h6').innerText;
        initialData[key] = value;
    });

    // Mengganti tampilan label dengan input
    labels.forEach(function(label) {
        var input = document.createElement('input');
        input.type = 'text';
        input.id = label.getAttribute('for');
        input.value = initialData[input.id];
        label.nextElementSibling.innerHTML = ''; // Menghapus elemen yang ada di dalam td
        label.nextElementSibling.appendChild(input);
    });

    // Mengganti tombol "EDIT" menjadi "SIMPAN"
    var editButton = document.querySelector('.edit');
    editButton.textContent = 'SIMPAN';
    editButton.removeEventListener('click', editProfile); // Menghapus event listener sebelumnya
    editButton.addEventListener('click', saveProfile); // Menambahkan event listener baru
}

function saveProfile() {
    // Mengganti tampilan input dengan h6 dan mengembalikan data
    var labels = document.querySelectorAll('.text label');
    labels.forEach(function(label) {
        var input = label.nextElementSibling.querySelector('input');
        var h6 = document.createElement('h6');
        h6.innerText = input.value;
        label.nextElementSibling.innerHTML = ''; // Menghapus elemen yang ada di dalam td
        label.nextElementSibling.appendChild(h6);
    });

    // Mengganti tombol "SIMPAN" menjadi "EDIT"
    var editButton = document.querySelector('.edit');
    editButton.textContent = 'EDIT';
    editButton.removeEventListener('click', saveProfile); // Menghapus event listener sebelumnya
    editButton.addEventListener('click', editProfile); // Menambahkan event listener baru
}

const keluar = document.getElementById('keluar');
keluar.addEventListener('click', function () {
    window.location.href = "../admin";
});