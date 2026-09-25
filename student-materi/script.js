console.log("===========================");
console.log("HSI STUDENT MANAGEMENT");
console.log("===========================");

// 1. Ambil elemen-elemen DOM dari HTML
const studentForm = document.getElementById('studentForm');
const studentNameInput = document.getElementById('studentName');
const studentScoreInput = document.getElementById('studentScore');
const studentList = document.getElementById('studentList');
const totalStudentsEl = document.getElementById('totalStudents');
const averageScoreEl = document.getElementById('averageScore');

// 2. Inisialisasi Data Siswa dari LocalStorage (atau array kosong jika tidak ada)
let students = JSON.parse(localStorage.getItem('HSI_STUDENTS')) || [];

// 3. Fungsi untuk Menyimpan Data ke LocalStorage
function saveToLocalStorage() {
  localStorage.setItem('HSI_STUDENTS', JSON.stringify(students));
}

// 4. Fungsi untuk Menghitung dan Memperbarui Statistik (Total & Rata-rata)
function updateStats() {
  const total = students.length;
  totalStudentsEl.textContent = total;

  if (total === 0) {
    averageScoreEl.textContent = "0";
    return;
  }

  const sumScore = students.reduce((acc, curr) => acc + curr.score, 0);
  const avg = (sumScore / total).toFixed(1); // Pembulatan 1 angka di belakang koma
  averageScoreEl.textContent = avg;
}

// 5. Fungsi utama untuk Render UI Daftar Siswa
function renderStudents() {
  // Jika array kosong
  if (students.length === 0) {
    studentList.innerHTML = '<div class="empty">Belum ada data siswa</div>';
    updateStats();
    return;
  }

  // Jika ada data, generate item siswa
  studentList.innerHTML = ''; // Kosongkan elemen daftar terlebih dahulu

  students.forEach((student, index) => {
    const studentItem = document.createElement('div');
    studentItem.className = 'student-item';

    studentItem.innerHTML = `
      <div>
        <span class="student-number">#${index + 1}</span>
        <span class="student-name">${student.nama}</span>
      </div>
      <div class="score">${student.score}</div>
      <button class="delete-btn" onclick="deleteStudent(${index})">Hapus</button>
    `;

    studentList.appendChild(studentItem);
  });

  // Perbarui statistik
  updateStats();
}

// 6. Event Listener: Tambah Siswa baru lewat Form
studentForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Mencegah reload halaman

  const nama = studentNameInput.value.trim();
  const score = Number(studentScoreInput.value);

  if (nama && !isNaN(score)) {
    // Tambahkan data ke array
    students.push({ nama: nama, score: score });

    // Simpan ke LocalStorage
    saveToLocalStorage();

    // Re-render UI
    renderStudents();

    // Reset Form Input
    studentForm.reset();
    studentNameInput.focus();
  }
});

// 7. Fungsi untuk Menghapus Siswa
function deleteStudent(index) {
  // Hapus item dari array berdasarkan index
  students.splice(index, 1);

  // Simpan perubahan ke LocalStorage
  saveToLocalStorage();

  // Re-render UI
  renderStudents();
}

// 8. Panggil fungsi render pertama kali saat halaman di-load
renderStudents();