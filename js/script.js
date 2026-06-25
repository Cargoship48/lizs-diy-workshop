// Product catalog for the shop
const squishes = [
  { name: "Bubblegum", price: 10, color: "#FFB3D9", color2: "#FFD6EC", mouth: "smile", blurb: "Pink, poppy, and proud." },
  { name: "Grape Goo", price: 20, color: "#B79CED", color2: "#D9C9FF", mouth: "smile", blurb: "Squishy purple fun." },
  { name: "Mint Cloud", price: 30, color: "#9FE6C6", color2: "#C9F4E2", mouth: "content", blurb: "Cool, calm, and comfy." },
  { name: "Sunny Duck", price: 40, color: "#FFD15C", color2: "#FFE6A3", mouth: "smile", blurb: "My duckiest squish." },
  { name: "Blue Splash", price: 60, color: "#8FD0FF", color2: "#C2E7FF", mouth: "o", blurb: "Big, bouncy, and bright." },
  { name: "Rainbow Swirl", price: 80, color: "#FF9EC4", color2: "#B79CED", mouth: "smile", blurb: "A little bit of every color." },
  { name: "Mega Squish", price: 100, color: "#C77DFF", color2: "#E9C6FF", mouth: "smile", blurb: "The biggest, squishiest one of all!" }
];

// Small helpers
function getEl(id) {
  return document.getElementById(id);
}

// Build a squish SVG blob
function squishSVG(s) {
  let mouthMarkup;

  if (s.mouth === "o") {
    mouthMarkup = '<ellipse cx="110" cy="146" rx="9" ry="11" fill="#4A3B6B"/>';
  } else if (s.mouth === "content") {
    mouthMarkup = '<path d="M92 142 Q110 152 128 142" fill="none" stroke="#4A3B6B" stroke-width="5" stroke-linecap="round"/>';
  } else {
    mouthMarkup = '<path d="M90 140 Q110 166 130 140" fill="none" stroke="#4A3B6B" stroke-width="5.5" stroke-linecap="round"/>';
  }

  return `
    <svg viewBox="0 0 220 220" aria-hidden="true">
      <path d="M110 18 C150 16 188 44 196 92 C204 134 182 178 138 194 C98 208 46 196 24 152 C6 110 18 56 58 30 C72 20 92 19 110 18 Z" fill="${s.color}"/>
      <ellipse cx="78" cy="68" rx="34" ry="22" fill="${s.color2}" opacity="0.85"/>
      <circle cx="86" cy="110" r="10" fill="#4A3B6B"/>
      <circle cx="134" cy="110" r="10" fill="#4A3B6B"/>
      <circle cx="89" cy="106" r="3.2" fill="#fff"/>
      <circle cx="137" cy="106" r="3.2" fill="#fff"/>
      <circle cx="68" cy="132" r="9" fill="#FF8FC2" opacity="0.5"/>
      <circle cx="152" cy="132" r="9" fill="#FF8FC2" opacity="0.5"/>
      ${mouthMarkup}
    </svg>
  `;
}

// ----------------------
// Shop grid + cart state
// ----------------------
const cart = {};

function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function cartTotal() {
  return Object.keys(cart).reduce((sum, i) => sum + squishes[i].price * cart[i], 0);
}

function updateBadge() {
  const badge = getEl('cart-count');
  if (badge) {
    badge.textContent = cartCount();
  }
}

function buildShop() {
  const grid = getEl('shop-grid');
  if (!grid) return;

  grid.innerHTML = squishes.map((s, i) => `
    <div class="squish-card">
      <button class="squish-poke" data-poke="${i}" aria-label="Poke the ${s.name} squish">
        ${squishSVG(s)}
      </button>
      <h3>${s.name}</h3>
      <p class="blurb">${s.blurb}</p>
      <p class="poke-hint">poke me!</p>
      <div class="price">$${s.price}</div>
      <button class="btn btn-main" data-add="${i}">Add to cart</button>
    </div>
  `).join('');
}

function addToCart(i) {
  cart[i] = (cart[i] || 0) + 1;
  updateBadge();
  showToast(`Added ${squishes[i].name} to your cart!`);
}

