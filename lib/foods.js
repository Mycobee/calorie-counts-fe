$(document).ready(function(){
	//The first ajax call upon page load queries the API food index path and returns them as a food ul's
	$.ajax({
		type: "Get",
    contentType: "application/json; charset=utf-8",
    url: "http://localhost:3000/api/v1/foods",
		success: function (foundFoods) {
				$.each (foundFoods, function (index) {
					var ulStart = `<ul class='food-attrs' >\n`
					var liStart= `	<li> <b>Name: `
					var link = `<a class='food-link' id='${'food-' + foundFoods[index].id}' href='javascript:;'>`
					var liEnd = `${foundFoods[index].name}</a></b></li>\n`
					var liCalories = `	<li>Calories: ${foundFoods[index].calories}</li>\n`
					var ulEnd = '</ul>'
					$("#foods").append(ulStart + liStart + link + liEnd + liCalories + ulEnd)
				});
	
			//When a food title link is clicked, it triggers the show endpoint request
			$(".food-link").on("click", function() {
				var foodId = $(this).attr('id').split('-')[1];

				//This ajax call gets a single food and returns it as a UL element
				$.ajax({
					type: "Get",
  			  contentType: "application/json; charset=utf-8",
  			  url: "http://localhost:3000/api/v1/foods/" + String(foodId),
					success: function (foundFood) {
						var ulStart = `<ul class='food-attrs' >\n`
						var liName = `	<li> <b>Name: ${foundFood.name}</b></li>\n`
						var liCalories = `	<li>Calories: ${foundFood.calories}</li>\n`
						var ulEnd = '</ul>'
						$('#foods').empty().append(ulStart + liName + liCalories + ulEnd)
					}
				});
			});
		}
	});
});
