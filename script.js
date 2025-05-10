// Sidebar active state
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Quantity selector
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');
const qtyInput = document.getElementById('qtyInput');
decreaseBtn.addEventListener('click', () => {
  let val = parseInt(qtyInput.value);
  if (val > 1) qtyInput.value = val - 1;
});
increaseBtn.addEventListener('click', () => {
  let val = parseInt(qtyInput.value);
  if (val < 5) qtyInput.value = val + 1;
});

// Image gallery
const mainImg = document.getElementById('mainProductImg');
const thumbs = document.querySelectorAll('.thumb');
thumbs.forEach(thumb => {
  thumb.addEventListener('click', function() {
    thumbs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    mainImg.src = this.src;
  });
});

// Floating cart & cart panel
const cartFloatBtn = document.getElementById('cartFloatBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartPanel = document.getElementById('closeCartPanel');
cartFloatBtn.addEventListener('click', () => {
  cartPanel.classList.add('open');
});
closeCartPanel.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

// Add to Cart functionality
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
let cart = [];

addToCartBtn.addEventListener('click', () => {
  const qty = parseInt(qtyInput.value);
  const img = mainImg.src;
  const name = "Modern Sneakers";
  const price = 129;
  // Check if already in cart
  let found = cart.find(item => item.name === name && item.img === img);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ name, img, price, qty });
  }
  updateCartDisplay();
  cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
  // Animation feedback
  addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
  setTimeout(() => {
    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
  }, 1200);
});

function updateCartDisplay() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    cartCount.textContent = "0";
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" style="width:48px;height:48px;border-radius:7px;margin-right:12px;">
      <span>${item.name}</span>
      <span style="margin-left:auto;">x${item.qty}</span>
      <span style="margin-left:10px;">$${item.price * item.qty}</span>
    </div>
  `).join('');
}

// Close cart panel on outside click
window.addEventListener('click', e => {
  if (e.target === cartPanel) {
    cartPanel.classList.remove('open');
  }
});
