confirm("Tôi không phải robot!");
const div = document.getElementsByClassName("item");
const list = document.getElementById("list");
let index = div.length;
console.log(index);
function addItem() {
  index++;
  const newDiv = document.createElement("div");
  newDiv.className = "item";
  newDiv.innerHTML = `Phần Tử ${index}`;
  list.appendChild(newDiv);
  console.log(index);
}

function removeItem() {
  if (index > 0) {
    list.removeChild(div[index - 1]);
    index--;
  } else {
    alert("Không còn phần tử nào để xóa");
    index = 0;
  }
}
