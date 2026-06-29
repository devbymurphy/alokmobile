const productCatalog = [
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
    availability: 'In stock',
    colors: [
      { name: 'Black', value: '#1f2937' },
      { name: 'Blue', value: '#bfdbfe' },
      { name: 'Pink', value: '#fecdd3' },
      { name: 'Green', value: '#bbf7d0' }
    ],
    specs: {
      Storage: '128GB',
      Processor: 'A16 Bionic chip',
      Camera: '48MP Main Camera',
      Display: '6.1-inch Super Retina XDR',
      Battery: 'All-day battery life',
      Warranty: '1 Year brand warranty'
    }
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
    availability: 'In stock',
    colors: [
      { name: 'Onyx Black', value: '#111827' },
      { name: 'Marble Gray', value: '#d1d5db' },
      { name: 'Cobalt Violet', value: '#8b5cf6' }
    ],
    specs: {
      Storage: '256GB',
      Display: 'Dynamic AMOLED 2X',
      Feature: 'Galaxy AI ready',
      Camera: '50MP Triple Camera',
      Battery: '4000mAh',
      Warranty: '1 Year brand warranty'
    }
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
    availability: 'In stock',
    colors: [
      { name: 'Cool Blue', value: '#60a5fa' },
      { name: 'Iron Gray', value: '#374151' }
    ],
    specs: {
      Processor: 'Snapdragon 8 Gen 2',
      Charging: '100W SUPERVOOC',
      Display: '120Hz AMOLED',
      Battery: '5500mAh',
      RAM: '8GB / 16GB options',
      Warranty: '1 Year brand warranty'
    }
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
    availability: 'In stock',
    colors: [
      { name: 'Awesome Navy', value: '#1e3a8a' },
      { name: 'Awesome Iceblue', value: '#bae6fd' }
    ],
    specs: {
      RAM: '8GB',
      Display: 'Super AMOLED',
      Battery: '5000mAh',
      Network: '5G',
      Storage: '128GB',
      Warranty: '1 Year brand warranty'
    }
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
    availability: 'In stock',
    colors: [{ name: 'White', value: '#f8fafc' }],
    specs: {
      Output: '20W',
      Port: 'USB-C',
      Type: 'Original adapter',
      Compatible: 'iPhone / iPad',
      Warranty: 'Brand warranty'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Black', value: '#111827' }, { name: 'White', value: '#f8fafc' }],
    specs: {
      Output: '25W',
      Port: 'USB-C',
      Type: 'Travel adapter',
      Compatible: 'Samsung fast charging',
      Warranty: 'Brand warranty'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Red', value: '#dc2626' }, { name: 'White', value: '#f8fafc' }],
    specs: {
      Length: '100cm',
      Connector: 'Type-C',
      Support: 'Fast charging',
      Build: 'Durable cable',
      Warranty: 'Store support'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Graphite', value: '#374151' }, { name: 'Silver', value: '#d1d5db' }],
    specs: {
      Display: '11-inch',
      Speakers: 'Quad speakers',
      Battery: '7040mAh',
      Storage: '64GB',
      Use: 'Study, entertainment, browsing'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Storm Grey', value: '#6b7280' }],
    specs: {
      Display: '10.1-inch',
      RAM: '4GB',
      Storage: '64GB',
      Mode: 'Kids Mode',
      Battery: 'Long battery life'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Jet Black', value: '#111827' }, { name: 'Rose Pink', value: '#f9a8d4' }],
    specs: {
      Calling: 'Bluetooth calling',
      Battery: 'Up to 7 days',
      Tracking: 'Health tracking',
      Modes: 'Sports modes',
      Warranty: 'Brand warranty'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Active Black', value: '#111827' }, { name: 'Deep Blue', value: '#1d4ed8' }],
    specs: {
      Calling: 'BT Calling',
      Protection: 'IP68',
      Modes: 'Sports modes',
      Display: 'HD display',
      Warranty: 'Brand warranty'
    }
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
    availability: 'In stock',
    colors: [{ name: 'Bold Black', value: '#111827' }, { name: 'Pure White', value: '#f8fafc' }],
    specs: {
      Playback: 'Up to 42 hours',
      Mic: 'ENx noise reduction',
      Charging: 'Fast charge',
      Connectivity: 'Bluetooth',
      Warranty: 'Brand warranty'
    }
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
    availability: 'Limited stock',
    colors: [{ name: 'Magico Black', value: '#111827' }, { name: 'Beam Blue', value: '#2563eb' }],
    specs: {
      Type: 'Neckband',
      Playback: '20 hours',
      Audio: 'Bass Edition',
      Charging: 'Fast charge',
      Warranty: 'Brand warranty'
    }
  }
];

const categoryLabels = {
  mobiles: 'Mobiles',
  accessories: 'Accessories',
  tablets: 'Tablets',
  smartwatches: 'Smartwatches',
  audio: 'Audio'
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initProductMotion() {
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

    document.querySelectorAll([
      '.back-link',
      '.product-gallery',
      '.product-main-info',
      '.product-price-panel',
      '.detail-section',
      '.product-extra',
      '.benefit-grid div'
    ].join(', ')).forEach((element, index) => {
      element.classList.add('product-motion-reveal');
      element.style.setProperty('--motion-delay', `${Math.min(index, 8) * 65}ms`);
      if (revealObserver) {
        revealObserver.observe(element);
      } else {
        element.classList.add('motion-visible');
      }
    });

    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll([
      '.product-gallery',
      '.product-main-info',
      '.product-price-panel',
      '.product-extra',
      '.benefit-grid div',
      '.detail-primary',
      '.detail-secondary'
    ].join(', ')).forEach(element => {
      element.classList.add('product-depth');
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
    });

    const scrollDepthTargets = document.querySelectorAll([
      '.product-gallery',
      '.product-main-info',
      '.product-price-panel',
      '.detail-section',
      '.product-extra',
      '.benefit-grid div'
    ].join(', '));

    scrollDepthTargets.forEach(element => element.classList.add('scroll-depth-3d'));

    let ticking = false;
    const update = () => {
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
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  }

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const product = productCatalog.find(item => item.id === id);
  const page = document.querySelector('.product-page');
  const detail = document.getElementById('productDetail');
  const notFound = document.getElementById('notFoundProduct');

  if (!product) {
    page.classList.add('missing');
    notFound.classList.add('active');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const categoryUrl = `stock.html?category=${product.category}`;

  document.title = `${product.name} - Alok Mobile`;
  document.getElementById('backToCategory').href = categoryUrl;
  document.getElementById('backToCategory').innerHTML = `<i data-lucide="arrow-left"></i> Back to ${categoryLabels[product.category] || 'stock'}`;
  document.getElementById('productImage').src = product.img;
  document.getElementById('productImage').alt = product.name;
  document.getElementById('productBrand').textContent = product.brand;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productRating').innerHTML = `${product.rating} <i data-lucide="star"></i>`;
  document.getElementById('productReviews').textContent = `${product.reviews} customer reviews`;
  document.getElementById('productPrice').textContent = `Rs. ${product.price.toLocaleString('en-IN')}`;
  document.getElementById('productMrp').innerHTML = `M.R.P. <s>Rs. ${product.mrp.toLocaleString('en-IN')}</s> <strong>${discount}% off</strong>`;
  document.getElementById('productAvailability').innerHTML = `<i data-lucide="check-circle-2"></i> ${product.availability} at Alok Mobile`;
  document.getElementById('productColors').innerHTML = product.colors.map(color => `
    <span class="color-chip">
      <span class="color-swatch" style="background:${color.value}"></span>
      ${color.name}
    </span>
  `).join('');
  document.getElementById('productSpecs').innerHTML = Object.entries(product.specs).map(([label, value]) => `
    <div class="spec-item">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('');

  detail.dataset.category = product.category;

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initProductMotion();
});
