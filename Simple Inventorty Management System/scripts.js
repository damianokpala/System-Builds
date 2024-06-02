class Product {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  updateQuantity(newQuantity) {
    this.quantity = newQuantity;
  }
}

class Inventory {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    const existingProduct = this.findProductByName(product.name);
    if (existingProduct) {
      console.log(existingProduct);
      existingProduct.updateQuantity(
        existingProduct.quantity + product.quantity
      );
    } else {
      this.products.push(product);
    }
    this.displayProducts();
  }

  updateProductQuantity(name, newQuantity) {
    const product = this.findProductByName(name);
    if (product) {
      product.updateQuantity(newQuantity);
      this.displayProducts();
    } else {
      alert("Product not found");
    }
  }

  findProductByName(name) {
    return this.products.find((product) => product.name === name);
  }

  displayProducts() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";
    this.products.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.textContent = `${product.name} - Quantity: ${product.quantity}`;
      inventoryList.appendChild(productItem);
    });
  }
}

const inventory = new Inventory();

document
  .getElementById("add-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const quantity = parseInt(
      document.getElementById("product-quantity").value,
      10
    );
    const product = new Product(name, quantity);
    inventory.addProduct(product);
    document.getElementById("add-product-form").reset();
  });

document
  .getElementById("update-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("update-product-name").value;
    const newQuantity = parseInt(
      document.getElementById("update-product-quantity").value,
      10
    );
    inventory.updateProductQuantity(name, newQuantity);
    document.getElementById("update-product-form").reset();
  });
