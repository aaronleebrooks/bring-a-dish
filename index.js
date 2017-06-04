var SPOONACULAR_SEARCH_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?mashape-key=UpJfS3A3qYmsh0NUiMRjpeYL21Cbp1VPxEgjsnAG81P2m5DHAR'
var SPOONACULAR_DESCRIPTIONS_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/summary?mashape-key=UpJfS3A3qYmsh0NUiMRjpeYL21Cbp1VPxEgjsnAG81P2m5DHAR'
var RESULT_RECIPE_TEMPLATE = (
	 '<figure class="recipe-card">' +
		'<a href="" class="recipe-link">'+
			'<h2 class="recipe-title"></h2>' +
			'<img src="thissource.com" alt="" class="recipe-image"/>' +
			'<figcaption class="recipe-desc">' +
				'<p class="recipe-supplies"></p>' +
			'</figcaption>'+
        '</a>'+
    '</figure>'
);

var RESULT_DESCRIPTION_ARRAY = [];

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

function getSummaryFromApi(searchTerm, callback) {
  var query = SPOONACULAR_DESCRIPTIONS_URL.replace('{id}', searchTerm)
  $.getJSON(query, callback);
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
		getSummaryFromApi(RECIPE_JSON_ID, pushSummary);
		changeRecipeLink(RECIPE_JSON_ID, RECIPE_JSON_IMAGE);
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

function replaceLinkTitle(data) {
	console.log(data)
	var newData = data.replace(/Images/g, '');
	return newData.replace(/.jpg/g, '');
}

function changeRecipeLink(data, data2) {
	console.log(data)
	var linkTitle = replaceLinkTitle(data2);
	console.log(linkTitle)
	$('a:last').attr('href', linkTitle);
}

function changeRecipeSupplies(data1, data2) {
	console.log(data1 + '/' + (data1+data2))
	var missingIngredients = data1 + '/' + (data1+data2)
	$('.recipe-supplies').text(missingIngredients)
}

function displaySummary(data) {
	$('.recipe-supplies').removeData().append('<p>' + data + '<p>');
}

function pushSummary(data) {
	console.log (data.summary)
	displaySummary(data.summary);
};

function displayRecipeTiles() {
	$('#results').append(RESULT_RECIPE_TEMPLATE);
}


getDataFromApi('duck', testCallback);