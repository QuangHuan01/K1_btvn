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

function getProductDetails(productId, productName, productPrice, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: productId, name: productName, price: productPrice });
    }, 1000);
  });
}

getUser(1)
  .then((user) => {
    console.log("Bài 2", user);
    return getPurchases(user.id);
  })
  .then((purhcases) => {
    console.log("Bài 2", purhcases);
    purhcases.forEach((product) => {
      getProductDetails(product.id, product.product, product.price).then(
        (details) => {
          console.log("Bài 2", details);
        }
      );
    });
    const totalPrice = purhcases.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    setTimeout(() => {
      console.log("Bài 2 Tổng Tiền:", totalPrice);
      console.log("============");
    }, 1000);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
