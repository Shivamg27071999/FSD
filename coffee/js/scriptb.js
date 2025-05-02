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
    let membershipDiscount = subtotal * membershipDiscounts[membership];
    let afterDiscount = subtotal - membershipDiscount;
  
    let promoDiscount = 0;
    if (promoCodes[promo]) {
      promoDiscount = afterDiscount * promoCodes[promo];
    }
  
    let afterPromo = afterDiscount - promoDiscount;
    let tax = afterPromo * 0.05;
    let total = afterPromo + tax;
  
    const invoice = document.getElementById("invoice");
    invoice.classList.remove("hidden");
    invoice.innerHTML = `
      <h3>🧾 Invoice Summary</h3>
      <p><strong>Coffee:</strong> ${capitalize(coffee)}</p>
      <p><strong>Size:</strong> ${capitalize(size)}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Add-ons:</strong> ₹${addOnTotal}</p>
      <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
      <p><strong>Membership Discount:</strong> -₹${membershipDiscount.toFixed(2)}</p>
      <p><strong>Promo Discount (${promo}):</strong> -₹${promoDiscount.toFixed(2)}</p>
      <p><strong>Tax (5%):</strong> ₹${tax.toFixed(2)}</p>
      <h4><strong>Total Payable:</strong> ₹${total.toFixed(2)}</h4>
      <button onclick="window.print()">🖨️ Print Invoice</button>
    `;
  }
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  