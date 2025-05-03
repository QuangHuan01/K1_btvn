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

function getProductDetails(productId, productName, productPrice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: productId, name: productName, price: productPrice });
    }, 1000);
  });
}

async function productData() {
  try {
    const user = await getUser(1);
    console.log("Bài 3", user);
    const productList = await getPurchases(user.id);
    console.log("Bài 3", productList);
    for (const product of productList) {
      const productDetail = await getProductDetails(
        product.id,
        product.product,
        product.price
      );
      console.log("Bài 3", productDetail);
    }
    const totalPrice = productList.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    setTimeout(() => {
      console.log("Bài 3 Tổng Tiền:", totalPrice);
      console.log("============");
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
productData();
