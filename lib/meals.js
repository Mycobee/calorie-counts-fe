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
  							var liEnd = `${foundMeal.foods[index].name}</a></b></li>`
								var removeBtn = `<button type="button" class="remove-food" id="${foundMeal.id} - ${foundMeal.foods[index].id}"> Remove </button>`
  							var ulEnd = '</ul>'
  							$("#meals").append(ulStart + liStart + liEnd + removeBtn + ulEnd)
  						});

  						$.ajax({
  							type: "Get",
    					  contentType: "application/json; charset=utf-8",
    					  url: "http://localhost:3000/api/v1/foods",
  							success: function (foundFoods) {
									var foodAddHeader = '<h1> Add Food To Meal </h1> \n'
									var foodDropDown = '	<select id="food-drop-down"></select>\n'
									var foodMealAddBtn = '	<button type="button" id="food-meal-add"> Add to Meal </button> \n'
              		var indexBtn = '<button type="button" id="meals-index"> View All Meals </button>'

              		$("#meals").append(foodAddHeader).append(foodDropDown).append(foodMealAddBtn).append(indexBtn)

									var foodMealArry = []
									document.querySelectorAll('.food-list').forEach(function(element) {
										foodMealArry.push(element.innerText + " ");
									});

									$.each (foundFoods, function (index) {
										if (!String(foodMealArry).includes(foundFoods[index].name)) {
											$('#food-drop-down').append(`<option value=${foundFoods[index].id}> ${foundFoods[index].name} </option>`)
										}
									});

  								$("#food-meal-add").on("click", function() {
  									$.ajax({
  										type: "Post",
    								  contentType: "application/json; charset=utf-8",
    								  url: `http://localhost:3000/api/v1/meals/${mealId}/foods/${$("#food-drop-down").val()}`,
  										success: function (successfulAdd) {
  											getMeals();
											}
										});
									});

  								//This button queries the meal index
  								$("#meals-index").on("click", function() {
  									getMeals();
  								});
								}
							});
  					}
  				});
  			});
  		}
  	});
	}

	getMeals();
});
