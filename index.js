var SPOONACULAR_SEARCH_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?mashape-key=UpJfS3A3qYmsh0NUiMRjpeYL21Cbp1VPxEgjsnAG81P2m5DHAR'
var SPOONACULAR_DESCRIPTIONS_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/summary?mashape-key=UpJfS3A3qYmsh0NUiMRjpeYL21Cbp1VPxEgjsnAG81P2m5DHAR'

function getDataFromApi(searchTerm, callback) {
  var query = {
    fillIngredients: false,
    ingredients: searchTerm,
    limitLicense: true,
    number: 12,
    ranking: 1
  }
  $.getJSON(SPOONACULAR_SEARCH_URL, query, callback);
}

function getSummaryFromApi(searchTerm) {
 	var query = SPOONACULAR_DESCRIPTIONS_URL.replace('{id}', searchTerm)
	$.getJSON(query, function(data){
		console.log(data.summary);
		var rawSummary = data.summary
		var newSummary = rawSummary.slice(0, 200);
		$('#' + data.id + ' .recipe-desc').html(newSummary + '...');
	});
}

function testCallback (data) {
	console.log(data);


	for (var i = 0; i < data.length; i++) {

		var RECIPE_JSON_ID = data[i].id;
		var RECIPE_JSON_IMAGE = data[i].image;
		var RECIPE_JSON_TITLE = data[i].title;
		var RECIPE_JSON_MISSED = data[i].missedIngredientCount;
		var RECIPE_JSON_USED = data[i].usedIngredientCount;
		var RESULT_RECIPE_TEMPLATE = (
			 '<figure class="recipe-card" id="'+data[i].id+'">' + //added id to tile
				'<a href='+changeRecipeLink(RECIPE_JSON_ID, RECIPE_JSON_IMAGE)+' class="recipe-link">'+
					'<h2 class="recipe-title">'+RECIPE_JSON_TITLE+'</h2>' +
					'<img src='+RECIPE_JSON_IMAGE+' alt="" class="recipe-image"/>' +
					'<figcaption class="recipe-description">' +
						'<p class="recipe-supplies">'+changeRecipeSupplies(RECIPE_JSON_USED, RECIPE_JSON_MISSED)+'</p>' +
						'<p class="recipe-desc"></p>' +
					'</figcaption>'+
		        '</a>'+
		    '</figure>'
		   );
		   displayRecipeTiles(RESULT_RECIPE_TEMPLATE);
		   getSummaryFromApi(data[i].id);
	};
}

function realCallback(data){
	testCallback(data);
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
	return linkTitle
}

function changeRecipeSupplies(data1, data2) {
	console.log(data2)
	console.log(data1 + '/' + (data1+data2))
	var missingIngredients =data1 + ' of ' + (data1+data2) + ' ingredients!';
	return missingIngredients;
}

function displayRecipeTiles(template) {
	$('#results').append(template);
}

function submitUserData() {
	$('#ingredients-form').on('submit', function(event){
		event.preventDefault();
		$('#results').empty();
		$("header").removeClass("middle");
		var userData = $('input[type=text]').val();
		var newUserData = userData.replace(' ', ',');
		getDataFromApi(newUserData, realCallback);
		$("input[type=text]").val('');
	})
}

submitUserData();