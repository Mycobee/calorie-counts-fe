$(document).ready(function(){
	//The first ajax call upon page load queries the API meal index path and returns them as a meal ul's
	var getMeals = function() {
  	$("#meals").empty()
  	$.ajax({
  		type: "Get",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:3000/api/v1/meals",
  		success: function (foundMeals) {
				$.each (foundMeals, function (index) {
					var ulStart = `<ul class='meal-attrs' >\n`
					var liStart= `	<li> <b>`
					var link = `<a class='meal-link' id='${'meal-' + foundMeals[index].id}' href='javascript:;'>`
					var liEnd = `${foundMeals[index].name}</a></b></li>\n`
					var ulEnd = '</ul>'
					$("#meals").append(ulStart + liStart + link + liEnd + ulEnd)
				});

  			//When a meal title link is clicked, it triggers the show endpoint request
  			$(".meal-link").on("click", function() {
  				var mealId = $(this).attr('id').split('-')[1];

  				//This ajax call gets a single meal and returns it's foods contents
  				$.ajax({
  					type: "Get",
    			  contentType: "application/json; charset=utf-8",
    			  url: "http://localhost:3000/api/v1/meals/" + String(mealId) + "/foods",
  					success: function (foundMeal) {
              // Adds meal name as header
  						var mealName = `<h3>${foundMeal.name}</h3>`
  						$("#meals").empty().append(mealName)

              // List meal's foods
  						$.each (foundMeal.foods, function (index) {
  							var ulStart = `<ul class='food-list' >\n`
  							var liStart= `	<li> <b>Name: `
  							var liEnd = `${foundMeal.foods[index].name}</a></b></li>\n`
  							var ulEnd = '</ul>'
  							$("#meals").append(ulStart + liStart + liEnd + ulEnd)
  						});

              // Adds meals index button at the end
              var indexBtn = '<button type="button" id="meals-index"> View All Meals </button>'
              $("#meals").append(indexBtn)

  						//This button queries the meal index
  						$("#meals-index").on("click", function() {
  							getMeals();
  						});
  					}
  				});
  			});
  		}
  	});
	}

	getMeals();
});
