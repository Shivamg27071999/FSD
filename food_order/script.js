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
function generateSummary() {
    const summaryBox = document.getElementById('orderSummaryBox');
    const priceField = document.getElementById('priceField');
    const orderField = document.getElementById('orderField');

    if (Order.items.length === 0) {
        summaryBox.value = "Your cart is empty!";
        priceField.value = "";
        orderField.value = "";
        return;
    }

    const summaryText = Order.items.map(item => {
        return `${item.food_name} x ${item.quantity} = Rs. ${(item.food_price * item.quantity).toFixed(2)}`;
    }).join('\n');

    const totalPrice = Order.calculateTotal().toFixed(2);

    summaryBox.value = summaryText + `\n\nTotal: Rs. ${totalPrice}`;
    priceField.value = totalPrice;
    orderField.value = summaryText;
}

function updateFormData() {
    const summaryBox = document.getElementById('orderSummaryBox');
    const priceField = document.getElementById('priceField');
    const orderField = document.getElementById('orderField');

    if (Order.items.length === 0) {
        summaryBox.value = "Your cart is empty!";
        priceField.value = "";
        orderField.value = "";
        return;
    }

    const summaryText = Order.items.map(item => {
        return `${item.food_name} x ${item.quantity} = Rs. ${(item.food_price * item.quantity).toFixed(2)}`;
    }).join('\n');

    const totalPrice = Order.calculateTotal().toFixed(2);

    summaryBox.value = summaryText + `\n\nTotal: Rs. ${totalPrice}`;
    priceField.value = totalPrice;
    orderField.value = summaryText;
}



// document.getElementById('generateSummaryBtn').addEventListener('click', function() {
//     const formName = document.getElementById('formName');
//     const formMobile = document.getElementById('formMobile');
//     const formOrderDetails = document.getElementById('formOrderDetails');
//     const formPrice = document.getElementById('formPrice');

//     // Set form fields with order data
//     formName.value = prompt("Enter Your Name:");
//     formMobile.value = prompt("Enter Your Mobile Number:");

//     let orderDetails = "Items: ";
//     Order.items.forEach(item => {
//         orderDetails += `${item.food_name} (x${item.quantity}), `;
//     });
//     formOrderDetails.value = orderDetails.slice(0, -2); // Remove trailing comma and space
//     formPrice.value = Order.calculateTotal().toFixed(2);

//     // Show the Google Form section
//     document.getElementById('googleFormSection').style.display = 'block';
// });
document.addEventListener('DOMContentLoaded', fetchmenu);
