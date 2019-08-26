$(document).ready(function(){
	$.ajax({
		type: "Get",
    contentType: "application/json; charset=utf-8",
    url: "http://localhost:3000/api/v1/foods",
		success: function (found_foods) {
				$.each (found_foods, function (index) {
					var ul_start = `<ul class='food_attrs' >\n`
					var li_start= `	<li id=${'food_' + found_foods[index].id}><b>Name: <a href="javascript:;">`
					var li_end = `${found_foods[index].name}</a></b></li>\n`
					var calories = `	<li>Calories: ${found_foods[index].calories}</li>\n`
					var ul_end = '</ul>'
					$("#foods").append(ul_start + li_start + li_end + calories + ul_end)
				});
		}
	});
});
