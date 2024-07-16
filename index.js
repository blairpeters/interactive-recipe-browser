const dataPath = "http://localhost:3000/recipes";

fetch(dataPath)
  .then((response) => response.json())
  .then((recipes) => {
    const recipeList = document.getElementById("recipeList");
    const recipeDetails = document.getElementById("recipeDetails");

    // Display initial recipes (optional)
    // recipes.forEach((recipe) => {
    //   const recipeItem = document.createElement("li");
    //   recipeItem.classList.add("recipe-item");
    //   recipeItem.textContent = recipe.title;
    //   recipeList.appendChild(recipeItem);
    // });
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.toLowerCase();

      // Check if exact recipe title is entered
      const matchingRecipe = recipes.find(
        (recipe) => recipe.title.toLowerCase() === searchTerm
      );

      if (matchingRecipe) {
        // Display full recipe details
        recipeList.style.display = "none";
        recipeDetails.style.display = "block";
        showRecipeDetails(matchingRecipe);
      } else {
        // Search for recipes containing the term
        const filteredRecipes = recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchTerm)
        );

        // Clear existing recipe list
        recipeList.innerHTML = "";

        // Display filtered recipes
        if (filteredRecipes.length > 0) {
          filteredRecipes.forEach((recipe) => {
            const recipeItem = document.createElement("li");
            recipeItem.classList.add("recipe-item");
            recipeItem.textContent = recipe.title;
            recipeItem.addEventListener("click", () =>
              showRecipeDetails(recipe)
            );
            recipeList.appendChild(recipeItem);
          });
        } else {
          recipeList.innerHTML = "<p>No recipes found.</p>";
        }
      }
    });

    function showRecipeDetails(recipe) {
      recipeDetails.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.description}</p>
        <div class="ingredients-instructions">
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}</ul>
        <h3>Instructions</h3>
        <ol>${recipe.instructions
          .map((step) => `<li>${step}</li>`)
          .join("")}</ol>
          </div>
        ${
          recipe.video
            ? `
          <h3>Video</h3>
          <div class="video-container">
            <iframe width="560" height="315" src="${recipe.video}" frameborder="0" allowfullscreen></iframe>
          </div>
          `
            : ""
        }
        <span class="back-button" onclick="showRecipeList()">Back to recipes</span>
      `;
    }

    window.showRecipeList = function () {
      recipeDetails.style.display = "none";
      recipeList.style.display = "block";
    };
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
    });
  })
  .catch((error) => {
    console.error("Error fetching recipes:", error);
  });
