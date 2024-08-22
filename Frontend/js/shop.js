//shop
document.addEventListener("DOMContentLoaded", () => {
      initializeStore();
  });
  
  function initializeStore() {
    document.querySelectorAll(".product-item").forEach(setupProductItem);
  }
  
  function setupProductItem(item) {
    const crossIcon = item.querySelector(".icon-cross");
    setProductData(crossIcon, item);
    crossIcon.addEventListener("click", addItemToCart);
  }
  
  function setProductData(crossIcon, item) {
    crossIcon.dataset.title = getTextContent(item, ".product-title");
    crossIcon.dataset.price = getTextContent(item, ".product-price");
    crossIcon.dataset.image = getImageSource(item, ".product-thumbnail");
  }
  
  function getTextContent(element, selector) {
    return element.querySelector(selector).textContent.trim();
  }
  
  function getImageSource(element, selector) {
    return element.querySelector(selector).src;
  }
  
  function addItemToCart(event) {
    event.preventDefault();
    const item = getItemDataFromIcon(event.currentTarget);
    saveCartItem(item);
    alert("Item added to cart!");
  }
  
  function getItemDataFromIcon(icon) {
    return {
      title: icon.dataset.title,
      price: icon.dataset.price,
      image: icon.dataset.image,
      quantity: 1,
    };
  }

  function saveCartItem(item) {
    const cartItems = getCartItems();
    // console.log('Before Saving:', cartItems);

    const existingItem = cartItems.find(({ title }) => title === item.title);
  
    existingItem ? existingItem.quantity++ : cartItems.push(item);
  
    // if (existingItem) {
    //     existingItem.quantity++;
    //   } else {
    //     cartItems.push(item);
    //   }

    saveCartItems(cartItems);
    // console.log('After Saving:', getCartItems()); // Debugging line
  }
  