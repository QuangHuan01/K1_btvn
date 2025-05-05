function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John", age: 30 });
    }, 1000);
  });
}

function getPurchases(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId: userId, product: "Laptop", price: 1000 },
        { id: 2, userId: userId, product: "Phone", price: 2000 },
      ]);
    }, 1000);
  });
}

function getProductDetails(product) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: product.id, name: product.product, price: product.price });
    }, 1000);
  });
}

async function productData() {
  try {
    const user = await getUser(1);
    console.log("Bài 3", user);
    const productList = await getPurchases(user.id);
    console.log("Bài 3", productList);
    let count = 0;
    let sum = 0;
    productList.forEach(async (product) => {
      const productDetail = await getProductDetails(product);
      console.log("Bài 3", productDetail);
      sum += product.price;
      count++;
      if (count === productList.length) {
        console.log("Bài 3 Tổng là ", sum);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
productData();
