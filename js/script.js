const filterButtons = document.querySelectorAll('.filter-btn');
const categoryButtons = document.querySelectorAll('.category-card');
const cards = document.querySelectorAll('.product-card');
const resetButton = document.getElementById('filterReset');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.getElementById('productSearch');
const productCount = document.getElementById('productCount');
const emptyMessage = document.getElementById('emptyMessage');

let currentCategory = 'Todos';
let currentSearch = '';

function updateCatalog() {
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = currentCategory === 'Todos' || card.dataset.category === currentCategory;
    const matchesSearch = !currentSearch || card.textContent.toLowerCase().includes(currentSearch);
    const show = matchesCategory && matchesSearch;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === currentCategory));
  productCount.textContent = `${visible} produto${visible === 1 ? '' : 's'}`;
  if (emptyMessage) emptyMessage.hidden = visible !== 0;
}

function filterProducts(category) {
  currentCategory = category;
  updateCatalog();
}

filterButtons.forEach(button => button.addEventListener('click', () => filterProducts(button.dataset.filter)));
categoryButtons.forEach(button => button.addEventListener('click', () => {
  filterProducts(button.dataset.filter);
  document.getElementById('produtos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

resetButton?.addEventListener('click', () => {
  currentCategory = 'Todos';
  currentSearch = '';
  if (searchInput) searchInput.value = '';
  updateCatalog();
});
searchInput?.addEventListener('input', event => {
  currentSearch = event.target.value.trim().toLowerCase();
  updateCatalog();
});

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();
updateCatalog();
