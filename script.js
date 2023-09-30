let containers = document.querySelectorAll('.container');
let instru = document.querySelector('.instru');

containers.forEach( container => {
  let mealImage = container.querySelector('.meal-image');
  let mealName = container.querySelector('.meal-name');
  let mealCat = container.querySelector('.meal-cat');
  let mealTags = container.querySelector('.meal-tags');
  let instruBtn = container.querySelector('.instru-btn');
  
  let url = "https://www.themealdb.com/api/json/v1/1/random.php";
  
  
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let meal = data.meals[0];
     

      mealImage.style.backgroundImage = `url(${meal.strMealThumb})`;
      mealName.innerHTML = `${meal.strMeal}`;
      mealCat.innerHTML = `${meal.strCategory}`;
      
      // mealTags.innerHTML = `${meal.strTags}`;
      if ( meal.strTags == null ) 
      { 
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
        instru.scrollIntoView({ behavior: 'smooth' });
        
      }) 
      
    });
  
  
})