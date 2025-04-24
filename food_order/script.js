let menudata = [];

// Fetch menu from API
function fetchmenu() {
  fetch("https://api.npoint.io/d48587410594df0f5932")
    .then(response => response.json())
    .then(data => {
      menudata = data;
      display();
    });
}
fetchmenu();

// Display food items on shop page
function display() {
  const foodcards = document.getElementById('foodcards');
  let cardsHTML = "";
  menudata.forEach(food => {
    cardsHTML += `
      <div class="card">
        <img src="${food.food_image}" alt="${food.food_name}" />
        <h3>${food.food_name}</h3>
        <p>Rs. ${food.food_price}</p>
        <button onclick="addToOrder(${food.food_id})">Add to Cart</button>
      </div>
    `;
  });
  foodcards.innerHTML = cardsHTML;
}

// Add item to order
function addToOrder(food_id) {
  const item = menudata.find(food => food.food_id === food_id);
  if (item) {
    Order.addItem(item);
  }
}

// Order object to manage cart
const Order = {
  items: [],
  addItem: function (item) {
    const existing = this.items.find(i => i.food_id === item.food_id);
    if (existing) {
      existing.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.items.push(newItem);
    }
    updateOrderDisplay();
  },
  incItem: function (food_id) {
    const item = this.items.find(i => i.food_id === food_id);
    if (item) {
      item.quantity++;
      updateOrderDisplay();
    }
  },
  decItem: function (food_id) {
    const item = this.items.find(i => i.food_id === food_id);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.items = this.items.filter(i => i.food_id !== food_id);
      }
      updateOrderDisplay();
    }
  },
  calculateTotal: function () {
    return this.items.reduce((total, item) => total + item.food_price * item.quantity, 0);
  }
};

// Update cart display
function updateOrderDisplay() {
  const orderDisplay = document.getElementById('orderDisplay');
  if (Order.items.length === 0) {
    orderDisplay.innerHTML = "<li>Your cart is empty</li>";
  } else {
    let orderHtml = "";
    Order.items.forEach(item => {
      orderHtml += `
        <li>
          <div class="order-item-info">
            ${item.food_name}<br>
            Rs. ${(item.food_price * item.quantity).toFixed(2)} (x${item.quantity})
          </div>
          <div class="order-item-buttons">
            <button onclick="Order.incItem(${item.food_id})">+</button>
            <button onclick="Order.decItem(${item.food_id})">-</button>
          </div>
        </li>
      `;
    });
    orderDisplay.innerHTML = orderHtml;
  }
  document.getElementById('totalPrice').textContent = Order.calculateTotal().toFixed(2);
}

// Generate order summary for Google Form
function fillOrderSummary() {
  let summary = "";
  Order.items.forEach(item => {
    summary += `${item.food_name} (x${item.quantity}) - Rs. ${item.food_price * item.quantity}\n`;
  });
  summary += `\nTotal: Rs. ${Order.calculateTotal().toFixed(2)}`;
  const summaryBox = document.getElementById("orderSummaryBox");
  if (summaryBox) summaryBox.value = summary;
}

document.addEventListener('DOMContentLoaded', fetchmenu);
