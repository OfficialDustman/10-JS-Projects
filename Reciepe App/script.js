const mealsEl = document.getElementById("meals"),
      favMealEl = document.getElementById("fav-meals"),
      searchItem = document.getElementById("search-item"),
      searchBtn = document.getElementById("search");


async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal);

    addMeal(randomMeal, true)
}
getRandomMeal()

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)

    const respData = await resp.json()
    const meal = respData.meals[0];

    return meal
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)

    const respData = await resp.json()
    
    const meals = await respData.meals;

    return meals
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div')
    meal.classList.add('meal')

    meal.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `
            <span class="random"> Random Recipe </span>`
                    : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    btn = meal.querySelector('.meal-body .fav-btn')
    
    btn.addEventListener('click', () => {

        console.log(mealData.idMeal);

        if (btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal)
            btn.classList.remove('active')
        } else {
            addMealLS(mealData.idMeal)
            btn.classList.add('active')
        }

        favMealEl.innerHTML = '';
        getFavMeal()
    })

    mealsEl.appendChild(meal)
}

function addMealLS(mealId) {
    const mealIds = getMealLS()

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId])) 
}

function removeMealLS(mealId) {
    const mealIds = getMealLS()

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId) )) 
}

function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds')) 

    return mealIds === null ? [] : mealIds;
}

async function getFavMeal() {
    const mealIds = getMealLS()
    
    const meals = []

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i]
        
        meal = await getMealById(mealId)
        
        addFavMeal(meal)
    }

}
getFavMeal()

function addFavMeal(mealData) {
    const favMeal = document.createElement('li')


    favMeal.classList.add('swiper-slide')
    favMeal.innerHTML = `
            <img src="${mealData.strMealThumb}" 
            alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="clear">
                <i class="fas fa-window-close"></i>
            </button>
    `;

    const close =  favMeal.querySelector('.clear')
    
    close.addEventListener('click', () => {
        removeMealLS(mealData.idMeal)

        favMealEl.innerHTML = '';

        getFavMeal()
    })

    favMealEl.appendChild(favMeal)
}

searchBtn.addEventListener('click', async () => {

    mealsEl.innerHTML = '';

    const search = searchItem.value;
    const meals = await getMealsBySearch(search)

    if (meals) {
        meals.forEach(meal => {
            addMeal(meal)
        });   
    }
})