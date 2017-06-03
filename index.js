var SPOONACULAR_SEARCH_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?mashape-key=UpJfS3A3qYmsh0NUiMRjpeYL21Cbp1VPxEgjsnAG81P2m5DHAR'
var RESULT_RECIPE_TEMPLATE = (
	 '<figure class="recipe-card">' +
		'<a href="" class="recipe-link">'+
			'<h2 class="recipe-title"></h2>' +
			'<img src="thissource.com" alt="" class="recipe-image"/>' +
			'<figcaption>' +
				'<p class="recipe-supplies"></p>' +
				'<p class="recipe-price"></p>'+
			'</figcaption>'+
        '</a>'+
    '</figure>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    qillIngredients: false,
    ingredients: searchTerm,
    limitLicense: false,
    number: 12,
    ranking: 1
  }
  $.getJSON(SPOONACULAR_SEARCH_URL, query, callback);
}

function testCallback (data) {
	console.log(data);

	for (var i = 0; i < data.length; i++) {
		var RECIPE_JSON_ID = data[i].id;
		var RECIPE_JSON_IMAGE = data[i].image;
		var RECIPE_JSON_TITLE = data[i].title;
		var RECIPE_JSON_MISSED = data[i].missedIngredientCount;
		var RECIPE_JSON_USED = data[i].usedIngredientCount;
		displayRecipeTiles();
		changeRecipeLink(RECIPE_JSON_ID);
		changeRecipeImage(RECIPE_JSON_IMAGE);
		changeRecipeTitle(RECIPE_JSON_TITLE);
		changeRecipeSupplies(RECIPE_JSON_USED, RECIPE_JSON_MISSED);
	};
}

function changeRecipeTitle(data) {
	console.log(data)
	$('h2:last').text(data);
}

function changeRecipeImage(data) {
	console.log(data)
	$('img:last').attr('src', data);
}

function changeRecipeLink(data) {
	console.log(data)
	$('a:last').attr('href', data);
}

function changeRecipeSupplies(data1, data2) {
	console.log(data1 + '/' + (data1+data2))
}

function displayRecipeTiles() {
	$('#results').append(RESULT_RECIPE_TEMPLATE);
}


getDataFromApi('apples', testCallback);
