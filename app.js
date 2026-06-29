/**
 * Alok Mobile - Main Application Javascript File
 * Handles search autocomplete, modals, feedback forms, and notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const amount = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      document.body.style.setProperty('--scroll-progress', amount.toFixed(4));
      progress.style.transform = `scaleX(${amount})`;
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

  function initCustomReveal() {
    const revealTargets = document.querySelectorAll([
      '.hero-feature-item',
      '.hero-buttons .btn',
      '.why-shop-widget',
      '.features-bar-container',
      '.bar-feature-item',
      '.card-section',
      '.story-content',
      '.story-image-box',
      '.visit-content',
      '.visit-image-box',
      '.product-card',
      '.feedback-card',
      '.review-item',
      '.insta-grid-item',
      '.footer-col'
    ].join(', '));

    const motionTypes = ['motion-rise', 'motion-slice', 'motion-drift-left', 'motion-drift-right', 'motion-zoom'];

    if (!('IntersectionObserver' in window) || reduceMotion) {
      revealTargets.forEach(target => target.classList.add('scroll-reveal', 'reveal-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -70px 0px'
    });

    revealTargets.forEach((target, index) => {
      const type = target.classList.contains('story-image-box') || target.classList.contains('visit-image-box')
        ? 'motion-slice'
        : motionTypes[index % motionTypes.length];
      target.classList.add('scroll-reveal', type);
      target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
      revealObserver.observe(target);
    });
  }

  function initPointerDepth() {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll([
      '.product-card',
      '.feedback-card',
      '.card-section',
      '.features-bar-container',
      '.why-shop-widget',
      '.action-btn',
      '.btn'
    ].join(', ')).forEach(card => {
      card.classList.add('motion-depth');
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${(-y * 2.4).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 2.8).toFixed(2)}deg`);
        card.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '50%');
      });
    });
  }

  function initScrollDepth() {
    if (reduceMotion) return;

    const depthTargets = document.querySelectorAll([
      '.hero-content',
      '.why-shop-widget',
      '.features-bar-container',
      '.card-section',
      '.product-card',
      '.feedback-card',
      '.footer-col'
    ].join(', '));

    depthTargets.forEach((target, index) => {
      target.classList.add('scroll-depth-3d');
      target.style.setProperty('--depth-index', index % 5);
    });

    let ticking = false;
    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      depthTargets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, (itemCenter - viewportCenter) / viewportCenter));
        target.style.setProperty('--scroll-tilt-x', `${(-progress * 6).toFixed(2)}deg`);
        target.style.setProperty('--scroll-depth-y', `${(-progress * 18).toFixed(1)}px`);
        target.style.setProperty('--scroll-depth-z', `${((1 - Math.abs(progress)) * 34).toFixed(1)}px`);
        target.style.setProperty('--scroll-depth-glow', (1 - Math.abs(progress)).toFixed(3));
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

  initScrollProgress();
  initCustomReveal();
  initPointerDepth();
  initScrollDepth();

  // --- Core State Variables ---
  let wishlistCount = 0;

  // Static list of products for search and dropdown matching
  const allProducts = [
    { id: '1', name: 'iPhone 15', price: 69900, img: 'assets/product_iphone.png' },
    { id: '2', name: 'Samsung S24', price: 54999, img: 'assets/product_samsung.png' },
    { id: '3', name: 'OnePlus 12R', price: 39999, img: 'assets/product_oneplus.png' },
    { id: '4', name: 'boAt Airdopes 141', price: 1299, img: 'assets/product_boat.png' }
  ];

  // --- Element Selectors ---
  const wishlistBadge = document.getElementById('wishlistBadge');
  const wishlistBtn = document.getElementById('wishlistBtn');

  // Category Dropdown
  const categoryToggle = document.getElementById('categoryToggle');
  const categoryMenu = document.getElementById('categoryMenu');

  // Search
  const searchInput = document.getElementById('searchInput');
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');

  // Story Modal
  const openStoryModalBtn = document.getElementById('openStoryModalBtn');
  const storyModal = document.getElementById('storyModal');
  const closeStoryModalBtn = document.getElementById('closeStoryModalBtn');
  const storyModalOverlay = document.getElementById('storyModalOverlay');

  // Contact Modal
  const contactActionBtn = document.querySelector('.contact-action');
  const contactModal = document.getElementById('contactModal');
  const closeContactModalBtn = document.getElementById('closeContactModalBtn');
  const contactModalOverlay = document.getElementById('contactModalOverlay');

  // Get Directions Button
  const getDirectionsBtn = document.getElementById('getDirectionsBtn');

  // Forms
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const toastContainer = document.getElementById('toastContainer');

  // --- Toast Notification helper ---
  function showToast(message, icon = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: {
          class: ['lucide', 'toast-icon']
        }
      });
    }

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // --- Wishlist Interaction ---
  if (wishlistBtn && wishlistBadge) {
    wishlistBtn.addEventListener('click', () => {
      wishlistCount += 1;
      wishlistBadge.textContent = wishlistCount;
      wishlistBadge.style.display = 'block';
      showToast('Added item to your Wishlist!', 'heart');
    });
  }

  // --- Store Link Centered Scroll ---
  document.querySelectorAll('a[href="#store-locator"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      history.pushState(null, '', `#${targetId}`);
    });
  });

  // --- Contact Modal Handlers ---
  function openContactModal() {
    contactModal.classList.add('active');
  }

  function closeContactModal() {
    contactModal.classList.remove('active');
  }

  if (contactActionBtn && contactModal && closeContactModalBtn && contactModalOverlay) {
    contactActionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
    closeContactModalBtn.addEventListener('click', closeContactModal);
    contactModalOverlay.addEventListener('click', closeContactModal);
  }

  // --- Category Menu Dropdown ---
  categoryToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    categoryToggle.classList.toggle('active');
    categoryMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!categoryToggle.contains(e.target) && !categoryMenu.contains(e.target)) {
      categoryToggle.classList.remove('active');
      categoryMenu.classList.remove('active');
    }
  });

  // --- Story Modal Handlers ---
  function openStoryModal() {
    storyModal.classList.add('active');
  }

  function closeStoryModal() {
    storyModal.classList.remove('active');
  }

  openStoryModalBtn.addEventListener('click', openStoryModal);
  closeStoryModalBtn.addEventListener('click', closeStoryModal);
  storyModalOverlay.addEventListener('click', closeStoryModal);

  // --- Directions Button click handler ---
  getDirectionsBtn.addEventListener('click', () => {
    showToast('Opening Google Maps directions...', 'map-pin');
    setTimeout(() => {
      window.open('https://maps.google.com/?q=Alok+Mobile+Mangawa+Rewa+Madhya+Pradesh', '_blank');
    }, 800);
  });

  // --- Newsletter Submission Form ---
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (email) {
      showToast('Thank you! You are subscribed to our newsletter.', 'check-circle');
      newsletterEmail.value = '';
    }
  });

  // --- Search Filtering and Auto-suggestions ---
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    
    if (val.length === 0) {
      searchResults.innerHTML = '';
      searchResults.classList.remove('active');
      
      // Reset product card visibility
      document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'flex';
      });
      return;
    }

    // Filter products
    const matches = allProducts.filter(p => p.name.toLowerCase().includes(val));
    
    // Render suggestions
    searchResults.innerHTML = '';
    if (matches.length > 0) {
      searchResults.classList.add('active');
      matches.forEach(item => {
        const row = document.createElement('div');
        row.className = 'search-item';
        row.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div class="search-item-info">
            <h4>${item.name}</h4>
            <span>₹${item.price.toLocaleString('en-IN')}</span>
          </div>
        `;
        row.addEventListener('click', () => {
          searchInput.value = item.name;
          searchResults.classList.remove('active');
          
          // Focus view on the product grid and show only selection
          document.querySelectorAll('.product-card').forEach(card => {
            const cardName = card.getAttribute('data-name');
            if (cardName.includes(item.name.toLowerCase())) {
              card.style.display = 'flex';
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              card.style.display = 'none';
            }
          });
        });
        searchResults.appendChild(row);
      });
    } else {
      searchResults.innerHTML = '<div style="padding: 12px; font-size: 0.8rem; color: #94a3b8; text-align: center;">No matches found</div>';
      searchResults.classList.add('active');
    }
  });

  // Handle outside clicks to close search suggestions
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });

  // Form submit blocks reload, scrolls to grid matches
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    searchResults.classList.remove('active');
    
    if (!query) return;

    let hasMatches = false;
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.getAttribute('data-name');
      if (name.includes(query)) {
        card.style.display = 'flex';
        hasMatches = true;
      } else {
        card.style.display = 'none';
      }
    });

    if (hasMatches) {
      document.getElementById('top-picks').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      showToast(`No matches found for "${query}"`, 'search');
    }
  });

  // Initialize UI components
});