function changeQty(i, delta) {
  cart[i] = (cart[i] || 0) + delta;
  if (cart[i] <= 0) {
    delete cart[i];
  }
  updateBadge();
  renderCart();
}

function removeLine(i) {
  delete cart[i];
  updateBadge();
  renderCart();
}

// ----------------------
// Cart modal + checkout
// ----------------------
function openCart() {
  const overlay = getEl('overlay');
  if (!overlay) return;

  overlay.classList.add('open');

  const titleEl = getEl('modal-title');
  if (titleEl) {
    titleEl.textContent = 'Your Cart';
  }

  renderCart();
}

function closeCart() {
  const overlay = getEl('overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
}

function overlayClick(e) {
  if (e.target.id === 'overlay') {
    closeCart();
  }
}

function renderCart() {
  const body = getEl('modal-body');
  if (!body) return;

  const keys = Object.keys(cart);

  if (keys.length === 0) {
    body.innerHTML = `
      <div class="empty-cart">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <ellipse cx="56" cy="78" rx="42" ry="30" fill="#FFD15C"/>
          <circle cx="82" cy="46" r="23" fill="#FFD15C"/>
          <path d="M101 42 q20 1 18 12 q-2 9 -18 7 q-4 -10 0 -19 z" fill="#FF9E4D"/>
          <circle cx="86" cy="40" r="4.5" fill="#4A3B6B"/>
        </svg>
        <p>Your cart is empty. Go pick a squish!</p>
        <a href="shop.html" class="btn btn-main" onclick="closeCart()">Go to the Shop</a>
      </div>
    `;
    return;
  }

  const lines = keys.map(i => {
    const s = squishes[i];
    const qty = cart[i];
    return `
      <div class="cart-line">
        <div class="mini">${squishSVG(s)}</div>
        <div class="info">
          <div class="nm">${s.name}</div>
          <div class="pr">$${s.price} each</div>
        </div>
        <div class="qty">
          <button onclick="changeQty(${i}, -1)" aria-label="One less">&minus;</button>
          <span>${qty}</span>
          <button onclick="changeQty(${i}, 1)" aria-label="One more">+</button>
        </div>
        <button class="line-remove" onclick="removeLine(${i})">remove</button>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    <div class="cart-lines">
      ${lines}
    </div>
    <div class="cart-total">
      <div>Total</div>
      <div class="total-amount">$${cartTotal()}</div>
    </div>
    <div class="cart-actions">
      <button class="btn btn-ghost" onclick="closeCart()">Keep shopping</button>
      <button class="btn btn-main" onclick="startCheckout()">Pretend checkout</button>
    </div>
  `;
}

function startCheckout() {
  const body = getEl('modal-body');
  if (!body) return;

  const titleEl = getEl('modal-title');
  if (titleEl) {
    titleEl.textContent = 'Checkout';
  }

  body.innerHTML = `
    <h3 class="checkout-title">Checkout</h3>
    <div class="form-grid">
      <div class="field wide">
        <label for="cc-name">Name on card</label>
        <input id="cc-name" type="text" placeholder="Your name">
      </div>
      <div class="field wide">
        <label for="cc-num">Card number</label>
        <input id="cc-num" type="text" inputmode="numeric" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCard(this)">
      </div>
      <div class="field">
        <label for="cc-exp">Expires</label>
        <input id="cc-exp" type="text" inputmode="numeric" placeholder="MM/YY" maxlength="5" oninput="formatExp(this)">
      </div>
      <div class="field">
        <label for="cc-cvv">CVV</label>
        <input id="cc-cvv" type="text" inputmode="numeric" placeholder="123" maxlength="4">
      </div>
    </div>
    <div class="form-actions">
      <button class="btn btn-main btn-block" onclick="checkout()">Pay $${cartTotal()}</button>
    </div>
  `;
}

// Input formatting helpers
function formatCard(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatExp(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 4);
  el.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
}

// Complete checkout (pretend)
function checkout() {
  const name = (getEl('cc-name')?.value || '').trim();
  const num = (getEl('cc-num')?.value || '').replace(/\s/g, '');
  const exp = (getEl('cc-exp')?.value || '').trim();
  const cvv = (getEl('cc-cvv')?.value || '').trim();

  if (!name || num.length < 12 || exp.length < 4 || cvv.length < 3) {
    showToast('Please fill in all the card boxes (any pretend numbers are fine).');
    return;
  }

  const total = cartTotal();
  const firstName = name.split(' ')[0];

  saveOrder(name, cart, total);

  // Clear cart
  Object.keys(cart).forEach(k => {
    delete cart[k];
  });
  updateBadge();

  const titleEl = getEl('modal-title');
  if (titleEl) {
    titleEl.textContent = 'All done!';
  }

  const body = getEl('modal-body');
  if (!body) return;

  body.innerHTML = `
    <div class="success">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <ellipse cx="100" cy="178" rx="70" ry="11" fill="#B79CED" opacity="0.22"/>
        <ellipse cx="92" cy="118" rx="66" ry="48" fill="#FFD15C"/>
        <circle cx="126" cy="72" r="36" fill="#FFD15C"/>
        <path d="M152 66 q30 2 27 20 q-4 12 -27 9 q-6 -14 0 -29 z" fill="#FF9E4D"/>
        <circle cx="131" cy="63" r="6" fill="#4A3B6B"/>
        <circle cx="133.5" cy="60.5" r="2" fill="#fff"/>
        <path d="M70 132 q40 24 78 6" fill="none" stroke="#F2B83E" stroke-width="6" stroke-linecap="round"/>
        <path d="M150 30 l5 12 13 1 -10 9 3 13 -11 -7 -11 7 3 -13 -10 -9 13 -1 z" fill="#B79CED"/>
      </svg>
      <h2>Thank you, ${firstName}!</h2>
      <p>Your order for $${total} is placed. Your Squishes are on the way (pretend)!</p>
      <button class="btn btn-main" onclick="closeCart()">Yay!</button>
    </div>
  `;
}

// Save order to localStorage for admin panel
function saveOrder(customerName, orderCart, total) {
  const raw = localStorage.getItem('squishOrders') || '[]';
  let orders;

  try {
    orders = JSON.parse(raw);
    if (!Array.isArray(orders)) {
      orders = [];
    }
  } catch {
    orders = [];
  }

  const order = {
    id: Date.now(),
    customerName,
    items: Object.keys(orderCart).map(i => ({
      name: squishes[i].name,
      quantity: orderCart[i],
      price: squishes[i].price
    })),
    total,
    date: new Date().toISOString(),
    status: 'pending'
  };

  orders.push(order);
  localStorage.setItem('squishOrders', JSON.stringify(orders));
}

// ----------------------
// Custom squish requests
// ----------------------
function sendCustom() {
  const nameEl = getEl('c-name');
  const contactEl = getEl('c-contact');
  const colorsEl = getEl('c-colors');
  const sizeEl = getEl('c-size');
  const ideaEl = getEl('c-idea');

  if (!nameEl || !ideaEl) {
    return;
  }

  const name = (nameEl.value || '').trim();
  const idea = (ideaEl.value || '').trim();

  if (!name || !idea) {
    showToast('Please add your name and your idea so I know what to make!');
    return;
  }

  // Clear fields
  nameEl.value = '';
  if (contactEl) contactEl.value = '';
  if (colorsEl) colorsEl.value = '';
  if (sizeEl) sizeEl.value = '';
  ideaEl.value = '';

  showToast(`Thanks ${name.split(' ')[0]}! Your custom Squish request was sent.`);
}

// ----------------------
// Global event listeners
// ----------------------
document.addEventListener('click', (e) => {
  const poke = e.target.closest?.('[data-poke]');
  if (poke) {
    poke.classList.remove('squishing');
    // restart animation
    void poke.offsetWidth;
    poke.classList.add('squishing');
  }

  const add = e.target.closest?.('[data-add]');
  if (add) {
    const index = parseInt(add.dataset.add, 10);
    if (!Number.isNaN(index)) {
      addToCart(index);
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
  }
});

// ----------------------
// Toast notifications
// ----------------------
let toastTimer;
function showToast(msg) {
  const t = getEl('toast');
  if (!t) return;

  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ----------------------
// Page initialization
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  buildShop();
  updateBadge();
});
