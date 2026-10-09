console.log('=== MATERI 5 - CONSUME API ===');
const API_URL = 'https://dummyjson.com/products';

const loadingState = document.getElementById('loading-state');
const productGrid = document.getElementById('product-grid');
const resultSummary = document.getElementById('result-summary');
const categorySelect = document.getElementById('category-select');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-btn');

function renderProduct(dataProducts) {
  productGrid.innerHTML = ''; // reset product grid
  dataProducts.map((dataProduct) => {
    const { id, title, price, category, thumbnail, rating } = dataProduct;
    loadingState.hidden = true; // sembunyikan area loading
    resultSummary.hidden = true; // sembunyikan area result summary
    productGrid.hidden = false; // munculkan area product grid
    // += adalah operator concatenation untuk menggabungkan string
    productGrid.innerHTML += `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${thumbnail}" alt="${title}" loading="lazy">
        </div>

        <div class="product-body">
          <span class="product-category">
            ${category}
          </span>

          <h3 class="product-title">
            ${title}
          </h3>

          <div class="product-meta">
            <span class="product-price">
              $${price}
            </span>

            <span class="product-rating">
              ⭐ ${rating}
            </span>
          </div>

          <button type="button" class="detail-btn" data-id="${id}">
            Lihat Detail
          </button>
        </div>
      </article>
    `;
  });
}

// function di variable disebut juga anonymous function
const getProductsApi = async (category) => {
  // ternary operator untuk mengisi nilai kondisi dalam 1 baris
  // --- kondisi ? klo true : klo false ---
  const targetUrl = category ? `${API_URL}/category/${category}` : API_URL;
  const response = await fetch(targetUrl); // mengambil response dari API
  const data = await response.json(); // data dijadikan object javascript
  const { products, total, limit } = data; // destructuring assignment
  // console.log({ products, total, limit }); 
  // data products dalam bentuk array objects
  // return products;
  // generate 1 product berdasarkan index
  // renderProduct(products[17]);
  renderProduct(products);
}

const getProductCategoriesApi = async () => {
  const response = await fetch(`${API_URL}/categories`);
  const data = await response.json(); 
  categorySelect.innerHTML = '<option value="all">Semua kategori</option>';
  data.map((item) => {
    const { slug, name } = item;
    categorySelect.innerHTML += `
      <option value="${slug}">${name}</option>
    `;
  });
}

// saat dropdown kategori berubah
categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  getProductsApi(selectedCategory);  
});

// reset semua state filter
resetBtn.addEventListener('click', () => {
  categorySelect.value = 'all';
  sortSelect.value = 'default';
  searchInput.value = '';
  getProductsApi();
});

getProductCategoriesApi();
getProductsApi();
