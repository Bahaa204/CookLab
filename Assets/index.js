let Bookbtn = document.getElementById("session-btn");
let Closebtn = document.getElementById("close");
let popup = document.getElementById("popup");
let cards = document.getElementById("cards");


Bookbtn.addEventListener("click", () => {
  popup.style.display = "block";
});

Closebtn.addEventListener("click", () => {
  popup.style.display = "none";
});

const Names = ["John & Jane", "Alex & Sam", "Chris & Pat", "Taylor & Morgan"];
for (let i = 0; i < Names.length; i++) {
  cards.innerHTML += `<div class="card">
  <img src="/Assets/Images/Couple${i+1}/card-image.png"/>
  <h3>${Names[i]}</h3>
  <a href="/Couples/Couple${i + 1}.html">See More</a>
</div>`;
}