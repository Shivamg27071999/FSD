const coffeePrices = {
  latte: 120,
  espresso: 100,
  mocha: 140
};

const sizePrices = {
  small: 0,
  medium: 20,
  large: 40
};

const membershipDiscounts = {
  none: 0,
  silver: 0.10,
  gold: 0.20
};

const promoCodes = {
  "BREW20": 0.20,
  "COFFEE10": 0.10
};

function generateInvoice() {
  const coffee = document.getElementById("coffee").value;
  const size = document.getElementById("size").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const membership = document.getElementById("membership").value;
  const promo = document.getElementById("promo").value.trim().toUpperCase();

  let basePrice = coffeePrices[coffee];
  let sizePrice = sizePrices[size];
  let addOnTotal = 0;

  document.querySelectorAll(".addon:checked").forEach(addon => {
    addOnTotal += parseInt(addon.value);
  });

  let subtotal = (basePrice + sizePrice + addOnTotal) * quantity;
  let discount = subtotal * membershipDiscounts[membership];
  let afterMembership = subtotal - discount;

  let promoDiscount = 0;
  if (promoCodes[promo]) {
    promoDiscount = afterMembership * promoCodes[promo];
  }

  let finalAmount = afterMembership - promoDiscount;
  let tax = finalAmount * 0.05;
  let total = finalAmount + tax;

  document.getElementById("invoice").innerHTML = `
    <h3>Invoice</h3>
    <p>Coffee: ${coffee.charAt(0).toUpperCase() + coffee.slice(1)}</p>
    <p>Size: ${size}</p>
    <p>Quantity: ${quantity}</p>
    <p>Add-ons: ₹${addOnTotal}</p>
    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
    <p>Membership Discount: -₹${discount.toFixed(2)}</p>
    <p>Promo Code (${promo}): -₹${promoDiscount.toFixed(2)}</p>
    <p>Tax (5%): ₹${tax.toFixed(2)}</p>
    <h4>Total: ₹${total.toFixed(2)}</h4>
    <button onclick="window.print()">Print Invoice</button>
  `;
}
