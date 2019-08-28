$(document).ready(function(){
	//The first ajax call upon page load queries the API food index path and returns them as a food ul's
	var getFoods = function() {
	$("#foods").empty()
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

				//This ajax call gets a single food and returns it as a UL element and renders a delete button
				$.ajax({
					type: "Get",
  			  contentType: "application/json; charset=utf-8",
  			  url: "http://localhost:3000/api/v1/foods/" + String(foodId),
					indexValue: foodId,
					success: function (foundFood) {
						var ulStart = `<ul class='food-attrs' >\n`
						var liName = `	<li> <b>Name: ${foundFood.name}</b></li>\n`
						var liCalories = `	<li>Calories: ${foundFood.calories}</li>\n`
						var ulEnd = '</ul>'
						var indexBtn = '<button type="button" id="foods-index"> View All Foods </button>'
						var deleteBtn = '<button type="button" id="delete-food"> Delete Food </button>'
						var updateBtn = '<button type="button" id="update-food"> Update Food </button>'
						$('#foods').empty().append(ulStart + liName + liCalories + ulEnd + deleteBtn + indexBtn + updateBtn)

						//This button queries the index again
						$("#foods-index").on("click", function() {
							getFoods();
						});	

						//This ajax request deletes a food and queries the index again
						$("#delete-food").on("click", function() {
							$.ajax({
								type: "Delete",
  						  contentType: "application/json; charset=utf-8",
  						  url: "http://localhost:3000/api/v1/foods/" + String(foodId),
								success: function (deleteSuccess) {
									getFoods();
								}
							});
						});


						//This button creates a form for updating an existing food
						var foodId = this.indexValue 
						$("#update-food").on("click", function() {
							var formTemplate = `
									<form id='change-food'>
				  					Name:<br>
				  					<input type='text' name='Name'><br>
				  					Calories:<br>
				  					<input type='text' name='Calories'>
										<input type='submit' value='Submit'>
									</form>
							`
							$('#foods').empty().append(formTemplate);
								$('#change-food').on("click", function(evt) {
    							evt.preventDefault();
									inputArry = $( this ).serialize().split('&');
									var patchBody = { food:
										{ name: inputArry[0].split("=")[1],
										calories: inputArry[1].split("=")[1] }
									}
    							$.ajax({
    								type: "PATCH",
    								contentType: "application/json; charset=utf-8",
    								url: "http://localhost:3000/api/v1/foods/" + foodId,
    								data: JSON.stringify(patchBody),
    								success: function (visitIndex) {
											getFoods();
										},
    							});
								});	
						});	
					}
				});
			});
		}
	});
	}

	getFoods();


	$("#add-food").submit(function(evt) {
    evt.preventDefault();
		inputArry = $( this ).serialize().split('&');
		var postBody = { food:
			{ name: inputArry[0].split("=")[1],
			calories: inputArry[1].split("=")[1] }
		}

    $.ajax({
    	type: "POST",
    	contentType: "application/json; charset=utf-8",
    	url: "http://localhost:3000/api/v1/foods",
    	data: JSON.stringify(postBody),
    	success: function (visitIndex) {
				$("form").trigger("reset");
				getFoods();
			},
    });
	})
});
