let couple1 = document.getElementById("couple1-images");
let couple2 = document.getElementById("couple2-images");
let couple3 = document.getElementById("couple3-images");
let couple4 = document.getElementById("couple4-images");

function Images(couple, n) {
  if (couple) {
    for (let j = 1; j <= img_number; j++) {
      couple.innerHTML += `<div class="card"><img src="/Assets/Images/Couple${n}/${j}.png"/></div>`;
    }
  }
}

const img_number = 32;
Images(couple1, 1);
Images(couple2, 2);
Images(couple3, 3);
Images(couple4, 4);
