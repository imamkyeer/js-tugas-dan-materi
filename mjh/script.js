// State Management
let allRecipes = [];
let filteredRecipes = [];

// DOM Elements
const recipeGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const sortSelect = document.getElementById('sort-select');
const resetBtn = document.getElementById('reset-btn');
const recipeCounter = document.getElementById('product-counter');

// Modal DOM Elements
const recipeModal = document.getElementById('product-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBody = document.getElementById('modal-body');

// 1. Fetch Initial Data dari DummyJSON Recipes
async function fetchRecipes() {
  try {
    recipeCounter.textContent = 'Memuat resep...';
    const response = await fetch('https://dummyjson.com/recipes?limit=100');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    allRecipes = data.recipes;
    
    populateCategories();
    applyFilters();
  } catch (error) {
    console.error('Gagal mengambil data resep:', error);
    recipeGrid.innerHTML = `
      <div class="empty-state">
        <p>⚠️ Gagal memuat data resep. Periksa koneksi internet Anda.</p>
      </div>
    `;
    recipeCounter.textContent = '0 dari 0 resep ditampilkan.';
  }
}

// 2. Opsi Dropdown Masakan (Cuisine)
function populateCategories() {
  const cuisines = [...new Set(allRecipes.map(r => r.cuisine))];
  
  cuisines.sort().forEach(cuisine => {
    const option = document.createElement('option');
    option.value = cuisine;
    option.textContent = cuisine;
    categorySelect.appendChild(option);
  });
}

// 3. Logika Filter, Search, dan Sort
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCuisine = categorySelect.value;
  const selectedSort = sortSelect.value;

  // Filter Search & Cuisine
  filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchValue) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchValue));
    const matchesCuisine = selectedCuisine === '' || recipe.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  // Sorting
  if (selectedSort === 'time-asc') {
    filteredRecipes.sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
  } else if (selectedSort === 'time-desc') {
    filteredRecipes.sort((a, b) => b.cookTimeMinutes - a.cookTimeMinutes);
  } else if (selectedSort === 'rating-desc') {
    filteredRecipes.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === 'name-asc') {
    filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
  }

  updateCounter();
  renderRecipes();
}

// 4. Render Kartu Resep
function renderRecipes() {
  recipeGrid.innerHTML = '';

  if (filteredRecipes.length === 0) {
    recipeGrid.innerHTML = `
      <div class="empty-state">
        <p>Tidak ada resep yang cocok dengan pencarian atau filter Anda.</p>
      </div>
    `;
    return;
  }

  filteredRecipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <div class="card-img-container">
        <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      </div>
      <div class="card-body">
        <span class="card-category">${recipe.cuisine} • ${recipe.difficulty}</span>
        <h3 class="card-title">${recipe.name}</h3>
        <div class="card-info">
          <span class="card-price">⏱️ ${recipe.cookTimeMinutes} menit</span>
          <span class="card-rating">⭐ ${recipe.rating}</span>
        </div>
        <button class="btn btn-primary" onclick="showRecipeDetail(${recipe.id})">Lihat Resep</button>
      </div>
    `;

    recipeGrid.appendChild(card);
  });
}

// 5. Update Counter Status
function updateCounter() {
  recipeCounter.textContent = `${filteredRecipes.length} dari ${allRecipes.length} resep ditampilkan.`;
}

// 6. Reset Filters
function resetFilters() {
  searchInput.value = '';
  categorySelect.value = '';
  sortSelect.value = 'default';
  applyFilters();
}

// 7. Tampilkan Modal Detail Resep
function showRecipeDetail(recipeId) {
  const recipe = allRecipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
  const instructionsList = recipe.instructions.map(inst => `<li>${inst}</li>`).join('');

  modalBody.innerHTML = `
    <div class="modal-detail">
      <div class="modal-detail-img">
        <img src="${recipe.image}" alt="${recipe.name}">
      </div>
      <div>
        <span class="modal-badge">${recipe.cuisine.toUpperCase()} • ${recipe.difficulty.toUpperCase()}</span>
        <h2>${recipe.name}</h2>
        <div class="modal-meta">
          <div><strong>⏱️ Prep:</strong> ${recipe.prepTimeMinutes} mnt</div>
          <div><strong>🍳 Cook:</strong> ${recipe.cookTimeMinutes} mnt</div>
          <div><strong>🍽️ Servings:</strong> ${recipe.servings} porsi</div>
          <div><strong>⭐ Rating:</strong> ${recipe.rating}</div>
        </div>
        
        <div class="recipe-section">
          <h3>🛒 Bahan-Bahan:</h3>
          <ul class="recipe-list">${ingredientsList}</ul>
        </div>

        <div class="recipe-section">
          <h3>👨‍🍳 Langkah Pembuatan:</h3>
          <ol class="recipe-list">${instructionsList}</ol>
        </div>
      </div>
    </div>
  `;

  recipeModal.classList.add('active');
  recipeModal.setAttribute('aria-hidden', 'false');
}

// 8. Close Modal
function closeModal() {
  recipeModal.classList.remove('active');
  recipeModal.setAttribute('aria-hidden', 'true');
}

// Event Listeners
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
resetBtn.addEventListener('click', resetFilters);

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal via Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && recipeModal.classList.contains('active')) {
    closeModal();
  }
});

// Initialize App
fetchRecipes();