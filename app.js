const products = [
  {
    id: "black",
    name: "Black Hoodie",
    category: "clothes",
    price: 45,
    description: "Soft everyday hoodie.",
    image: "./mages/hoodie/black.jpg",
  },
  {
    id: "green-hoodie",
    name: "Green Hoodie",
    category: "clothes",
    price: 45,
    description: "Green hoodie .",
    image: "./mages/hoodie/hoodie-2 green.jpg",
  },
  {
    id: "ash-hoodie",
    name: "Ash Hoodie",
    category: "clothes",
    price: 45,
    description: "Ash hoodie .",
    image: "./mages/hoodie/hoodie-3 ash.jpg",
  },
  {
    id: "white-hoodie",
    name: "White Hoodie",
    category: "clothes",
    price: 45,
    description: "White hoodie .",
    image: "./mages/hoodie/hoodie-5 white.jpg",
  },
  {
    id:"Nike airforce 1",
    name:"Nike Airforce 1",
    category:"shoes",
    price: 100,
    description:"Ash Airforce 1.",
    image:"./mages/shoes/Nike airforce 1 ash.jpg",
  },
  { id:"Nike airforce1",
    name:"Nike Airforce 1 White",
    category:"shoes",
    price: 120,
    description:"White Airforce 1",
    image:"./mages/shoes/Nike airforce 1 white.jpg",
  },
  {
    id:"Nike dunk low brown",
    name:"Nike Dunk Low Brown",
    category:"shoes",
    price: 130,
    description:"Brown dunk low",
    image:"./mages/shoes/Nike dunk low brown.jpg",
  },
{
  id:"Nike Dunk Low Green",
  name:"Nike dunk low green",
  category:"shoes",
  price: 170,
  description:" green dunk low",
  image:"./mages/shoes/Nike dunk low green.jpg",
},
{
  id:"Nike high tops blue",
  name:"Air Jordan 1 Retro High Blue",
  category:"shoes",
  price: 200,
  description:" Blue Jordan 1",
  image:"./mages/shoes/Nike high tops blue.jpg",
},
{
  id:"Beanie Ash",
  name:"Ash Beanie",
  category:"beanies",
  price: 40,
  description: "Ash Beanie",
  image:"./mages/beanies/beanie ash.webp",
},
{
  
  id:"Beanie Black",
  name:"Black Beanie",
  category:"beanies",
  price: 40,
  description: "Black Beanie",
  image:"./mages/beanies/beanie black.jpg",
},
{

  id:"Beanie dark blue",
  name:"Beanie dark blue",
  category:"beanies",
  price: 40,
  description: "Beanie dark blue" ,
  image:"./mages/beanies/beanie dark blue.jpg",
},
{
  id:"beanie orange",
  name:"Orange Beanie",
  category:"beanies",
  price: 40,
  description: "orange beanie",
  image:"./mages/beanies/beanie-orange.jpg",
},
{
  id:"Beanie White",
  name:"White Beanie",
  category:"beanies",
  price: 40,
  description: "White Beanie",
  image:"./mages/beanies/beanie white.jpg",
},

{
  id:"Black cap",
  name:"Black Cap",
  category:"caps",
  price: 60,
  description: "Balck cap",
  image:"./mages/caps/black cap.webp",
},
{
  id:"Blue cap",
  name:"Blue Cap",
  category:"caps",
  price: 60,
  description: "Blue cap",
  image:"./mages/caps/blue cap.jpg",
},
{
  id:"Brown cap",
  name:"Brown Cap",
  category:"caps",
  price: 60,
  description: "Brown cap",
  image:"./mages/caps/brown cap.jpg",
},
{
  id:"green cap",
  name:"Green Cap",
  category:"caps",
  price: 60,
  description: "Green cap",
  image:"./mages/caps/green cap.jpg",
},
{
  id:"red cap",
  name:"Red Cap",
  category:"caps",
  price: 60,
  description: "Red cap",
  image:"./mages/caps/red cap.jpg",
},
{
  id:"white cap",
  name:"White Cap",
  category:"caps",
  price: 60,
  description: "White cap",
  image:"./mages/caps/white cap.jpg",
},
];

const productGrid = document.querySelector("[data-product-grid]");
const filterButtons = document.querySelectorAll("[data-category]");
/*const checkoutButton = document.querySelector("[data-checkout-button]");
const checkoutFeedback = document.querySelector("[data-checkout-feedback]");*/
const cartItemsContainer = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const subtotalElement = document.querySelector("[data-subtotal]");
const shippingElement = document.querySelector("[data-shipping]");
const totalElement = document.querySelector("[data-total]");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const state = {
  activeCategory: "all",
  cart: loadCart(),
};


// Reads saved cart data from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("threadline-cart");

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch (error) {
    console.error("Could not parse saved cart.", error);
    return [];
  }
}

