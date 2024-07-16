const apiUrl = "http://localhost:3000/recipes/";

fetch(apiUrl)
  .then((response) => response.json())
  .then((recipes) => {
    let list = document.querySelector("#recipeList");
    let listDetails = document.querySelector("#recipeDetails");
    recipes.forEach((recipe) => {
      const li = document.createElement("li");
      li.addEventListener("click", () => showRecipeDetails(recipe));
      li.textContent = recipe.title;
      list.className = "recipe";
      listDetails.className = "recipe-details";
      li.innerHTML = `
      <div>
      <img src="${recipe.image}" alt="${recipe.title}">
      
      </div>
      `;
      list.appendChild(li);
    });
    function showRecipeDetails(recipe) {
      list.style.display = "none";
      listDetails.style.display = "block";

      listDetails.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${recipe.description}</p>
            <h3>Ingredients</h3>
            <ul>${recipe.ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}</ul>
            <h3>Instructions</h3>
            <ol>${recipe.instructions
              .map((step) => `<li>${step}</li>`)
              .join("")}</ol>
              ${
                recipe.video
                  ? `
          <h3>Video</h3>
          <div class="video-container">
            <iframe width="560" height="315" src="${recipe.video}" frameborder="0" allowfullscreen></iframe>
        `
                  : ""
              }
            <span class="back-button" onclick="showRecipeList()">Back to recipes</span>
            </div>
          `;
    }
    window.showRecipeList = function () {
      listDetails.style.display = "none";
      list.style.display = "block";
    };
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.toLowerCase();
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm)
      );

      // Clear existing recipe list
      list.innerHTML = "";

      // Display filtered recipes
      if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
          const recipeItem = document.createElement("li");
          recipeItem.classList.add("recipe-item");
          recipeItem.textContent = recipe.title;
          list.appendChild(recipeItem);
        });
      } else {
        const apiUrl = "http://localhost:3000/recipes/";

        fetch(apiUrl)
          .then((response) => response.json())
          .then((recipes) => {
            let list = document.querySelector("#recipeList");
            let listDetails = document.querySelector("#recipeDetails");
            recipes.forEach((recipe) => {
              const li = document.createElement("li");
              li.addEventListener("click", () => showRecipeDetails(recipe));
              li.textContent = recipe.title;
              list.className = "recipe";
              listDetails.className = "recipe-details";
              li.innerHTML = `
      <div>
      <img src="${recipe.image}" alt="${recipe.title}">
      
      </div>
      `;
              list.appendChild(li);
            });
            function showRecipeDetails(recipe) {
              list.style.display = "none";
              listDetails.style.display = "block";

              listDetails.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${recipe.description}</p>
            <h3>Ingredients</h3>
            <ul>${recipe.ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}</ul>
            <h3>Instructions</h3>
            <ol>${recipe.instructions
              .map((step) => `<li>${step}</li>`)
              .join("")}</ol>
              ${
                recipe.video
                  ? `
          <h3>Video</h3>
          <div class="video-container">
            <iframe width="560" height="315" src="${recipe.video}" frameborder="0" allowfullscreen></iframe>
        `
                  : ""
              }
            <span class="back-button" onclick="showRecipeList()">Back to recipes</span>
            </div>
          `;
            }
            window.showRecipeList = function () {
              listDetails.style.display = "none";
              list.style.display = "block";
            };
            const searchInput = document.getElementById("searchInput");
            const searchButton = document.getElementById("searchButton");

            searchButton.addEventListener("click", function (e) {
              e.preventDefault();
              const searchTerm = searchInput.value.toLowerCase();
              const filteredRecipes = recipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(searchTerm)
              );

              // Clear existing recipe list
              list.innerHTML = "";

              // Display filtered recipes
              if (filteredRecipes.length > 0) {
                filteredRecipes.forEach((recipe) => {
                  const recipeItem = document.createElement("li");
                  recipeItem.classList.add("recipe-item");
                  //recipeItem.textContent = recipe.title;
                  recipeItem.innerHTML = `
                   <img src="${recipe.image}" alt="${recipe.title}">
                  `;
                  recipeItem.addEventListener("click", () =>
                    showRecipeDetails(recipe)
                  );
                  listDetails.appendChild(recipeItem);
                });
              } else {
                alert("No recipe found");
              }
            });
          });
      }
    });
  });
