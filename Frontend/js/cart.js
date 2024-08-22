//cart
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-table-body")) {
      initializeCartPage();
    }
  });
  
  function initializeCartPage() {
    console.log("Initializing Cart Page");
    updateCartPage(); // Ensure the cart page is initialized correctly
    document
      .getElementById("proceed-to-checkout")
      .addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "checkout.html"; // Redirect to checkout page
      });
  }
  
  function updateCartPage() {
    const cartTableBody = document.querySelector("#cart-table-body");
    const cartItems = getCartItems();
  
    cartTableBody.innerHTML = "";
    cartItems.forEach((item) => cartTableBody.appendChild(createCartRow(item)));
  
    updateCartTotals();
    cartTableBody.addEventListener("click", handleCartActions);
    cartTableBody.addEventListener("input", handleQuantityInput);
  }
  
  function createCartRow(item) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="product-thumbnail"><img src="${
        item.image
      }" alt="Image" class="img-fluid"></td>
      <td class="product-name">${item.title}</td>
      <td class="product-price">${item.price}</td>
      <td>${createQuantityControl(item.quantity)}</td>
      <td class="product-total">RM${calculateTotal(item)}</td>
      <td><a href="#" class="btn btn-black btn-sm delete-btn">X</a></td>
    `;
    return row;
  }
  
  function createQuantityControl(quantity) {
    return `
      <div class="input-group mb-3 quantity-container">
        <button class="btn btn-outline-black decrease">&minus;</button>
        <input type="text" class="form-control text-center quantity-amount" value="${quantity}">
        <button class="btn btn-outline-black increase">&plus;</button>
      </div>
    `;
  }
  
  function calculateTotal(item) {
    return (parseFloat(item.price.replace("RM", "")) * item.quantity).toFixed(2);
  }
  
  function handleCartActions(event) {
    event.preventDefault(); // Prevent default action for anchor tags
    const button = event.target;
    const row = button.closest("tr");
  
    if (
      button.classList.contains("decrease") ||
      button.classList.contains("increase")
    ) {
      adjustItemQuantity(row, button);
    } else if (button.classList.contains("delete-btn")) {
      removeItemFromCart(row);
    }
  }
  
  function adjustItemQuantity(row, button) {
    const quantityInput = row.querySelector(".quantity-amount");
    let quantity = parseInt(quantityInput.value);
  
    quantity =
      button.classList.contains("decrease") && quantity > 1
        ? quantity - 1
        : quantity + 1;
    quantityInput.value = quantity;
  
    updateCartItem(row, quantity);
  }
  
  function handleQuantityInput(event) {
    const input = event.target;
    if (input.classList.contains("quantity-amount")) {
      const row = input.closest("tr");
      const quantity = parseInt(input.value);
      updateCartItem(row, quantity);
    }
  }
  
  function updateCartItem(row, quantity) {
    if (isNaN(quantity) || quantity < 1) {
      alert("Quantity must be a positive number.");
      return;
    }
  
    const cartItems = getCartItems();
    const title = getTextContent(row, ".product-name");
    const item = cartItems.find((cartItem) => cartItem.title === title);
  
    if (item) {
      item.quantity = quantity;
      row.querySelector(".product-total").textContent = `RM${calculateTotal(
        item
      )}`;
      saveCartItems(cartItems);
      updateCartTotals(); // Ensure totals are updated
    }
  }
  
  function removeItemFromCart(row) {
    let cartItems = getCartItems();
    const title = getTextContent(row, ".product-name");
  
    cartItems = cartItems.filter((cartItem) => cartItem.title !== title);
    saveCartItems(cartItems);
    row.remove();
    updateCartTotals(); // Ensure totals are updated
  }
  
  function updateCartTotals() {
    const cartTableBody = document.querySelector("#cart-table-body");
    const subtotal = Array.from(
      cartTableBody.querySelectorAll(".product-total")
    ).reduce(
      (sum, totalCell) =>
        sum + parseFloat(totalCell.textContent.replace("RM", "")),
      0
    );
  
    // Calculate service tax (6%)
    const serviceTax = subtotal * 0.06;
    const total = subtotal + serviceTax;
  
    // Update the display values
    document.getElementById("Subtotal").textContent = `RM${subtotal.toFixed(2)}`;
    document.getElementById("ServiceTax").textContent = `RM${serviceTax.toFixed(
      2
    )}`;
    document.getElementById("Total").textContent = `RM${total.toFixed(2)}`;
  }
  
  function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  }
  
  function saveCartItems(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  