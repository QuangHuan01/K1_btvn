function getUser(userId, callback) {
  setTimeout(() => {
    callback({ id: userId, name: "John", age: 30 });
  }, 1000);
}

function getPurchases(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, userId: userId, product: "Laptop", price: 1000 },
      { id: 2, userId: userId, product: "Phone", price: 2000 },
    ]);
  }, 1000);
}

function getProductDetails(productId, productName, productPrice, callback) {
  setTimeout(() => {
    callback({ id: productId, name: productName, price: productPrice });
  }, 1000);
}

getUser(1, (user) => {
  console.log("Bài 1", user);
  getPurchases(user.id, (productList) => {
    console.log("Bài 1", productList);
    productList.forEach((product) => {
      getProductDetails(
        product.id,
        product.product,
        product.price,
        (details) => {
          console.log("Bài 1", details);
        }
      );
    });
    const totalPrice = productList.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    setTimeout(() => {
      console.log("Bài 1 Tổng Tiền:", totalPrice);
      console.log("============");
    }, 1000);
  });
});
