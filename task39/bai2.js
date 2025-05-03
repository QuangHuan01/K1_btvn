function getData(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("===Bài 2===");
      const data = "1, 2, 3, 4";
      resolve(data);
    }, 1000);
  });
}
// Sử dụng
getData()
  .then((data) => console.log(data)) // Sau 1 giây in ra: [1, 2, 3, 4]
  .catch((error) => console.error(error));
