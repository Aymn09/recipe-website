/* Random Meals Part */

let containers = document.querySelectorAll('.container');
let instru = document.querySelector('.instru');

containers.forEach(container => {
  let mealImage = container.querySelector('.meal-image');
  let mealName = container.querySelector('.meal-name');
  let mealCat = container.querySelector('.meal-cat');
  let mealTags = container.querySelector('.meal-tags');
  let instruBtn = container.querySelector('.instru-btn');

  let randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";


  fetch(randomUrl)
    .then((response) => response.json())
    .then((data) => {
      let meal = data.meals[0];


      mealImage.style.backgroundImage = `url(${meal.strMealThumb})`;
      mealName.innerHTML = `${meal.strMeal}`;
      mealCat.innerHTML = `${meal.strCategory}`;

      // mealTags.innerHTML = `${meal.strTags}`;
      if (meal.strTags == null) {
        mealTags.innerHTML = `No Tags Available`
      } else {
        mealTags.innerHTML = `${meal.strTags}`;
      }


      instruBtn.addEventListener('click', () => {
        // instru.innerHTML = meal.strInstructions ;


        instru.innerHTML = `
        <div class="two alt-two instru-title">
          <h1 class='title'>Instructions:</h1>
        </div>
        <p id="meal-instructions">${meal.strInstructions}</p>
        `;
        instru.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

      })

    });


})

/* Search Part*/ 

let searchInput = document.getElementById('search-input');
let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');

searchInput.addEventListener('keyup', (event) => {
  if (event.key == "Enter") {
    searchForMeal();
  }
});

function searchForMeal() {
  result.scrollIntoView({
    behavior: 'smooth'
  });

  let inputValue = document.getElementById('search-input').value;
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

  fetch(url + inputValue)
    .then((response) => response.json())
    .then((data) => {
      let meal = data.meals[0];

      result.innerHTML = `
  <div class="two alt-two random-meals">
    <h1 class='title'>Your Meal:</h1>
  </div>
  <div id="searched-meal-thumb" height="220px"></div>
  <div id="searched-meal-name">${meal.strMeal}</div>
  <div id="searched-meal-category">${meal.strCategory}</div>
  <div id="searched-meal-area">${meal.strArea}</div>
  <ul id="meal-ingredients">
    <h1>Ingredients</h1>
    ${(() => {
      let i = 1;
      let ingredientKey = 'strIngredient' + i;
      let ingredientsHTML = '';
      
      while (i < 35 && meal[ingredientKey] !== "") {
        ingredientsHTML += `<li class="ingredient">${meal[ingredientKey]}</li>`;
        i++;
        ingredientKey = 'strIngredient' + i;
      }
      
      return ingredientsHTML;
    })()}
  </ul>
  <button class="instru-btn" id="open-btn">Get Instructions</button>
  <div class="instru-box">
    <div class="title">Instructions</div>
    ${meal.strInstructions}
    <button class="close-instru-btn" id='close-btn'>Close Instructions</button>
  </div>
`;

      let mealImage = document.getElementById('searched-meal-thumb');
      mealImage.style.backgroundImage = `url(${meal.strMealThumb})`;

      let openBtn = document.getElementById('open-btn');

      openBtn.addEventListener('click', () => {
        let instruBox = document.querySelector('.instru-box');
        instruBox.style.display = 'flex';
        instruBox.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        document.getElementById('close-btn').addEventListener(('click'), () => {
          instruBox.style.display = 'none';
        });

      })

    });
}