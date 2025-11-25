
let ingredients = [
  "chicken", "beef", "rice", "garlic", "cheese", "tomato",
  "pasta", "chocolate", "lemon", "milk", "egg", "butter"
];

let suggestionInput = document.getElementById("suggestionInput");
let tagsBox = document.getElementById("ingredientTags");
let suggestionsBox = document.getElementById("suggestionsBox");
let bear = document.getElementById("bear");

let typingTimeout;

suggestionInput.addEventListener("input", () => {
  let text = suggestionInput.value.toLowerCase();
  let words = text.split(" ");

  tagsBox.innerHTML = "";

  words.forEach(w => {
    if (ingredients.includes(w)) {
      let tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = w;
      tagsBox.appendChild(tag);
    }
  });

  

  suggestionsBox.innerHTML = "";
  suggestionsBox.style.display = "none";

  for (let key in ideas) {
    if (text.includes(key)) {
      let div = document.createElement("div");
      div.textContent = ideas[key];
      suggestionsBox.style.display = "block";

      div.onclick = () => {
        suggestionInput.value = ideas[key];
        suggestionsBox.style.display = "none";
      };

      suggestionsBox.appendChild(div);
    }
  }
});



// Suggestions
let ideas = {
  chicken: "Lemon Herb Chicken Roast",
  pasta: "Creamy Garlic Pasta",
  chocolate: "Molten Lava Cake",
  rice: "Butter Garlic Rice"
};

// flavor slider
let flavorOutput = document.getElementById("flavorOutput");
let flavorSlider = document.getElementById("flavorSlider");
let flavors = ["Sweet 🍯", "Salty 🧂", "Sour 🍲", "Umami 🍪"];
let flavorCount = flavors.length;

flavorSlider.addEventListener("input", () => {
    let raw = parseFloat(flavorSlider.value);
    let step = 1 / (flavorCount - 1);
    let nearest = Math.round(raw / step);
    flavorOutput.textContent = flavors[nearest];
});


// logo follows cursor when not typing
document.addEventListener("mousemove", (e) => {
  if (!bear.classList.contains("bear-typing")) {
    let x = (e.clientX / window.innerWidth - 0.5) * 10;
    let y = (e.clientY / window.innerHeight - 0.5) * 10;
    bear.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Success and confetti
document.getElementById("recipeForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let popup = document.getElementById("successPopup");
  popup.style.display = "block";

  for (let i = 0; i < 20; i++) {
    let conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.left = Math.random() * 100 + "%";
    conf.style.animationDuration = 1 + Math.random() * 1 + "s";
    conf.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 2000);
  }
});

// confetti style
let style = document.createElement("style");
style.textContent = `
.confetti {
  position: fixed;
  top: 0;
  width: 8px;
  height: 8px;
  background: red;
  animation: fall linear;
}

@keyframes fall {
  to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
`;
document.body.appendChild(style);
