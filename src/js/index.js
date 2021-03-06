$(document).ready(function () {
  document.addEventListener("touchstart", function() {},false);

  // zgodnie z metodologią REST do obsługi danych gracza
  // bedzie potrzebnego jego ID
  var player_id = null;

  function load_player() {
    $.ajax({
      dataType: "json",
      url: "http://51.255.167.114/api/player/is_logged/"
    }).done(function (data) {
      if (data["is_logged"]) {
        $("#is_logged").html("zalogowany");
        $("#home").hide();
        $("#logout").show();

        player_id = data["player_id"];
      }
      else {
        $("#is_logged").html("niezalogowany");
        $("#home").show();
        $("#logout").hide();
      }

      load_player_info();
    });
  }

  function load_player_info() {
    if (player_id === null) {
	  location.href= "/";
      return;
    }

    $.ajax({
      dataType: "json",
      url: "/api/player/" + player_id
    }).done(function (data) {
	  var whoiam = $("#whoiam");
      whoiam.html("Zalogowany: "+data["name"]);
	  var width_w = parseInt(whoiam.css("width"))/4;
	  var new_left= 50 - width_w;
	  whoiam.css("margin-left", new_left+"px");
      
    });
  }

  load_player();

  //setInterval(plusLabelsInterval, 40);

  // alternatywny sposob (byc moze lepszy) to biblioteka core-api
  // przyklady na http://51.255.167.114/docs/ po wybraniu Source Code w menu
});

var steps = 25;
/*function plusLabelsInterval() {
 $("body > .plusLabel").each(function () {
 var step = parseInt($(this).attr("step"));
 if (step >= steps) {
 $(this).remove();
 return;
 }

 var newX = parseInt($(this).attr("startX")) + step * 1.5;
 var newY = parseInt($(this).attr("startY")) + ( 0.5 * (step - 2) * (step - 2) - 15 );

 step++;
 $(this).attr("step", step).css("left", newX).css("top", newY).css("opacity", 1 - step * 0.02);
 });
 }*/

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

$("#statisticsBtn").click(function () {
  const displayVal = $("#statisticsContainer");
  if (displayVal.css("display") === "none")
    displayVal.css("display", "inline");
  else
    displayVal.css("display", "none");
});

$( "#sndBtnA" ).click(function() {
  const soundOn = $('#sndOn');
  const soundOff = $('#sndOff');
  if(soundOn.css('display') !== "none") {
		soundOff.css("display", "inline");
		soundOn.css("display", "none");
  } else {
      soundOn.css("display", "inline");
      soundOff.css("display", "none");
  }
});

$( "#musicBtnA" ).click(function() {
  const musicOn = $('#musicOn');
  const musicOff = $('#musicOff');
  if(musicOn.css('display') !== "none") {
		musicOff.css("display", "inline");
		musicOn.css("display", "none");
  } else {
      musicOn.css("display", "inline");
      musicOff.css("display", "none");
  }
});

mouseOverStatistics = false;
mouseOverStatisticsBtn = false;
mouseOverAchievements = false;
mouseOverAchievementsBtn = false;

$("body").click(function () 
{
	if( !mouseOverStatistics && !($("#statisticsContainer").css("display") === "none") && !mouseOverStatisticsBtn )
	{
		$("#statisticsContainer").css("display", "none");
	}

	if( !mouseOverAchievements && !($("#achievementsContainer").css("display") === "none") && !mouseOverAchievementsBtn )
	{
		$("#achievementsContainer").css("display", "none");
	}	
});

$("#statisticsContainer").on( "mouseover", function () 
{
	mouseOverStatistics = true;
});

$("#statisticsContainer").on( "mouseout", function () 
{
	mouseOverStatistics = false;
});

$("#statisticsBtn").on( "mouseover", function () 
{
	mouseOverStatisticsBtn = true;
});

$("#statisticsBtn").on( "mouseout", function () 
{
	mouseOverStatisticsBtn = false;
});

$("#achievementsBtn").click(function () {
  const displayVal = $("#achievementsContainer");
  if (displayVal.css("display") === "none")
    displayVal.css("display", "inline");
  else
    displayVal.css("display", "none");
});


$("#achievementsContainer").on( "mouseover", function () 
{
	mouseOverAchievements = true;
});

$("#achievementsContainer").on( "mouseout", function () 
{
	mouseOverAchievements = false;
});

$("#achievementsBtn").on( "mouseover", function () 
{
	mouseOverAchievementsBtn = true;
});

$("#achievementsBtn").on( "mouseout", function () 
{
	mouseOverAchievementsBtn = false;
});