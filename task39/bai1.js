function getData(callback) {}
setTimeout(() => {
  console.log("===Bài 1===");
  console.log("1, 2, 3, 4");
}, 1000);

getData((data) => {
  console.log(data); // Sau 1 giây in ra: [1, 2, 3, 4]
});
