var onion = 0;

$("#mainOnion").mousedown(function() {
	$("#mainOnion").css("width", 610).css("height", 610).css("left", 0).css("top", 0);
});

$("#mainOnion").mouseup(function() {
	$("#mainOnion").css("width", 600).css("height", 600).css("left", 5).css("top", 5);
});

$("#mainOnion").click(function() {
  onion+= 1;
  updateOnionCounter();
});

$(".structureMain").click(function() {
  alert("aaaa");
});

function updateOnionCounter()
{
	$("#onionCounter").html(onion+" cebul");
}

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

	// alternatywny sposob (byc moze lepszy) to biblioteka core-api
	// przyklady na http://51.255.167.114/docs/ po wybraniu Source Code w menu
});