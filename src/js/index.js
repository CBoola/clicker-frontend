$(document).ready(function () {
  document.addEventListener("touchstart", function () {
  }, false);

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
      $("#whoiam").html("N/A");
      return;
    }

    $.ajax({
      dataType: "json",
      url: "/api/player/" + player_id
    }).done(function (data) {
      $("#whoiam").html("Zalogowany: " + data["name"]);
    });
  }

  load_player();

  //setInterval(plusLabelsInterval, 40);

  // alternatywny sposob (byc moze lepszy) to biblioteka core-api
  // przyklady na http://51.255.167.114/docs/ po wybraniu Source Code w menu
});

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

const statisticsBtn = $("#statisticsBtn");
const statisticsContainer = $("#statisticsContainer");
const achievementsContainer = $('#achievementsContainer');
const achievementsBtn = $("#achievementsBtn");

statisticsBtn.click(function () {
  if (statisticsContainer.css("display") === "none")
    statisticsContainer.css("display", "inline");
  else
    statisticsContainer.css("display", "none");
});

$("#sndBtnA").click(function () {
  const soundOn = $('#sndOn');
  const soundOff = $('#sndOff');
  if (soundOn.css('display') !== "none") {
    soundOff.css("display", "inline");
    soundOn.css("display", "none");
  } else {
    soundOn.css("display", "inline");
    soundOff.css("display", "none");
  }
});

mouseOverStatistics = false;
mouseOverStatisticsBtn = false;
mouseOverAchievements = false;
mouseOverAchievementsBtn = false;

$("body").click(function () {
  if (!mouseOverStatistics && !(statisticsContainer.css("display") === "none") && !mouseOverStatisticsBtn) {
    statisticsContainer.css("display", "none");
  }

  if (!mouseOverAchievements && !(achievementsContainer.css("display") === "none") && !mouseOverAchievementsBtn) {
    achievementsContainer.css("display", "none");
  }
});

statisticsContainer.on("mouseover", function () {
  mouseOverStatistics = true;
});

statisticsContainer.on("mouseout", function () {
  mouseOverStatistics = false;
});

statisticsBtn.on("mouseover", function () {
  mouseOverStatisticsBtn = true;
});

statisticsBtn.on("mouseout", function () {
  mouseOverStatisticsBtn = false;
});

achievementsBtn.click(function () {
  if (achievementsContainer.css("display") === "none")
    achievementsContainer.css("display", "inline");
  else
    achievementsContainer.css("display", "none");
});


achievementsContainer.on("mouseover", function () {
  mouseOverAchievements = true;
});

achievementsContainer.on("mouseout", function () {
  mouseOverAchievements = false;
});

achievementsBtn.on("mouseover", function () {
  mouseOverAchievementsBtn = true;
});

achievementsBtn.on("mouseout", function () {
  mouseOverAchievementsBtn = false;
});

document.addEventListener("touchstart", function () {
}, false);
