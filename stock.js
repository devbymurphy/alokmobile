const stockItems = [
  {
    id: 1,
    category: 'mobiles',
    brand: 'Apple',
    name: 'iPhone 15 128GB - Black',
    price: 69900,
    mrp: 79900,
    rating: 4.8,
    reviews: 248,
    img: 'assets/product_iphone.png',
    specs: ['128GB', 'A16 Bionic', '48MP Camera'],
    availability: 'In stock',
    featured: 1,
    offer: true
  },
  {
    id: 2,
    category: 'mobiles',
    brand: 'Samsung',
    name: 'Samsung Galaxy S24 5G - 256GB',
    price: 54999,
    mrp: 74999,
    rating: 4.7,
    reviews: 186,
    img: 'assets/product_samsung.png',
    specs: ['256GB', 'Dynamic AMOLED', 'Galaxy AI'],
    availability: 'In stock',
    featured: 2,
    offer: true
  },
  {
    id: 3,
    category: 'mobiles',
    brand: 'OnePlus',
    name: 'OnePlus 12R 5G - Cool Blue',
    price: 39999,
    mrp: 45999,
    rating: 4.6,
    reviews: 321,
    img: 'assets/product_oneplus.png',
    specs: ['Snapdragon 8 Gen 2', '100W Charge', '120Hz Display'],
    availability: 'In stock',
    featured: 3,
    offer: true
  },
  {
    id: 4,
    category: 'mobiles',
    brand: 'Samsung',
    name: 'Samsung Galaxy A35 5G - Awesome Navy',
    price: 30999,
    mrp: 36999,
    rating: 4.4,
    reviews: 142,
    img: 'assets/product_samsung.png',
    specs: ['8GB RAM', 'Super AMOLED', '5000mAh'],
    availability: 'In stock',
    featured: 4,
    offer: false
  },
  {
    id: 5,
    category: 'accessories',
    brand: 'Apple',
    name: 'Apple 20W USB-C Power Adapter',
    price: 1799,
    mrp: 1900,
    rating: 4.5,
    reviews: 94,
    img: 'assets/product_iphone.png',
    specs: ['Fast charging', 'USB-C', 'Original adapter'],
    availability: 'In stock',
    featured: 5,
    offer: false
  },
  {
    id: 6,
    category: 'accessories',
    brand: 'Samsung',
    name: 'Samsung 25W Travel Adapter',
    price: 1499,
    mrp: 1999,
    rating: 4.3,
    reviews: 78,
    img: 'assets/product_samsung.png',
    specs: ['25W', 'USB-C', 'Compact'],
    availability: 'In stock',
    featured: 6,
    offer: true
  },
  {
    id: 7,
    category: 'accessories',
    brand: 'OnePlus',
    name: 'OnePlus Type-C Cable 100cm',
    price: 799,
    mrp: 999,
    rating: 4.2,
    reviews: 61,
    img: 'assets/product_oneplus.png',
    specs: ['Type-C', 'Fast charging', 'Durable'],
    availability: 'In stock',
    featured: 7,
    offer: false
  },
  {
    id: 8,
    category: 'tablets',
    brand: 'Samsung',
    name: 'Samsung Galaxy Tab A9+ Wi-Fi',
    price: 20999,
    mrp: 26999,
    rating: 4.5,
    reviews: 88,
    img: 'assets/product_samsung.png',
    specs: ['11-inch Display', '7040mAh', 'Quad Speakers'],
    availability: 'In stock',
    featured: 8,
    offer: true
  },
  {
    id: 9,
    category: 'tablets',
    brand: 'Lenovo',
    name: 'Lenovo Tab M10 4GB RAM',
    price: 14999,
    mrp: 19999,
    rating: 4.1,
    reviews: 57,
    img: 'assets/product_oneplus.png',
    specs: ['10.1-inch', 'Kids Mode', '64GB'],
    availability: 'In stock',
    featured: 9,
    offer: true
  },
  {
    id: 10,
    category: 'smartwatches',
    brand: 'Noise',
    name: 'Noise ColorFit Pro Smartwatch',
    price: 2499,
    mrp: 5999,
    rating: 4.2,
    reviews: 206,
    img: 'assets/product_boat.png',
    specs: ['Bluetooth Calling', 'Health Tracking', '7-day Battery'],
    availability: 'In stock',
    featured: 10,
    offer: true
  },
  {
    id: 11,
    category: 'smartwatches',
    brand: 'boAt',
    name: 'boAt Wave Call 2 Smartwatch',
    price: 1899,
    mrp: 6990,
    rating: 4.0,
    reviews: 174,
    img: 'assets/product_boat.png',
    specs: ['BT Calling', 'Sports Modes', 'IP68'],
    availability: 'In stock',
    featured: 11,
    offer: true
  },
  {
    id: 12,
    category: 'audio',
    brand: 'boAt',
    name: 'boAt Airdopes 141 Bluetooth Earbuds',
    price: 1299,
    mrp: 4490,
    rating: 4.4,
    reviews: 513,
    img: 'assets/product_boat.png',
    specs: ['42H Playback', 'ENx Mic', 'Fast Charge'],
    availability: 'In stock',
    featured: 12,
    offer: true
  },
  {
    id: 13,
    category: 'audio',
    brand: 'OnePlus',
    name: 'OnePlus Bullets Wireless Z2',
    price: 1799,
    mrp: 2299,
    rating: 4.3,
    reviews: 231,
    img: 'assets/product_oneplus.png',
    specs: ['Neckband', '20H Playback', 'Bass Edition'],
    availability: 'Limited stock',
    featured: 13,
    offer: false
  }
];

