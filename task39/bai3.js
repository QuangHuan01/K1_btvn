function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("1, 2, 3, 4");
    }, 1000);
  });
}

async function logData() {
  try {
    const data = await getData();
    console.log("===Bài 3===");
    console.log(data); // Sau 1 giây in ra: [1, 2, 3, 4]
  } catch (error) {
    console.error(error);
  }
}

logData();
