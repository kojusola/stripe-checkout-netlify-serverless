import { handleFormSubmission } from "./stripe-purchase.js";

function createProductFromTemplate(item) {
  const template = document.querySelector("#product");
  const product = template.content.cloneNode(true);
  console.log(product);
  product.querySelector("h2").innerText = item.name;
  product.querySelector(".description").innerText = item.description;
  product.querySelector("[name=sku]").value = item.sku;
  product.querySelector(".price").innerText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.currency,
  }).format((item.amount / 100).toFixed(2));
  const img = product.querySelector("img");
  img.src = item.image;
  img.alt = item.name;
  const form = product.querySelector("form");
  form.addEventListener("submit", handleFormSubmission);

  return product;
}

export async function loadProducts() {
  const data = await fetch("/.netlify/functions/get-products")
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const products = document.querySelector(".products");

  //Add Mark up to display the products;
  //   const pre = document.createElement("pre");
  //   pre.innerText = JSON.stringify(data, null, 2);

  //   products.appendChild(pre);
  data.forEach((item) => {
    console.log(1);
    const product = createProductFromTemplate(item);

    products.appendChild(product);
  });
}