const categoryLabels = {
  mobiles: 'Mobiles',
  accessories: 'Accessories',
  tablets: 'Tablets',
  smartwatches: 'Smartwatches',
  audio: 'Audio',
  offers: 'Offers'
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const params = new URLSearchParams(window.location.search);
  const activeCategory = categoryLabels[params.get('category')] ? params.get('category') : 'mobiles';
  const searchInput = document.getElementById('stockSearchInput');
  const searchForm = document.getElementById('stockSearchForm');
  const productsEl = document.getElementById('stockProducts');
  const emptyEl = document.getElementById('emptyStock');
  const stockTitle = document.getElementById('stockTitle');
  const stockCount = document.getElementById('stockCount');
  const resultsHeading = document.getElementById('resultsHeading');
  const resultsSubtext = document.getElementById('resultsSubtext');
  const sortSelect = document.getElementById('sortSelect');
  const clearFilters = document.getElementById('clearFilters');
  const inStockOnly = document.getElementById('inStockOnly');
  const offersOnly = document.getElementById('offersOnly');
  const toastContainer = document.getElementById('toastContainer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealObserver = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('motion-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' })
    : null;

  function revealElement(element, index = 0) {
    element.classList.add('stock-motion-reveal');
    element.style.setProperty('--motion-delay', `${Math.min(index, 7) * 65}ms`);
    if (!revealObserver) {
      element.classList.add('motion-visible');
      return;
    }
    revealObserver.observe(element);
  }

  function bindDepthMotion(element) {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    element.classList.add('stock-depth');
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty('--tilt-x', `${(-y * 2.2).toFixed(2)}deg`);
      element.style.setProperty('--tilt-y', `${(x * 2.6).toFixed(2)}deg`);
      element.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      element.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--glow-x', '50%');
      element.style.setProperty('--glow-y', '50%');
    });
  }

  const scrollDepthTargets = new Set();
  let scrollDepthTicking = false;

  function bindScrollDepth(element) {
    if (reduceMotion) return;
    element.classList.add('scroll-depth-3d');
    scrollDepthTargets.add(element);
    requestScrollDepthUpdate();
  }

  function updateScrollDepth() {
    const viewportCenter = window.innerHeight / 2;
    scrollDepthTargets.forEach(element => {
      const rect = element.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, (itemCenter - viewportCenter) / viewportCenter));
      element.style.setProperty('--scroll-tilt-x', `${(-progress * 5.5).toFixed(2)}deg`);
      element.style.setProperty('--scroll-depth-y', `${(-progress * 16).toFixed(1)}px`);
      element.style.setProperty('--scroll-depth-z', `${((1 - Math.abs(progress)) * 30).toFixed(1)}px`);
      element.style.setProperty('--scroll-depth-glow', (1 - Math.abs(progress)).toFixed(3));
    });
    scrollDepthTicking = false;
  }

  function requestScrollDepthUpdate() {
    if (!scrollDepthTicking) {
      window.requestAnimationFrame(updateScrollDepth);
      scrollDepthTicking = true;
    }
  }

  if (!reduceMotion) {
    window.addEventListener('scroll', requestScrollDepthUpdate, { passive: true });
    window.addEventListener('resize', requestScrollDepthUpdate);
  }

  [
    document.querySelector('.stock-hero'),
    document.querySelector('.stock-tabs'),
    document.querySelector('.stock-filters'),
    document.querySelector('.results-toolbar')
  ].filter(Boolean).forEach((element, index) => {
    revealElement(element, index);
    bindDepthMotion(element);
    bindScrollDepth(element);
  });

  document.querySelectorAll('.stock-tabs a').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.category === activeCategory);
  });

  stockTitle.textContent = categoryLabels[activeCategory];
  resultsHeading.textContent = `${categoryLabels[activeCategory]} Stock`;

  function rupee(value) {
    return `Rs. ${value.toLocaleString('en-IN')}`;
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="phone"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    setTimeout(() => toast.remove(), 3000);
  }

  function checkedValues(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
  }

  function selectedValue(name) {
    return document.querySelector(`input[name="${name}"]:checked`)?.value || 'all';
  }

  function inPriceRange(item, value) {
    if (value === 'all') return true;
    const [min, max] = value.split('-').map(Number);
    return item.price >= min && item.price <= max;
  }

  function sourceItems() {
    if (activeCategory === 'offers') {
      return stockItems.filter(item => item.offer);
    }
    return stockItems.filter(item => item.category === activeCategory);
  }

  function sortItems(items) {
    const sorted = [...items];
    const sortBy = sortSelect.value;

    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'discount') sorted.sort((a, b) => ((b.mrp - b.price) / b.mrp) - ((a.mrp - a.price) / a.mrp));
    if (sortBy === 'featured') sorted.sort((a, b) => a.featured - b.featured);

    return sorted;
  }

  function filterItems() {
    const query = searchInput.value.trim().toLowerCase();
    const brands = checkedValues('brand');
    const price = selectedValue('price');
    const rating = selectedValue('rating');

    return sourceItems().filter(item => {
      const matchesQuery = !query || `${item.name} ${item.brand} ${item.specs.join(' ')}`.toLowerCase().includes(query);
      const matchesBrand = brands.length === 0 || brands.includes(item.brand);
      const matchesPrice = inPriceRange(item, price);
      const matchesRating = rating === 'all' || item.rating >= Number(rating);
      const matchesStock = !inStockOnly.checked || item.availability !== 'Out of stock';
      const matchesOffer = !offersOnly.checked || item.offer;

      return matchesQuery && matchesBrand && matchesPrice && matchesRating && matchesStock && matchesOffer;
    });
  }

  function render() {
    const items = sortItems(filterItems());
    productsEl.innerHTML = '';
    emptyEl.classList.toggle('active', items.length === 0);
    stockCount.textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
    resultsSubtext.textContent = items.length
      ? `Showing ${items.length} matching product${items.length === 1 ? '' : 's'} from Alok Mobile`
      : 'No products match the selected filters';

    items.forEach((item, index) => {
      const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
      const card = document.createElement('article');
      card.className = `stock-card ${item.availability === 'Out of stock' ? 'out' : ''}`;
      card.dataset.href = `product.html?id=${item.id}`;
      card.innerHTML = `
        <a class="stock-img-box" href="product.html?id=${item.id}">
          <img src="${item.img}" alt="${item.name}">
        </a>
        <div class="stock-info">
          <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
          <div class="stock-rating">
            <span class="rating-pill">${item.rating} <i data-lucide="star"></i></span>
            <span>${item.reviews} customer reviews</span>
          </div>
          <div class="stock-specs">
            ${item.specs.map(spec => `<span>${spec}</span>`).join('')}
          </div>
          <p class="stock-line"><strong>Brand:</strong> ${item.brand}</p>
          <p class="stock-line">Store pickup available after confirmation call.</p>
        </div>
        <div class="stock-buy">
          <div class="stock-price">${rupee(item.price)}</div>
          <div class="stock-mrp">M.R.P. <s>${rupee(item.mrp)}</s> <span class="stock-discount">${discount}% off</span></div>
          <div class="stock-availability"><i data-lucide="check-circle-2"></i> ${item.availability}</div>
          <div class="stock-actions">
            <a class="stock-action-primary" href="product.html?id=${item.id}" data-name="${item.name}">
              <i data-lucide="shopping-bag"></i> Check Product
            </a>
            <a class="stock-action-secondary" href="tel:+919840912345">
              <i data-lucide="phone"></i> Call Store
            </a>
          </div>
        </div>
      `;
      productsEl.appendChild(card);
      revealElement(card, index);
      bindDepthMotion(card);
      bindScrollDepth(card);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  document.querySelectorAll('.stock-filters input').forEach(input => {
    input.addEventListener('change', render);
  });

  sortSelect.addEventListener('change', render);

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    render();
  });

  searchInput.addEventListener('input', render);

  clearFilters.addEventListener('click', () => {
    document.querySelectorAll('input[name="brand"]').forEach(input => {
      input.checked = false;
    });
    document.querySelector('input[name="price"][value="all"]').checked = true;
    document.querySelector('input[name="rating"][value="all"]').checked = true;
    inStockOnly.checked = true;
    offersOnly.checked = false;
    searchInput.value = '';
    sortSelect.value = 'featured';
    render();
  });

  productsEl.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    const card = event.target.closest('.stock-card');
    if (!card?.dataset.href) return;
    if (window.startPageTransition) {
      window.startPageTransition(new URL(card.dataset.href, window.location.href).href);
      return;
    }
    window.location.href = card.dataset.href;
  });

  render();
});
