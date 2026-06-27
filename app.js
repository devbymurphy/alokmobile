/**
 * Alok Mobile - Main Application Javascript File
 * Handles search autocomplete, modals, feedback forms, and notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Reveal homepage blocks as they enter the viewport.
  const revealTargets = document.querySelectorAll([
    '.features-bar-container',
    '.bar-feature-item',
    '.card-section',
    '.product-card',
    '.feedback-card',
    '.footer-col'
  ].join(', '));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach(target => target.classList.add('reveal-visible'));
  }

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
