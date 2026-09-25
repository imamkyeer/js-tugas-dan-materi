// State Management
let allProducts = [];
let filteredProducts = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const sortSelect = document.getElementById('sort-select');
const resetBtn = document.getElementById('reset-btn');
const productCounter = document.getElementById('product-counter');

// Modal DOM Elements
const productModal = document.getElementById('product-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBody = document.getElementById('modal-body');

// 1. Fetch Initial Data
async function fetchProducts() {
  try {
    productCounter.textContent = 'Memuat produk...';
    const response = await fetch('https://dummyjson.com/products?limit=100');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    allProducts = data.products;
    
    populateCategories();
    applyFilters();
  } catch (error) {
    console.error('Gagal mengambil data produk:', error);
    productGrid.innerHTML = `
      <div class="empty-state">
        <p>⚠️ Gagal memuat data produk. Periksa koneksi internet Anda.</p>
      </div>
    `;
    productCounter.textContent = '0 dari 0 product ditampilkan.';
  }
}

// 2. Populate Categories Dropdown Dynamically
function populateCategories() {
  const categories = [...new Set(allProducts.map(p => p.category))];
  
  categories.sort().forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    // Format nama kategori (kapitalisasi huruf pertama)
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

// 3. Combined Filter, Search, and Sort Logic
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;
  const selectedSort = sortSelect.value;

  // Filter Search & Category
  filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (selectedSort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'rating-desc') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === 'name-asc') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  updateCounter();
  renderProducts();
}

// 4. Render Product Cards
function renderProducts() {
  productGrid.innerHTML = '';

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <p>Tidak ada produk yang cocok dengan pencarian atau filter Anda.</p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <div class="card-img-container">
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
      </div>
      <div class="card-body">
        <span class="card-category">${product.category}</span>
        <h3 class="card-title">${product.title}</h3>
        <div class="card-info">
          <span class="card-price">$${product.price}</span>
          <span class="card-rating">⭐ ${product.rating}</span>
        </div>
        <button class="btn btn-primary" onclick="showProductDetail(${product.id})">Lihat Detail</button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

// 5. Update Counter
function updateCounter() {
  productCounter.textContent = `${filteredProducts.length} dari ${allProducts.length} product ditampilkan.`;
}

// 6. Reset Filters
function resetFilters() {
  searchInput.value = '';
  categorySelect.value = '';
  sortSelect.value = 'default';
  applyFilters();
}

// 7. Show Product Detail Modal
function showProductDetail(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  modalBody.innerHTML = `
    <div class="modal-detail">
      <div class="modal-detail-img">
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>
      <div>
        <span class="modal-badge">${product.category.toUpperCase()}</span>
        <h2>${product.title}</h2>
        <p style="color: #64748b; margin: 8px 0;"><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
        <p style="margin-bottom: 12px;">${product.description}</p>
        <div class="modal-meta">
          <div><strong>Harga:</strong> <span style="color: #059669; font-size: 1.1rem; font-weight: bold;">$${product.price}</span></div>
          <div><strong>Rating:</strong> ⭐ ${product.rating}</div>
          <div><strong>Stok:</strong> ${product.stock} unit</div>
        </div>
      </div>
    </div>
  `;

  productModal.classList.add('active');
  productModal.setAttribute('aria-hidden', 'false');
}

// 8. Close Modal
function closeModal() {
  productModal.classList.remove('active');
  productModal.setAttribute('aria-hidden', 'true');
}

// Event Listeners
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
resetBtn.addEventListener('click', resetFilters);

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Bonus: Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal.classList.contains('active')) {
    closeModal();
  }
});

// Initialize App
fetchProducts();