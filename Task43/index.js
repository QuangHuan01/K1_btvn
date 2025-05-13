const pre = document.getElementById("pre");
const currentPage = document.getElementById("current-page");
const next = document.getElementById("next");
const product = document.getElementById("product");
const sortSelect = document.getElementById("sortSelect");
const search = document.getElementById("searchTitle");
//!============================
let page = 1;
let limit = 12;
let skip = (page - 1) * limit;
let totalProduct = 1000;
let searchQuery = "";
let sortOrder = "";
currentPage.innerText = page;
//!============================
const fetchProducts = async () => {
  try {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
    }
    if (sortOrder) {
      url += `&sortBy=price&order=${sortOrder}`;
    }

    const res = await fetch(url);
    const { products, total } = await res.json();
    totalProduct = total;
    return products;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
};
//!============================
const renderProducts = (products) => {
  product.innerHTML = "";
  products.forEach((item) => {
    const divEle = document.createElement("div");
    divEle.className = "col";
    divEle.innerHTML = `<img src="${item.thumbnail}" alt="${item.title}" class="img-fluid">
      <div class="content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p class="price">$${item.price}</p>
        <button class="btn btn-primary">Thêm vào giỏ hàng</button>
      </div>`;
    product.appendChild(divEle);
  });
};
//!============================
const loadAndRenderProducts = async () => {
  const products = await fetchProducts();
  renderProducts(products);
};
//!============================
pre.addEventListener("click", () => {
  if (page > 1) {
    page--;
    skip = (page - 1) * limit;
    currentPage.innerText = page;
    loadAndRenderProducts();
  }
});
//!============================
next.addEventListener("click", () => {
  const pageMax = Math.ceil(totalProduct / limit);
  if (page < pageMax) {
    page++;
    skip = (page - 1) * limit;
    currentPage.innerText = page;
    loadAndRenderProducts();
  }
});
//!============================
search.addEventListener("input", () => {
  searchQuery = search.value.trim();
  page = 1;
  skip = (page - 1) * limit;
  currentPage.innerText = page;
  loadAndRenderProducts();
});
//!============================
sortSelect.addEventListener("change", () => {
  sortOrder = sortSelect.value;
  page = 1;
  skip = (page - 1) * limit;
  currentPage.innerText = page;
  loadAndRenderProducts();
});
//!============================
loadAndRenderProducts();
