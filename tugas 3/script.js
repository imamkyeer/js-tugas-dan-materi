// ==========================================
// HSI STUDENT MANAGEMENT - CRUD & LOCALSTORAGE
// ==========================================

// 1. Ambil Elemen DOM
const studentForm = document.getElementById('studentForm');
const studentIdInput = document.getElementById('studentId');
const studentNameInput = document.getElementById('studentName');
const studentScoreInput = document.getElementById('studentScore');
const studentList = document.getElementById('studentList');
const totalStudentsEl = document.getElementById('totalStudents');
const averageScoreEl = document.getElementById('averageScore');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const alertMessage = document.getElementById('alertMessage');

let isEditMode = false;
let alertTimer = null;

// 2. Inisialisasi Data dari LocalStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// 3. Simpan ke LocalStorage
function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
}

// 4. Tampilkan Alert Notifikasi (Otomatis Hilang dalam 3 Detik)
function showAlert(message, type) {
  clearTimeout(alertTimer);
  alertMessage.innerHTML = `<div class="alert alert-${type}">${message}</div>`;

  alertTimer = setTimeout(() => {
    alertMessage.innerHTML = '';
  }, 3000);
}

// 5. Update Statistik Total & Rata-rata Nilai
function updateStats() {
  const total = students.length;
  totalStudentsEl.textContent = total;

  if (total === 0) {
    averageScoreEl.textContent = '0';
    return;
  }

  const totalScore = students.reduce((sum, s) => sum + s.score, 0);
  const avg = (totalScore / total).toFixed(1);
  averageScoreEl.textContent = avg;
}

// 6. Render Daftar Student (Read)
function renderStudents() {
  studentList.innerHTML = '';

  if (students.length === 0) {
    studentList.innerHTML = '<div class="empty">Belum ada data siswa</div>';
    updateStats();
    return;
  }

  students.forEach((student, index) => {
    const item = document.createElement('div');
    item.className = 'student-item';

    item.innerHTML = `
      <div>
        <span class="student-number">#${index + 1}</span>
        <span class="student-name">${student.name}</span>
      </div>
      <div class="score">${student.score}</div>
      <button class="edit-btn" onclick="editStudent(${student.id})">✏️ Ubah</button>
      <button class="delete-btn" onclick="deleteStudent(${student.id})">🗑️ Hapus</button>
    `;

    studentList.appendChild(item);
  });

  updateStats();
}

// 7. Tambah Student Baru (Create)
function addStudent(name, score) {
  const newStudent = {
    id: Date.now(), // Unique ID berdasarkan timestamp
    name: name,
    score: score
  };

  students.push(newStudent);
  saveStudents();
  renderStudents();
  showAlert(`✅ Data siswa ${name} berhasil ditambahkan.`, 'add');
}

// 8. Masuk ke Mode Edit (Persiapan Update)
function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  isEditMode = true;
  studentIdInput.value = student.id;
  studentNameInput.value = student.name;
  studentScoreInput.value = student.score;

  // Ubah Tampilan Form ke Mode Update
  formTitle.textContent = '✏️ Edit Siswa';
  submitBtn.textContent = '💾 Update Siswa';
  cancelEditBtn.style.display = 'inline-block';

  studentNameInput.focus();
}

// 9. Simpan Perubahan Edit (Update)
function updateStudent(id, newName, newScore) {
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex !== -1) {
    students[studentIndex].name = newName;
    students[studentIndex].score = newScore;

    saveStudents();
    renderStudents();
    showAlert(`🔄 Data siswa ${newName} berhasil diperbarui.`, 'update');
    resetForm();
  }
}

// 10. Hapus Student (Delete)
function deleteStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  const isConfirmed = confirm(`Apakah kamu yakin ingin menghapus siswa ${student.name}?`);

  if (isConfirmed) {
    students = students.filter(s => s.id !== id);
    saveStudents();
    renderStudents();
    showAlert(`🗑️ Data siswa ${student.name} berhasil dihapus.`, 'delete');

    // Jika sedang mengedit siswa yang terhapus, reset formnya
    if (isEditMode && Number(studentIdInput.value) === id) {
      resetForm();
    }
  }
}

// 11. Reset Form Input ke Kondisi Awal
function resetForm() {
  studentForm.reset();
  studentIdInput.value = '';
  isEditMode = false;

  formTitle.textContent = '➕ Tambah Siswa';
  submitBtn.textContent = '➕ Tambah Siswa';
  cancelEditBtn.style.display = 'none';
}

// 12. Event Listener Form Submission
studentForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = studentNameInput.value.trim();
  const score = Number(studentScoreInput.value);

  if (!name || isNaN(score)) return;

  if (isEditMode) {
    const id = Number(studentIdInput.value);
    updateStudent(id, name, score);
  } else {
    addStudent(name, score);
    resetForm();
  }
});

// Event Listener Batal Edit
cancelEditBtn.addEventListener('click', resetForm);

// Initial Render saat Halaman Dimuat
renderStudents();