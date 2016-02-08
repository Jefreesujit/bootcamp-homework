'use strict';

$(document).ready(  function(){

var link = "https://currencyconverter.p.mashape.com/availablecurrencies/";
var link11 = "https://currencyconverter.p.mashape.com/?from=";
var link12 = "&from_amount=";
var link13 = "&to=";

var key = "Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8";

var template = $("#entry-template").html();

var templatecompile = Handlebars.compile(template);

	$.ajax(
	{
		async: true,
		crossDomain: true,
		url: link,
		type: 'GET',
		headers: { 'X-Mashape-Key' : key },     
		data: {},
		dataType: 'json',
		success: function (data) {

		var context = { getData : data };

		var output = templatecompile(context);

		$("#select-list1").html(output);
		$("#select-list2").html(output);


		} ,
		error: function (err) {
		  console.log(err);

		}
	});


var template1 = $("#entry-template2").html();

var templatecompile1 = Handlebars.compile(template1);

	/* By listening to the change event you are forcing the user to click outside 
	   the input box for him to see the result. Using key up would have been more effective */
	$("#select-list1 , #select-list2 , #amount ").on('change' , function(event){

	var a = $("#select-list1 option:selected").val();
	var b = $("#amount").val();
	var c = $("#select-list2 option:selected").val();



	$.ajax({

		url: link11+a+link12+b+link13+c , /* This makes it difficult for anybody to understand what is 
											 happening here. Please use more menaing full names so that 
											 people can understand what is happening */
		type: 'GET',
		headers: { 'X-Mashape-Key' : key },

		success: function (data) {

		if ( data != null)  {

		// This will make it easier to understand the content of the context object
		var context = {
			from:data.from, 
			to :data.to, 
			from_amount:data.from_amount, 
			to_amount: (data.to_amount).toFixed(2) 
		};

		var output = templatecompile1(context);

		$("#output-box").html(output);  
		
		}  
	}

	});

});
});


