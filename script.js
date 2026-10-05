const ORIGINAL_PRICE = 50.00;
const STORAGE_KEY = 'lastCoupon';

const VALID_CODES = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15
};

const couponInput = document.getElementById('coupon-input');
const applyBtn = document.getElementById('apply-btn');
const messageEl = document.getElementById('message');
const finalPriceEl = document.getElementById('final-price');

function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = type;
}

function applyCode() {
  const code = couponInput.value.trim().toUpperCase();

  if (!code) {
    showMessage('Please enter a discount code.', 'error');
    return;
  }

  const discountPercent = VALID_CODES[code];

  if (discountPercent === undefined) {
    showMessage('Invalid discount code.', 'error');
    finalPriceEl.textContent = formatPrice(ORIGINAL_PRICE);
    return;
  }

  const discountedPrice = ORIGINAL_PRICE * (1 - discountPercent / 100);
  finalPriceEl.textContent = formatPrice(discountedPrice);
  showMessage(`Code applied! You saved ${discountPercent}%.`, 'success');
  localStorage.setItem(STORAGE_KEY, code);
}

function restoreLastCoupon() {
  const savedCode = localStorage.getItem(STORAGE_KEY);
  if (!savedCode) return;

  couponInput.value = savedCode;
  applyCode();
}

applyBtn.addEventListener('click', applyCode);

couponInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    applyCode();
  }
});

restoreLastCoupon();
