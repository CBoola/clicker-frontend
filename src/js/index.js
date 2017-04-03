
$(document).ready(function() {

	// zgodnie z metodologią REST do obsługi danych gracza
	// bedzie potrzebnego jego ID
	var player_id = null;

	function load_player()
	{
		$.ajax({
			dataType: "json",
			url: "/api/player/is_logged"
		})
		.done(function(data) {
			if (data["is_logged"])
			{
				$("#is_logged").html("zalogowany");
				$("#home").hide();
				$("#logout").show();

				player_id = data["player_id"];
			}
			else
			{
				$("#is_logged").html("niezalogowany");
				$("#home").show();
				$("#logout").hide();
			}

			load_player_info();
		});
	}

	function load_player_info()
	{
		if(player_id == null)
		{
			$("#whoiam").html( "N/A" );
			return;
		}

		$.ajax({
			dataType: "json",
			url: "/api/player/"+player_id
		})
		.done(function(data) {
			$("#whoiam").html( data["name"] );
		});
	}

	load_player();
	
	setInterval(plusLabelsInterval, 100);

	// alternatywny sposob (byc moze lepszy) to biblioteka core-api
	// przyklady na http://51.255.167.114/docs/ po wybraniu Source Code w menu
});

var steps = 20;
function plusLabelsInterval()
{
	$(".plusLabel").each(function() {
		var step = parseInt($(this).attr("step"));
		if(step >= steps)
		{
			$(this).remove();
			return;
		}
		
		var startX = parseInt($(this).attr("startX"));
		var startY = parseInt($(this).attr("startY"));
		
		var newX = startX + step*2;
		var newY = startY + ( (step-5)*(step-5) - 5 );
		
		step++;
		$(this).attr("step", step);
		$(this).css("left", newX);
		$(this).css("top", newY);
		$(this).css("opacity", 1- step*0.04);
		
		//console.log(newX);
	});
	
}


