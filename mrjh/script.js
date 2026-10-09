console.log('=== SKL 2 - RECIPE FINDER ===');
// awalan $ berarti dia elemen DOM
const $searchForm = document.getElementById('search-form'); // by id value
const $searchInput = document.querySelector('#search-input'); // by id (pke #)
const $heroTag = document.querySelector('.eyebrow'); // by class (pke .)
const $heroTitle = document.querySelector('h1'); // by tag
// mengganti konten teks di elemen DOM
$heroTag.textContent = '🔥 RECIPE FINDER APP';
$heroTitle.textContent = 'Find your favorite recipe all over the world';
// menambahkan style ke elemen DOM
$heroTag.style.color = '#000';
$heroTag.style.backgroundColor = '#fff';
$heroTitle.style.color = 'gold';

// targetkan element nya secara lebih spesifik 
const $searchBtn = document.querySelector('#search-form button');

const searchValue = localStorage.getItem('searchValue');
const filters = {cuisine: 'indian', difficulty: 'sss', search: ''};
console.log({ searchValue });

$searchBtn.addEventListener('click', function (e) {
  e.preventDefault(); // mencegah halaman auto refresh atau submit
  const searchValue = $searchInput.value;
  console.log('tombol search di click');
  alert("Lakukan pencarian resep: " + searchValue);
  // menyimpan pencarian ke localStorage
  localStorage.setItem('searchValue', searchValue);
  filters.search = searchValue;
  const convertFilterDataToString = JSON.stringify(filters);
  localStorage.setItem('filter', convertFilterDataToString);
  console.log({ filters });
});


// === PERBAIKAN FUNGSI RENDER ===
function renderRecipes(recipesData) {
  const $recipeGrid = document.querySelector('#recipe-grid');
  const $loadingState = document.querySelector('#loading-state');
  
  if ($loadingState) {$loadingState.style.display = 'none';
  }

  let recipeCards = '';

  for (let i = 0; i < recipesData.length; i++) {
    const recipe = recipesData[i];
    recipeCards += `
      <article class="recipe-card">
        <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">

        <div class="recipe-body">
          <span class="recipe-cuisine">${recipe.cuisine}</span>
          <h3 class="recipe-title">${recipe.name}</h3>

          <div class="recipe-meta">
            <span>⭐️ ${recipe.rating}</span>
            <span>⏱️ ${recipe.cookTimeMinutes}</span>
            <span>${recipe.difficulty}</span>
          </div>

          <div class="recipe-actions">
            <!-- Perbaikan 1: Mengubah ${recipe.detail} menjadi ${recipe.id} -->
            <button class="detail-button" onclick="showRecipeDetail(${recipe.id})">
              View RESEP
            </button>

            <button class="like-button" onclick="toggleFavorite(${recipe.id})" title="Favorite">
              ♡
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // Perbaikan 2: Pindahkan innerHTML ke luar perulangan for
  $recipeGrid.innerHTML = recipeCards;
}


// === PERBAIKAN: MENAMBAHKAN FUNGSI DETAIL & FAVORIT ===
async function showRecipeDetail(id) {
  console.log('Menampilkan detail resep ID:', id);
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    const recipe = await response.json();

    alert(`
=== ${recipe.name.toUpperCase()} ===
Cuisine: ${recipe.cuisine}
Difficulty: ${recipe.difficulty}
Servings: ${recipe.servings}

BAHAN-BAHAN:
- ${recipe.ingredients.join('\n- ')}

INSTRUKSI:
- ${recipe.instructions.join('\n- ')}
    `);
  } catch (error) {
    console.error('Gagal mengambil detail resep:', error);
  }
}

function toggleFavorite(id) {
  console.log('Toggle favorite resep ID:', id);
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isAlreadyFavorite = favorites.includes(id);

  if (isAlreadyFavorite) {
    favorites = favorites.filter(favId => favId !== id);
    alert("Resep dengan ID " + id + " dihapus dari favorit!");
  } else {
    favorites.push(id);
    alert("Resep dengan ID " + id + " ditambahkan ke favorit!");
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}


async function getRecipesApi() {
  const response = await fetch ('https://dummyjson.com/recipes');
  const data = await response.json();
  const { recipes, total, skip, limit } = data;
  return recipes; // kembalikan data resep saja
}


async function main() {
  const RecipesData = await getRecipesApi();
  console.log(RecipesData);
  renderRecipes(RecipesData);
}

// load main function
main();