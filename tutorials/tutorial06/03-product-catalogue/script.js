const productGridEl = document.querySelector("#productGrid");
const productForm = document.querySelector("#productForm");
productForm.addEventListener("submit", addItemToList);

const products = [
  {
    name: "Laptop",
    price: 999.99,
    description: "High performance laptop for work and play",
    category: "Electronic",
    inStock: true,
  },
  {
    name: "Coffee Maker",
    price: 49.99,
    description: "Brew perfect coffee every morning",
    category: "Appliance",
    inStock: true,
  },
  {
    name: "Wireless Headphones",
    price: 79.99,
    description: "Crystal clear music all day long",
    category: "Electronic",
    inStock: false,
  },
];

function formatPrice(priceNum) {
  const priceStr = String(priceNum);
  return `$${priceStr}`;
}

function createProductCard(productObj) {
  const productName = productObj.name;
  const productPrice = formatPrice(productObj.price);
  const productDescription = productObj.description;
  const productCategory = productObj.category;
  const productInStock = productObj.inStock;

  if (productInStock) {
    const newProductCard = `
        <div class='product-card'>
            <h2>${productName}</h2>
            <div class='price'>${productPrice}</div>
            <p class='description'>${productDescription}</p>
            <span class='category'>${productCategory}</span>
            <span class='stock-status in-stock'>In Stock</span>
        </div>`;
    return newProductCard;
  } else {
    const newProductCard = `
        <div class='product-card'>
            <h2>${productName}</h2>
            <div class='price'>${productPrice}</div>
            <p class='description'>${productDescription}</p>
            <span class='category'>${productCategory}</span>
            <span class='stock-status out-of-stock'>Out of Stock</span>
        </div>`;
    return newProductCard;
  }
}

// console.log(createProductCard(products[0]));

function renderProducts() {
  productGridEl.innerHTML = "";
  for (let product of products) {
    productGridEl.insertAdjacentHTML("beforeend", createProductCard(product));
  }
}

function addItemToList(event) {
  event.preventDefault();

  const newProductName = document.querySelector("#productName").value;
  const newProductPrice = document.querySelector("#productPrice").value;
  const newProductDescription = document.querySelector(
    "#productDescription",
  ).value;
  const newProductCategory = document.querySelector("#productCategory").value;
  const newInStock = document.querySelector("#productInStock").checked;

  const newProductObj = {
    name: newProductName,
    price: newProductPrice,
    description: newProductDescription,
    category: newProductCategory,
    inStock: newInStock,
  };

  products.push(newProductObj);

  renderProducts();

  productForm.reset();
}

renderProducts();

// for (let product of products) {
//   console.log(product);
// }
