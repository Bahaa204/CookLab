$(function () {
  // Getting all the elements
  let modal = $("#modal");
  let modalClosebtn = $("#modal-close");
  let modalImage = $("#modal-image");
  let modalText = $("#modal-text");
  let modalTitle = $("#modal-title");
  let arrowleft = $("#left-arrow");
  let arrowright = $("#right-arrow");

  let filteredData = [];
  let isFilterActive = false;
  let Favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function EmptyModal() {
    modalImage.attr("src", "");
    modalTitle.text("");
    modalText.empty();
  }

  // Hover Effect for the arrows
  arrowleft.on("mouseover", function () {
    arrowleft.attr("src", "/Assets/Images/Recipe Book/ArrowLeftHover.png");
    arrowleft.attr("alt", "Arrow Left Hover");
  });
  arrowleft.on("mouseleave", function () {
    arrowleft.attr("src", "/Assets/Images/Recipe Book/ArrowLeft.png");
    arrowleft.attr("alt", "Arrow Left");
  });

  arrowright.on("mouseover", function () {
    arrowright.attr("src", "/Assets/Images/Recipe Book/ArrowRightHover.png");
    arrowright.attr("alt", "Arrow Right Hover");
  });
  arrowright.on("mouseleave", function () {
    arrowright.attr("src", "/Assets/Images/Recipe Book/ArrowRight.png");
    arrowright.attr("alt", "Arrow Right");
  });

  function LoadPartial(element, data) {
    for (let index = 0; index < 3; index++) {
      element.append(`<li>${data[index]}</li>`);
    }
  }

  let indexes = [{ left: 0 }, { right: 1 }];
  function loadDataToBook(data) {
    $(".book-text").remove();
    indexes.forEach((index) => {
      let half = Object.keys(index);
      let index1 = Object.values(index);
      let selected_data = data[index1];
      let DataDisplay = $(`
        <div class="book-text">
        <img src="${selected_data.image}" alt="${
        selected_data.name
      }" loading="lazy"/>
        <p>${selected_data.name}</p>
        <div class="ingredients">
          Ingredients:
          <ol id="ingredients-list"></ol>
          <button type="button" id="ingredients-btn">click to show more</button>
        </div>
        <div class="instructions">
          Instructions:
          <ol id="instructions-list">
          </ol>
          <button type="button" id="instructions-btn">
            click to show more
          </button>
        </div>
        <p>Prep Time in Minutes: ${selected_data.prepTimeMinutes}</p>
        <p>Cook Time in Minutes: ${selected_data.cookTimeMinutes}</p>
        <p>Cuisine: ${selected_data.cuisine}</p>
        <p>Rating: ${selected_data.rating}</p>
        <p>Meal Type: ${selected_data.mealType}</p>
        <button type="button" id="favorite-btn">${
          Favorites.includes(selected_data.id) ? "Unfavorite" : "Favorite"
        }</button>
      </div>
    `);
      let selector = `.book.${half}`;
      $(selector).prepend(DataDisplay);

      LoadPartial(
        $(`${selector} #ingredients-list`),
        selected_data.ingredients
      );
      LoadPartial(
        $(`${selector} #instructions-list`),
        selected_data.instructions
      );

      $(`${selector} #ingredients-btn`).on("click", function () {
        EmptyModal();
        modal.addClass("open");
        document.body.style.overflow = "hidden";

        modalImage.attr("src", selected_data.image);
        modalTitle.text(`${selected_data.name} Ingredients`);
        modalText.append(
          selected_data.ingredients.map((i) => `<li>${i}</li>`).join("")
        );
      });

      $(`${selector} #instructions-btn`).on("click", function () {
        EmptyModal();
        modal.addClass("open");
        document.body.style.overflow = "hidden";

        modalImage.attr("src", selected_data.image);
        modalTitle.text(`${selected_data.name} Instructions`);
        modalText.append(
          selected_data.instructions.map((i) => `<li>${i}</li>`).join("")
        );
      });

      $(`${selector} #favorite-btn`).on("click", () => {
        if (Favorites.includes(selected_data.id)) {
          Favorites = Favorites.filter((id) => id !== selected_data.id);
        } else {
          Favorites.push(selected_data.id);
        }

        localStorage.setItem("favorites", JSON.stringify(Favorites));
        loadDataToBook(data);
      });
    });
  }

  function DisplayNext(data) {
    if (!isFilterActive && indexes[1].right < data.length - 1) {
      indexes[0].left += 2;
      indexes[1].right += 2;
    }
    if (isFilterActive) {
      if (indexes[1].right < filteredData.length - 1) {
        indexes[0].left += 2;
        indexes[1].right += 2;
      }
      loadDataToBook(filteredData);
    } else {
      loadDataToBook(data);
    }
  }

  function DisplayPrevious(data) {
    if (!isFilterActive && indexes[0].left > 0) {
      indexes[0].left -= 2;
      indexes[1].right -= 2;
    }
    if (isFilterActive) {
      if (indexes[0].left > 0) {
        indexes[0].left -= 2;
        indexes[1].right -= 2;
      }
      loadDataToBook(filteredData);
    } else {
      loadDataToBook(data);
    }
  }

  function ApplyFilter(data) {
    let name = $("#nameInput").val().trim().toLowerCase();
    let mealType = $("#mealType").val();
    let prepTime = parseInt($("#prepTimeInput").val()) || 0;

    isFilterActive = mealType !== "All" || name !== "" || prepTime !== 0;

    filteredData = data.filter((recipe) => {
      if (mealType == "All") {
        return (
          recipe.name.trim().toLowerCase().includes(name) &&
          recipe.prepTimeMinutes >= prepTime
        );
      }
      return (
        recipe.name.trim().toLowerCase().includes(name) &&
        recipe.prepTimeMinutes >= prepTime &&
        recipe.mealType.includes(mealType)
      );
    });

    loadDataToBook(filteredData);
  }

  function ShowFavorites(data) {
    let favorite_data = data.filter((recipe) => Favorites.includes(recipe.id));
    loadDataToBook(favorite_data);
    console.log(favorite_data);
  }

  // loading the data from an external JSON File
  $.getJSON("/Assets/Scripts/Data.json", function (data) {
    loadDataToBook(data);

    arrowright.on("click", () => {
      $(".book-text").remove();
      DisplayNext(data);
    });
    arrowleft.on("click", () => {
      $(".book-text").remove();
      DisplayPrevious(data);
    });

    $("#nameInput").on("input", () => {
      ApplyFilter(data);
    });
    $("#prepTimeInput").on("input", () => {
      ApplyFilter(data);
    });
    $("#mealType").on("change", () => {
      ApplyFilter(data);
    });

    let favoritecheckbox = $("#favoritesInput");
    favoritecheckbox.on("change", () => {
      if (favoritecheckbox.is(":checked")) ShowFavorites(data);
      else loadDataToBook(data);
    });
  }).fail(function (jqxhr, textstatus, error) {
    console.log(`Failed to load Data.json: ${textstatus}, ${error}`);
  });

  modalClosebtn.on("click", function () {
    modal.removeClass("open");
    document.body.style.overflow = "";
  });

  modal.on("click", function (event) {
    if (
      event.target === modal ||
      event.target.hasAttribute("data-close-modal")
    ) {
      modal.removeClass("open");
      document.body.style.overflow = "";
    }
  });
});
