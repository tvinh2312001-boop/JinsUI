// ===== DOM Elements =====
const topbar = document.getElementById('topbar');
const navToggle = document.getElementById('nav-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const navLinks = document.getElementById('nav-links');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');

// Cart Elements (cart.html)
const cartContainer = document.getElementById('cart-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartContent = document.getElementById('cart-content');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');
const cartTotalItems = document.getElementById('cart-total-items');

let cartItems = 0;

// Mock Cart Data for Demo
let mockCartData = [
  { id: 1, name: 'Classic Square', price: 1290000, img: 'https://www.jins.com/jp/client_info/JINSJINS/itemimage/URF-26S-102/URF-26S-102_97_01.jpg', qty: 1 },
  { id: 2, name: 'Aviator Pro', price: 1890000, img: 'https://www.jins.com/jp/client_info/JINSJINS/itemimage/LMF-25S-219/LMF-25S-219_84R_01.jpg', qty: 2 }
];

// ===== Init Cart Count on all pages =====
function updateGlobalCartCount() {
  const count = mockCartData.reduce((acc, item) => acc + item.qty, 0);
  cartItems = count;
  if(cartCount) cartCount.textContent = cartItems;
}
updateGlobalCartCount();

// ===== Topbar Scroll Effect =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
});

// ===== Sidebar Toggle =====
// ===== Sidebar Toggle =====
function openSidebar() {
  sidebar.classList.add('open');
  sidebarBackdrop.classList.add('show');
  if (window.innerWidth <= 991) {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling on mobile
  }
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarBackdrop.classList.remove('show');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

// Close sidebar on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeSidebar);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    const stepLink = document.querySelector(`.step-link[href="#${sectionId}"]`);

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.step-link').forEach(l => l.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
      if (stepLink) stepLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Product Filter =====
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const products = productsGrid.querySelectorAll('.product-card');

    products.forEach((product, index) => {
      if (filter === 'all' || product.dataset.category === filter) {
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          product.style.display = '';
          requestAnimationFrame(() => {
            product.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            product.style.opacity = '1';
            product.style.transform = 'translateY(0) scale(1)';
          });
        }, index * 60);
      } else {
        product.style.transition = 'all 0.3s ease';
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          product.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===== Add to Cart =====
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = btn.dataset.name;

    // Simulate adding to mock data for demo consistency
    cartItems++;
    if(cartCount) {
      cartCount.textContent = cartItems;
      cartCount.classList.add('bounce');
      setTimeout(() => cartCount.classList.remove('bounce'), 400);
    }

    showToast(`Đã thêm "${productName}" vào giỏ hàng!`);
  });
});

// ===== Add to Wishlist =====
document.querySelectorAll('.add-to-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = btn.dataset.name;
    const svg = btn.querySelector('svg');
    
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      svg.setAttribute('fill', 'var(--color-primary)');
      svg.setAttribute('stroke', 'var(--color-primary)');
      showToast(`Đã thêm "${productName}" vào yêu thích!`);
    } else {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      showToast(`Đã bỏ "${productName}" khỏi yêu thích!`, 'info');
    }
  });
});

// ===== Cart Button Click =====
cartBtn.addEventListener('click', () => {
  if (cartItems === 0) {
    showToast('Giỏ hàng trống. Hãy thêm sản phẩm!', 'info');
  } else {
    showToast(`Bạn có ${cartItems} sản phẩm trong giỏ hàng.`, 'info');
  }
});

// ===== Toast Notification =====
let toastTimeout;

function showToast(message, type = 'success') {
  clearTimeout(toastTimeout);

  const icons = {
    success: '✅',
    info: 'ℹ️',
    error: '❌'
  };

  document.querySelector('.toast-icon').textContent = icons[type] || icons.success;
  toastMessage.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ===== Contact Form =====
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('span');
  const originalText = btnText.textContent;

  submitBtn.disabled = true;
  btnText.textContent = 'Đang gửi...';
  submitBtn.classList.add('loading');

  // Simulate form submission
  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = originalText;
    submitBtn.classList.remove('loading');
    contactForm.reset();
    showToast('Yêu cầu đã được gửi thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.');
  }, 1500);
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const numMatch = text.match(/(\d+)/);

      if (numMatch) {
        const target = parseInt(numMatch[1]);
        const suffix = text.replace(numMatch[0], '');
        let current = 0;
        const step = Math.max(1, Math.floor(target / 50));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current + suffix;
        }, 30);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== Parallax on Hero Orbs (subtle mouse effect) =====
const heroSection = document.querySelector('.hero');
const orbs = document.querySelectorAll('.hero-orb');

if (heroSection && orbs.length > 0) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 15;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    orbs.forEach(orb => {
      orb.style.transform = '';
    });
  });
}

// ===== Tilt Effect on Product Cards =====
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== Typing Effect for Hero Title (optional subtle glow pulse) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.addEventListener('mouseenter', () => {
    heroTitle.style.textShadow = '0 0 40px rgba(108, 92, 231, 0.3)';
  });
  heroTitle.addEventListener('mouseleave', () => {
    heroTitle.style.textShadow = 'none';
  });
}

// ==========================================
// ====== CART PAGE LOGIC (cart.html) =======
// ==========================================

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
}

function updateCartSummary() {
  if (!cartContainer) return;

  const totalItemsCount = mockCartData.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = mockCartData.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (cartTotalItems) cartTotalItems.textContent = totalItemsCount;
  if (summarySubtotal) summarySubtotal.textContent = formatCurrency(totalAmount);
  if (summaryTotal) summaryTotal.textContent = formatCurrency(totalAmount);
  updateGlobalCartCount();
}

function renderCart() {
  if (!cartContainer) return; // Not on the cart page

  if (mockCartData.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'flex';
    if (cartContent) cartContent.style.display = 'none';
    if (cartTotalItems) cartTotalItems.textContent = '0';
    updateGlobalCartCount();
    return;
  }

  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartContent) cartContent.style.display = 'grid';

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';
    
    mockCartData.forEach((item, index) => {
      const itemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-img">
            <img src="${item.img}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <span class="cart-item-price">${formatCurrency(item.price)}</span>
            <button class="cart-item-remove" data-index="${index}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Xoá
            </button>
          </div>
          <div class="cart-qty-controls">
            <button class="qty-btn qty-decrease" data-index="${index}">-</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" readonly>
            <button class="qty-btn qty-increase" data-index="${index}">+</button>
          </div>
          <div class="cart-item-total">${formatCurrency(item.price * item.qty)}</div>
        </div>
      `;
      cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
  }

  updateCartSummary();
  attachCartEventListeners();
}

function attachCartEventListeners() {
  if (!cartContainer) return;

  // Increase Qty
  document.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.index;
      mockCartData[idx].qty++;
      renderCart();
    });
  });

  // Decrease Qty
  document.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.index;
      if (mockCartData[idx].qty > 1) {
        mockCartData[idx].qty--;
        renderCart();
      }
    });
  });

  // Remove Item
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.index;
      const itemName = mockCartData[idx].name;
      mockCartData.splice(idx, 1);
      renderCart();
      showToast(`Đã xoá "${itemName}" khỏi giỏ hàng`, 'info');
    });
  });
}

// Init Cart Page if applicable
if (cartContainer) {
  renderCart();
}
