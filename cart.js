function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    document.getElementById("total-price").innerText = "";
    document.getElementById("confirm-btn").style.display = "none";
    document.getElementById("customer-form").style.display = "none";
    return;
  }

  document.getElementById("confirm-btn").style.display = "block";

  cart.forEach((item, index) => {
    if (!item.size) item.size = 38;
    if (!item.quantity) item.quantity = 1;

    container.innerHTML += `
      <div class="cart-item" data-index="${index}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="details">
          <div><strong>${item.name}</strong></div>
          <div>${item.price} TK</div>
          <div>
            Qty:
            <input type="number" min="1" max="10" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" />
          </div>
          <div>
            Size:
            <select onchange="updateSize(${index}, this.value)">
              ${[35,36,37,38,39,40,41,42,43].map(size => `
                <option value="${size}" ${item.size==size ? "selected" : ""}>${size}</option>
              `).join('')}
            </select>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
  updateTotal();
}

function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(qty) || 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotal();
}

function updateSize(index, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].size = parseInt(size);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  hideForm();
}

function updateTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total-price").innerText = `Total: ${total} TK`;
}

function showForm() {
  document.getElementById("customer-form").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}

function hideForm() {
  document.getElementById("customer-form").style.display = "none";
}

function submitOrder(event) {
  event.preventDefault();

  let name = document.getElementById("customer-name").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let deliveryFee = parseInt(document.getElementById("delivery-option").value);

  if (!name || !phone || !deliveryFee) {
    alert("Please fill all details correctly.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let grandTotal = total + deliveryFee;

  let orderDetails = `
Order Summary:
Name: ${name}
Phone: ${phone}
Delivery Fee: ${deliveryFee} TK
Total Price: ${grandTotal} TK
Products:
`;

  cart.forEach(item => {
    orderDetails += `- ${item.name} (Size: ${item.size}, Qty: ${item.quantity}) - ${item.price * item.quantity} TK\n`;
  });

  alert(orderDetails);

  // Clear cart & form after order
  localStorage.removeItem("cart");
  loadCart();
  hideForm();
  document.getElementById("customer-form").reset();
}
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    document.getElementById("total-price").innerText = "";
    document.getElementById("confirm-btn").style.display = "none";
    document.getElementById("customer-form").style.display = "none";
    return;
  }

  document.getElementById("confirm-btn").style.display = "block";

  cart.forEach((item, index) => {
    if (!item.size) item.size = 38;
    if (!item.quantity) item.quantity = 1;

    container.innerHTML += `
      <div class="cart-item" data-index="${index}" style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
        <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover; border-radius:8px;" />
        <div class="details" style="flex-grow:1;">
          <div><strong>${item.name}</strong></div>
          <div>Price: ${item.price} TK</div>
          <div>
            Qty:
            <input type="number" min="1" max="10" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" style="width:50px;" />
          </div>
          <div>
            Size:
            <select onchange="updateSize(${index}, this.value)">
              ${[35,36,37,38,39,40,41,42,43].map(size => `
                <option value="${size}" ${item.size==size ? "selected" : ""}>${size}</option>
              `).join('')}
            </select>
          </div>
          <div><strong>Total: ${(parseInt(item.price) || 0) * item.quantity} TK</strong></div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})" style="background:#e74c3c; color:#fff; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Remove</button>
      </div>
    `;
  });
  updateTotal();
}
