const serchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDeatailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//event listners
serchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDeatailsContent.parentElement.classList.remove('showRecipe')
})
// get meal list thar matches with the ingrediens

function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += ` <div class="meal-item" data-id = "${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                    </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html += "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

//create a model
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
     <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch Vedio</a>
                    </div>
    `;
    mealDeatailsContent.innerHTML = html;
    mealDeatailsContent.parentElement.classList.add("showRecipe")
}
