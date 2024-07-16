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
          </div>
        `
                   : ""
               }
            <span class="back-button" onclick="showRecipeList()">Back to recipes</span>
          `;
    }
    window.showRecipeList = function () {
      listDetails.style.display = "none";
      list.style.display = "block";
    };
  });