/*function setCheckoutFeedback(message) {
  checkoutFeedback.hidden = !message;
  checkoutFeedback.textContent = message || "";
}
 
async function beginCheckout() {
  if (state.cart.length === 0) {
    setCheckoutFeedback("Add something to the cart before checkout.");
    return;
  }
}

const items = state.cart.map((item) => ({
  id: item.id,
  quantity: item.quantity,
}));

try {
  const response = await fetch("/api/create-checkout-session",{
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({items}),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Could not start checkout.");
  }

  window.location.href = payload.url;
} catch (error) {
  setCheckoutFeedback(error.message);
}*/


// Saves the latest cart to localStorage.
function saveCart() {
  localStorage.setItem("threadline-cart", JSON.stringify(state.cart));
}

function formatPrice(value) {
  return currencyFormatter.format(value);
}



// This function picks which products should be shown based on the active filter.
function getFilteredProducts() {
  if (state.activeCategory === "all") {
    return products;
  }

  return products.filter((product) => product.category === state.activeCategory);
}

// This function builds the product cards and places them into the HTML.
// encodeURI() helps when a file name has spaces, like "hoodie-2 green.jpg".
function renderProducts() {
  const filteredProducts = getFilteredProducts();

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <p>No products found for this category.</p>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual">
            <img src="${encodeURI(product.image)}" alt="${product.name}" />
          </div>

          <div class="product-copy">
          <button
             class="add-to-cart-button"
             type="button"
             data-add-to-cart="${product.id}"
             >
             Add to cart
             </button>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}


function getCartDetails() {
  return state.cart
    .map((cartItem) => {
      const product = products.find((entry) => entry.id === cartItem.id);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: cartItem.quantity,
        lineTotal: product.price * cartItem.quantity,
      };
    })
    .filter(Boolean);
}

function calculateTotals(cartDetails) {
  const subtotal = cartDetails.reduce((sum, item) => sum + item.lineTotal,0);
  const shipping = subtotal > 0 ? 12 : 0;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}
// Draws the cart section on the right.
function rendercart() {
  const cartDetails = getCartDetails();

  if (cartDetails.length === 0) {
    cartItemsContainer.innerHTML = `
    <div class="empty-cart">
       Your cart is empty.
    </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cartDetails
    .map(
      (item) =>`
        <article class="cart-item">
          <div class="cart-row">
          <div>
          <strong>${formatPrice(item.lineTotal)}</strong>
          </div>
          <div class="quantity controls">
            <button
              class="quantity-button"
              type="button"
              aria-label="Decrease ${item.name} quantity"
              data-change-quantity="${item.id}"
              data-delta="-1"
              >
                 -
              </button>
              <span>Qty ${item.quantity}</span>
              <button
                 class="quantity-button"
                 type="button"
                 aria-label="increase ${item.name} quantity"
                 data-change-quantity="${item.id}"
                 data-delta="1"
                 >
                     +
                  </button>
                  <button
                    class="remove-button"
                    type="button"
                    data-remove-item="${item.id}"
                    >
                     Remove
                   </button>
                  </div>
                </article>
      `
    )
    .join("");
  }
  {
const totals = calculateTotals(cartDetails);
subtotalElement.textContent = formatPrice(totals.subtotal);
shippingElement.textContent = formatPrice(totals.shipping);
totalElement.textContent = formatPrice(totals.total);
updateCartcount();

}
}


function updateCartcount() {
  const itemCount = state.cart.reduce((sum,item) => sum + item.quantity, 0);
  cartCount.textContent =`${itemCount} ${itemCount === 1 ? "item" : "items"}`;

}

function addToCart(productId) {
  const  existingItem = state.cart.find((item) => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({id: productId, quantity: 1});
  }

  saveCart();
  rendercart();
}

function changeQuantity(productId, delta) {
  state.cart = state.cart
    .map((item) => {
      if (item.id !== productId) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + delta,
      };
      })
      .filter((item) => item.quantity > 0);

      saveCart();
      rendercart();
    }

    function removeItem(productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
      saveCart();
      rendercart();
    }

    function syncActiveFilterButton() {
      filterButtons.forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.category === state.activeCategory
        );

        
      });
    }

    function handleProductGridClick(event) {
      const addButton = event.target.closest("[data-add-to-cart]");

      if (!addButton) {
        return;
      }
      
    addToCart(addButton.dataset.addToCart);
    }

    

  function handleFilterClick(event) {
    const filterButton = event.target.closest("[data-category]");

    if (!filterButton) {
      return;
    }

    state.activeCategory = filterButton.dataset.category;
    syncActiveFilterButton();
    renderProducts();
  }

  function handleCartClick(event) {
    const quantityButton = event.target.closest("[data-change-quantity]");
    const removeButton = event.target.closest("[data-remove-item]");

    if (quantityButton) {
      changeQuantity(
        quantityButton.dataset.changeQuantity,
        Number(quantityButton.dataset.delta)
      );
    }

    if (removeButton) {
      removeItem(removeButton.dataset.removeItem);
    }
  }

  function init() {
    renderProducts();
    rendercart();
    syncActiveFilterButton();

    productGrid.addEventListener("click", handleProductGridClick);
    document.querySelector(".filter-row").addEventListener("click", handleFilterClick);
    cartItemsContainer.addEventListener("click", handleCartClick);
    /*checkoutButton.addEventListener("click",beginCheckout);*/
  }

  init();




    
