'use strict';


var link = "https://currencyconverter.p.mashape.com/availablecurrencies/";
var link11 = "https://currencyconverter.p.mashape.com/?from=";
var link12 = "&from_amount=";
var link13 = "&to=";
var key = "Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8";

function seturl(a,b,c)
{
return link11+a+link12+b+link13+c ;
}

$(document).ready(  function(){

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

		$("#select-list1").html(output).selectr();
		$("#select-list2").html(output).selectr();
		$(".loader").hide();
		$("#input-content").show();

		} ,
		error: function (err) {
		  console.log(err);

		}
	});

var template1 = $("#entry-template2").html();

var templatecompile1 = Handlebars.compile(template1);

$("#select-list1 , #select-list2 , #amount ").on('change' , function(event){

	var a = $("#select-list1 option:selected").val();
	var b = $("#amount").val();
	var c = $("#select-list2 option:selected").val();

	$(" #amount ").prop('disabled', true);
	$('.select-list').selectr({ disabled : true });
	$("#output-box").hide();
	$(".loader").show();

	$.ajax({

		url: seturl(a,b,c) ,
		type: 'GET',
		headers: { 'X-Mashape-Key' : key },

		success: function (data) {

		if ( data != null)  {

		var context = {from:data.from, to :data.to, from_amount:data.from_amount, to_amount: (data.to_amount).toFixed(2) };

		var output = templatecompile1(context);

		$("#output-box").html(output);  
		$(".loader").hide();
		$("#output-box").show();
		$('.select-list').selectr({ disabled : false });
		$(" #amount ").prop('disabled', false);

		
		}  }

	});

});


});



