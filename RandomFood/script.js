const generateBtn = document.querySelector('#generate-btn');
const mealsContainer = document.querySelector('.meals');
const bannerText = document.querySelector('.banner h2');
const detailPrompt = document.querySelector('#promptBlock');
const closeBtn = document.querySelector('#promptBlock .btn-close');

const meals = {
    breakfast:{},
    lunck:{},
    dinner:{}
}

closeBtn.addEventListener('click',()=>detailPrompt.classList.toggle('hidden'));

const shortenPara = para =>{
    const words = para.split(' ');
    if(words.length>30){
        return words.slice(0,30).join(' ') + '...';
    }else{
        return para;
    }
}

const showDetail = meal=>{
    detailPrompt.classList.toggle('hidden');
    const mealName = document.querySelector('#promptBlock h3');
    const mealThumbnail = document.querySelector('#promptBlock img');
    const mealRecipe = document.querySelector('#promptBlock p');
    const closeBtn = document.querySelector('#promptBlock .btn-close');
    mealName.innerHTML =  meal.strMeal;
    mealThumbnail.src= meal.strMealThumb;
    mealThumbnail.alt = meal.strMeal;;
    mealRecipe.innerHTML = meal.strInstructions;
}

const generateSingleMeal = async ()=>{
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('single meal', data.meals[0]);
        return data.meals[0];
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

const generateMeals = async ()=>{
    mealsContainer.innerHTML = '';
    for(const prop in meals){
        meals[prop] = await generateSingleMeal();
        createSingleCard(meals[prop])
    }
    generateBtn.innerText = 'Regenerate';
    bannerText.innerText = "Here’s what we got for you today! Enjoy your food :)";
}

const createSingleCard = (meal)=>{
    console.log('start creating a new single card')
    // Create the section and set its class
    const section = document.createElement('section');
    section.className = 'meal';
    // Create the div for the card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '18rem';
    // Create the img element
    const img = document.createElement('img');
    img.src = meal.strMealThumb; // Replace with actual source
    img.className = 'card-img-top';
    img.alt = meal.strMeal; // Replace with actual alt text
    // Create the card body div
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';
    // Create the card title h5
    const h5 = document.createElement('h5');
    h5.className = 'card-title dish-title';
    h5.textContent = meal.strMeal;
    // Create the card text paragraph
    const p = document.createElement('p');
    p.className = 'card-text recipe-brief';
    p.textContent = shortenPara(meal.strInstructions);
    // Create the link
    const a = document.createElement('a');
    a.href = '#'; // Replace with actual href
    a.className = 'btn btn-success';
    a.textContent = 'Check detail';
    // Append elements to the card body
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);
    cardBodyDiv.appendChild(a);
    // Append the image and card body to the card div
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    section.appendChild(cardDiv);
    // Append the section to the body or another container element
    mealsContainer.appendChild(section);
    a.addEventListener('click',()=>showDetail(meal))
}



generateBtn.addEventListener('click',generateMeals)