const recipes = [
    {
        "name": " Delight",
        "imageSrc": "https://source.unsplash.com/random?veggies",
        "time": "30 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.2
    },
    {
        "name": " Salad",
        "imageSrc": "https://source.unsplash.com/random?salad",
        "time": "20 min",
        "type": "veg",
        "isLiked": false,
        "rating": 3.9
    },
    {
        "name": "Fried Chicken",
        "imageSrc": "https://source.unsplash.com/random?friedChicken",
        "time": "55 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.3
    },
    {
        "name": "Burger",
        "imageSrc": "https://source.unsplash.com/random?burger",
        "time": "30 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.2
    },
    {
        "name": "Caesar Salad",
        "imageSrc": "https://source.unsplash.com/random?caesarSalad",
        "time": "25 min",
        "type": "veg",
        "isLiked": false,
        "rating": 3.8
    },
];

function displayRecipes(recipesData) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipesData.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.imageSrc;
        recipeCard.appendChild(recipeImage);

        const recipeInfo = document.createElement('div');
        recipeInfo.classList.add('recipe-info');

        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        recipeInfo.appendChild(recipeName);

        const recipeType = document.createElement('div');
        recipeType.classList.add('recipe-type');
        recipeType.textContent = recipe.type === 'veg' ? 'Veg' : 'Non-Veg';
        recipeInfo.appendChild(recipeType);

        const recipeTime = document.createElement('div');
        recipeTime.classList.add('recipe-time');
        recipeTime.textContent = recipe.time;
        recipeInfo.appendChild(recipeTime);

        const recipeRating = document.createElement('div');
        recipeRating.classList.add('recipe-rating');
        recipeRating.textContent = `Rating: ${recipe.rating}`;
        recipeInfo.appendChild(recipeRating);

        const likeButton = document.createElement('div');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = recipe.isLiked ? '&#9829;' : '&#9825;';
        likeButton.addEventListener('click', () => toggleLike(index));
        recipeInfo.appendChild(likeButton);

        recipeCard.appendChild(recipeInfo);
        recipeContainer.appendChild(recipeCard);
    });
}

function toggleLike(recipeIndex) {
    recipes[recipeIndex].isLiked = !recipes[recipeIndex].isLiked;
    displayRecipes(getFilteredRecipes());
}

function filterRecipes(searchQuery) {
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    displayRecipes(filteredRecipes);
}

function filterByType(type) {
    const filteredRecipes = type === 'all' ? recipes : recipes.filter((recipe) => recipe.type === type);
    displayRecipes(filteredRecipes);
}

function filterByRating(ratingType) {
    let filteredRecipes;
    if (ratingType === 'above') {
        filteredRecipes = recipes.filter((recipe) => recipe.rating > 4.5);
    } else if (ratingType === 'below') {
        filteredRecipes = recipes.filter((recipe) => recipe.rating < 4.0);
    }
    displayRecipes(filteredRecipes);
}

function getFilteredRecipes() {
    const activeFilter = document.querySelector('.filter-button.active').id;
    switch (activeFilter) {
        case 'showVeg':
            return recipes.filter((recipe) => recipe.type === 'veg');
        case 'showNonVeg':
            return recipes.filter((recipe) => recipe.type === 'non-veg');
        default:
            return recipes;
    }
}

function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.classList.toggle('show');
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchQuery = e.target.value.trim();
    filterRecipes(searchQuery);
});

document.getElementById('showAll').addEventListener('click', () => {
    document.querySelector('.filter-button.active').classList.remove('active');
    document.getElementById('showAll').classList.add('active');
    displayRecipes(recipes);
});

document.getElementById('showVeg').addEventListener('click', () => {
    document.querySelector('.filter-button.active').classList.remove('active');
    document.getElementById('showVeg').classList.add('active');
    filterByType('veg');
});

document.getElementById('showNonVeg').addEventListener('click', () => {
    document.querySelector('.filter-button.active').classList.remove('active');
    document.getElementById('showNonVeg').classList.add('active');
    filterByType('non-veg');
});

document.getElementById('ratingAbove').addEventListener('change', () => {
    if (document.getElementById('ratingAbove').checked) {
        filterByRating('above');
    }
});

document.getElementById('ratingBelow').addEventListener('change', () => {
    if (document.getElementById('ratingBelow').checked) {
        filterByRating('below');
    }
});

document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);

document.getElementById('toggleNav').addEventListener('click', () => {
    document.querySelector('.nav-items').classList.toggle('show');
});

// Initial display of all recipes
displayRecipes(recipes);
