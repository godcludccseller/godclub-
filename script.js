const menuItems = [
  { id: 'chowmin', name: 'Chowmin', price: 120, category: 'fast', description: 'Classic noodles with fresh vegetables.' },
  { id: 'burger', name: 'Burger', price: 140, category: 'fast', description: 'Crispy burger with cheese and sauces.' },
  { id: 'chilli-potato', name: 'Chilli Potato', price: 110, category: 'fast', description: 'Spicy crispy potato bites.' },
  { id: 'maggie', name: 'Maggie', price: 100, category: 'fast', description: 'Hot and cheesy instant noodles.' },
  { id: 'pasta', name: 'Pasta', price: 130, category: 'fast', description: 'Italian-style pasta with tangy sauce.' },
  { id: 'macroni', name: 'Macroni', price: 125, category: 'fast', description: 'Creamy baked macaroni.' },
  { id: 'bread-omlet', name: 'Bread Omlet', price: 90, category: 'fast', description: 'Soft bread with mild spiced omelette.' },
  { id: 'daal-tadka', name: 'Daal Tadka', price: 140, category: 'healthy', description: 'Comforting yellow lentils with tempering.' },
  { id: 'daal-fry', name: 'Daal Fry', price: 135, category: 'healthy', description: 'Rich dal with onion and garlic.' },
  { id: 'sahi-panner', name: 'Sahi Panner', price: 170, category: 'healthy', description: 'Creamy paneer in rich gravy.' },
  { id: 'matar-panner', name: 'Matar Panner', price: 160, category: 'healthy', description: 'Paneer and peas in tomato gravy.' },
  { id: 'aalu-tamatar', name: 'Aalu Tamatar', price: 120, category: 'healthy', description: 'Potato and tomato curry.' },
  { id: 'zeera-aalu', name: 'Zeera Aalu', price: 115, category: 'healthy', description: 'Tempered potatoes with cumin.' },
  { id: 'kadai-panner', name: 'Kadai Panner', price: 170, category: 'healthy', description: 'Paneer cooked in kadai masala.' },
  { id: 'malai-chaap', name: 'Malai Chaap', price: 165, category: 'healthy', description: 'Creamy grilled chaap.' },
  { id: 'masala-chaap', name: 'Masala Chaap', price: 160, category: 'healthy', description: 'Spicy chaap with home masala.' },
  { id: 'tandoori-roti', name: 'Tandoori Roti', price: 20, category: 'healthy', description: 'Freshly baked tandoori roti.' },
  { id: 'butter-roti', name: 'Butter Roti', price: 25, category: 'healthy', description: 'Soft roti with butter.' },
  { id: 'simple-roti', name: 'Simple Roti', price: 15, category: 'healthy', description: 'Warm plain roti.' },
  { id: 'kaddi', name: 'Kaddi', price: 150, category: 'healthy', description: 'Classic Punjabi kadhi with pakora.' },
  { id: 'rajma', name: 'Rajma', price: 140, category: 'healthy', description: 'Slow-cooked kidney beans curry.' },
  { id: 'chole', name: 'Chole', price: 140, category: 'healthy', description: 'Spicy chickpea curry.' },
  { id: 'zeera-rice', name: 'Zeera Rice', price: 110, category: 'healthy', description: 'Rice tempered with cumin.' },
  { id: 'simple-rice', name: 'Simple Rice', price: 90, category: 'healthy', description: 'Steamed plain rice.' }
];

let cart = [];
const deliveryFee = 40;

const fastMenu = document.getElementById('fast-food-menu');
const healthyMenu = document.getElementById('healthy-menu');
const cartItems = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const paymentMethod = document.getElementById('payment-method');
const cardFields = document.getElementById('card-fields');
const checkoutForm = document.getElementById('checkout-form');
const toast = document.getElementById('toast');

function renderMenu() {
  const fastItems = menuItems.filter(item => item.category === 'fast');
  const healthyItems = menuItems.filter(item => item.category === 'healthy');

  fastMenu.innerHTML = fastItems.map(item => `
    <article class="menu-card">
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <div class="menu-footer">
        <span class="price">₹${item.price}</span>
        <button type="button" onclick="addToCart('${item.id}')">Add</button>
      </div>
    </article>
  `).join('');

  healthyMenu.innerHTML = healthyItems.map(item => `
    <article class="menu-card">
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <div class="menu-footer">
        <span class="price">₹${item.price}</span>
        <button type="button" onclick="addToCart('${item.id}')">Add</button>
      </div>
    </article>
  `).join('');
}

function addToCart(id) {
  const item = menuItems.find(entry => entry.id === id);
  if (!item) return;

  const existing = cart.find(entry => entry.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCart();
  showToast(`${item.name} added to cart`);
}

function updateCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<p>Your cart is empty. Add delicious food to get started.</p>';
    subtotalEl.textContent = '₹0';
    totalEl.textContent = `₹${deliveryFee}`;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <div>${item.qty} x ₹${item.price}</div>
      </div>
      <strong>₹${item.qty * item.price}</strong>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  subtotalEl.textContent = `₹${subtotal}`;
  totalEl.textContent = `₹${subtotal + deliveryFee}`;
}

paymentMethod.addEventListener('change', () => {
  cardFields.classList.toggle('hidden', paymentMethod.value !== 'online');
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!cart.length) {
    showToast('Your cart is empty');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !phone || !address) {
    showToast('Please fill all delivery details');
    return;
  }

  if (paymentMethod.value === 'online') {
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!cardName || !cardNumber || !expiry || !cvv) {
      showToast('Please fill card details');
      return;
    }
  }

  const button = checkoutForm.querySelector('button');
  button.textContent = 'Processing...';
  button.disabled = true;

  setTimeout(() => {
    showToast('Order placed successfully!');
    checkoutForm.reset();
    cart = [];
    updateCart();
    button.textContent = 'Place Order';
    button.disabled = false;
    cardFields.classList.add('hidden');
  }, 1400);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

window.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  updateCart();
});

window.addToCart = addToCart;
