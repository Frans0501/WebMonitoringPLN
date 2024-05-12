const loginText = document.querySelector(".title-text .admin");
const loginForm = document.querySelector("form.admin");
const loginBtn = document.querySelector("label.admin");
const signupBtn = document.querySelector("label.user");
const signupLink = document.querySelector("form .user-link a");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
//   loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
//   loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

// Fungsi untuk mengubah status dan menyimpan ke Firestore
function updateStatusAndSaveToFirestore(itemId, newStatus) {
  // Lakukan operasi untuk mengubah status pada Firestore
  // Misalnya, jika Anda menggunakan Firebase Firestore:
  firebase.firestore().collection('dataKwhUser').doc(itemId).update({
    status: newStatus
  })
  .then(() => {
    console.log("Status berhasil diperbarui dan disimpan ke Firestore");
  })
  .catch((error) => {
    console.error("Error updating status: ", error);
  });
}

// Fungsi untuk menangani klik pada elemen status
function handleStatusClick(itemId, currentStatus) {
  // Ubah status dari 'paid' menjadi 'unpaid', atau sebaliknya
  const newStatus = currentStatus === 'paid' ? 'unpaid' : 'paid';
  
  // Panggil fungsi untuk mengubah status dan menyimpan ke Firestore
  updateStatusAndSaveToFirestore(itemId, newStatus);
}

// Menggunakan event delegation untuk menangani klik pada elemen status
document.addEventListener('click', function(event) {
  const targetElement = event.target;
  // Periksa apakah yang diklik adalah elemen dengan class 'status'
  if (targetElement.classList.contains('status')) {
    // Dapatkan ID item dari parent elemen <tr>
    const itemId = targetElement.closest('tr').getAttribute('data-id');
    // Dapatkan status saat ini dari class elemen
    const currentStatus = targetElement.classList.contains('paid') ? 'paid' : 'unpaid';
    // Panggil fungsi untuk menangani klik pada status
    handleStatusClick(itemId, currentStatus);
  }
});
