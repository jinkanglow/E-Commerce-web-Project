//checkout
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("checkout-items")) {
      initializeCheckoutPage();
    }
  });
  
  function initializeCheckoutPage() {
    console.log("Initializing Checkout Page");
    updateCheckoutPage(); // Ensure the checkout page is initialized correctly
  }
  
  function updateCheckoutPage() {
    const checkoutItemsBody = document.querySelector("#checkout-items");
    const cartItems = getCartItems();
  
    // Debugging: Log the cart items
    console.log("Cart Items:", cartItems);
  
    // Clear existing items
    const rows = Array.from(checkoutItemsBody.querySelectorAll("tr"));
    rows.forEach((row) => row.remove());
  
    // Add each cart item to the checkout page
    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.classList.add("checkout-item-row");
      row.innerHTML = `
        <td>${item.title} <strong class="mx-2">x</strong> ${item.quantity}</td>
        <td>RM${calculateTotal(item)}</td>
      `;
      checkoutItemsBody.appendChild(row);
    });
  
    // Add subtotal, tax, and total rows
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("RM", "")) * item.quantity,
      0
    );
    const serviceTax = subtotal * 0.06;
    const total = subtotal + serviceTax;
  
    const subtotalRow = document.createElement("tr");
    subtotalRow.innerHTML = `
      <td class="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
      <td class="text-black" id="checkout-subtotal">RM${subtotal.toFixed(2)}</td>
    `;
  
    const taxRow = document.createElement("tr");
    taxRow.innerHTML = `
      <td class="text-black font-weight-bold"><strong>Service Tax (6%)</strong></td>
      <td class="text-black" id="checkout-tax">RM${serviceTax.toFixed(2)}</td>
    `;
  
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
      <td class="text-black font-weight-bold" id="checkout-total"><strong>RM${total.toFixed(
        2
      )}</strong></td>
    `;
  
    // Append rows to checkoutItemsBody
    checkoutItemsBody.appendChild(subtotalRow);
    checkoutItemsBody.appendChild(taxRow);
    checkoutItemsBody.appendChild(totalRow);
  
    // Debugging: Confirm rows are being added
    console.log(
      "Rows after adding items and totals:",
      Array.from(checkoutItemsBody.querySelectorAll("tr")).map(
        (row) => row.innerHTML
      )
    );
  }
  
  function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  }
  
  function calculateTotal(item) {
    return (parseFloat(item.price.replace("RM", "")) * item.quantity).toFixed(2);
  }
  