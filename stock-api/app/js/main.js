$(document).ready( 	function(){

var link = "https://stockvider.p.mashape.com/indicator/DATA/";
var key = "Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8";

var template = $("#entry-template").html();

var templatecompile = Handlebars.compile(template);
	


$("#btn").click(function(){

	var a = $("#search").val();

	$.ajax({

		url: link+a+"/" ,
		type: 'GET',
		headers: { 'X-Mashape-Key' : key },

		success: function (data) {

		if ( data != null) 	{

		//console.log(data);

		//var sliced_data = data.slice(3,data.length);

		//var parsed_data = JSON.parse(sliced_data);

		//alert(data["Dataset"][0].Close);

		var context = {name : a ,close:data["Dataset"][0].Close, open:data["Dataset"][0].Open };

		var output = templatecompile(context);

		$("#output-box").html(output);
		
		}

	}

	});

});

});





