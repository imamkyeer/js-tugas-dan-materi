console.log('>>>> JS EVENT FORMS <<<<');

// 1. Deklarasikan SEMUA elemen HTML yang dibutuhkan di awal
const nameInput = document.getElementById('nameInput');
const nameInfo = document.getElementById('nameInfo');

// konten area preview
const previewName = document.getElementById('previewName');
const previewClass = document.getElementById('previewClass');
const previewStatus = document.getElementById('previewStatus');
const previewInterest = document.getElementById('previewInterest');
const previewReason = document.getElementById('previewReason');
const message = document.getElementById('message');



const classSelect = document.getElementById('classSelect');
 // Buat preview khusus kelas

const agrementCeckBox = document.getElementById('agreement');


// 2. Event Listener untuk Input Nama
nameInput.addEventListener('input', function(){
    const name = nameInput.value;
    console.log(`user menginput nama: ${name}`);
    
    if (nameInfo) nameInfo.textContent = `halo, ${name}`;
    if (previewName) previewName.textContent = name;
});

// 3. Event Listener untuk Pilihan Kelas
    classSelect.addEventListener('change', function(){
        const className = classSelect.value;
        console.log(`user memilih kelas: ${className}`);
        
        if (previewClass) previewClass.textContent = className;
    });

// 4. Event Listener untuk Checkbox (Perbaikan sintaks function())
    agrementCeckBox.addEventListener('change', function(){ // Tambahkan () setelah function
        const isChecked = agrementCeckBox.checked;
        console.log({isChecked});
        previewStatus.textContent = isChecked ? 'siap' : 'belum siap';
    });

    // DOMcontentloaded adalah; event yang dijalankan setelah seluruh element HTML terload
document.addEventListener('DOMContentLoaded', function(){
    alert('Welcome to coders Club!!');
});


const reasonInput = document.getElementById('reasonInput');
console.log(reasonInput);
reasonInput.addEventListener('keydown', function(e){
    console.log(`User menginput Key: ${e.key}`);
    const reason = reasonInput.value;
    previewReason.textContent = reason;
    const characterCount = document.getElementById('characterCount');
    const totalCounter = reason.length;
    characterCount.textContent = totalCounter;
    // Logika perubahan warna indicator
    if (totalCounter >= 90) {
      characterCount.style.color = "red"; // Kritis (Sisa 10 karakter)
    } else if (totalCounter >= 70) {
      characterCount.style.color = "orange"; // Peringatan (Sisa 30 karakter)
    } else {
      characterCount.style.color = "inherit"; // Normal (Kembali ke warna asli bawaan CSS)
    }
});

const registrationForm = document.getElementById('registrationForm');
const resetbutton = document.getElementById('resetButton');
resetbutton.addEventListener('click', function(){
    registrationForm.reset(); // buat reset inputan
    previewName.textContent = 'Belum diisi';
    previewClass.textContent = 'Belum dipilih';
    previewInterest.textContent = 'Belum dipilih';
    previewReason.textContent = 'Belum ada alasan...';
    previewStatus.textContent = '⏳ Belum siap dikirim';
    message.textContent = '👋 Silakan isi form. ';
});


registrationForm.addEventListener('submit', function(e){
    e.preventDefault(); // buat mencegah HTML ngirim ke server
    // pesan pendaftaran
    const confirmDialog = confirm('anda yakin mau  melanjutkan pendaftar');
        if (!confirmDialog) {
            console.log('user membatalkan pendaftaran!');
            return; // menghentikan proses submit
        }
    // jika user mengkonfirmasi, maka form akan dikirim
    console.log('form berhasil dikirim');
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    registrationForm.style.display = 'none';
});
