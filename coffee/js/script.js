// Handle the cart and billing functionality

let cart = [];

function addToCart(coffeeType, price) {
  const coffee = { coffeeType, price };
  cart.push(coffee);
  alert(`${coffeeType} added to cart!`);
}

document.getElementById('generateBill').addEventListener('click', function() {
  let coffeeType = document.getElementById('coffeeType').value;
  let coffeeSize = document.getElementById('coffeeSize').value;
  let coffeeQuantity = document.getElementById('coffeeQuantity').value;
  let extras = document.getElementById('extras').value;
  let membership = document.getElementById('membership').value;

  // Example of calculating prices
  let price = coffeeSize === "small" ? 5 : coffeeSize === "medium" ? 6 : 7;
  let subtotal = price * coffeeQuantity;

  // Display order summary
  let billSummary = `
    <h3>Order Summary</h3>
    <p>Coffee Type: ${coffeeType} (${coffeeSize})</p>
    <p>Quantity: ${coffeeQuantity}</p>
    <p>Extras: ${extras}</p>
    <p>Membership Discount: ${membership}</p>
    <p>Subtotal: $${subtotal}</p>
  `;
  document.getElementById('order-summary').innerHTML = billSummary;
  document.querySelector('.bill-container').style.display = "block";
});

document.getElementById('printBill').addEventListener('click', function() {
  window.print();
});
