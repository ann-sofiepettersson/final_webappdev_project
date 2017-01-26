//var data_file = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=30ea077d760fb096a1fb2db0ac20aeda";
//var request = new XMLHttpRequest();
//var handler = function () {
//    console.log("readyState:" + request.readyState);
//    console.log("status:" + request.status);
//    console.log("responseText:" + request.responseText);
//    console.log("-----");
//    if ((request.readyState === 4) && (request.status === 200)) {
//        //var result = request.responseText;
//        var obj = JSON.parse(request.responseText);
//        for (var t in obj.results) {
//            $("#list").append("<ul><li>" + obj.results[t].poster_path + "</li><li>" + obj.results[t].title + "</li></ul>");
//        }
//    }
//}
//$(document).ready(function () {
//    $("button").click(function () {
//        request.onreadystatechange = handler;
//        request.open("GET", data_file);
//        request.send();
//    })
//});

/*  (function($) {
             $(function() {
                 var jcarousel = $('.jcarousel').jcarousel();

                 $('.jcarousel-control-prev')
                     .on('jcarouselcontrol:active', function() {
                         $(this).removeClass('inactive');
                     })
                     .on('jcarouselcontrol:inactive', function() {
                         $(this).addClass('inactive');
                     })
                     .jcarouselControl({
                         target: '-=1'
                     });

                 $('.jcarousel-control-next')
                     .on('jcarouselcontrol:active', function() {
                         $(this).removeClass('inactive');
                     })
                     .on('jcarouselcontrol:inactive', function() {
                         $(this).addClass('inactive');
                     })
                     .jcarouselControl({
                         target: '+=1'
                     });


       /*   $('.carousel[data-type="multi"].item').each(function() {
              var next = $(this).next();
              if (!next.length) {
                  next = $(this).siblings(':first');
              }
              next.children(':first-child').clone().appendTo($(this));
              for (var j = 0; j < 1; j++) {
                  next = next.next();
                  if (!next.length) {
                      next = $(this).siblings(':first');
                  }
                  next.children(':first-child').clone().appendTo($(this));
              }
          });*/

$(document).ready(function() {
    var api_key = "30ea077d760fb096a1fb2db0ac20aeda";
    var movieURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=";
    var tvURL = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=";
    var imageUrl = "https://image.tmdb.org/t/p/w300";
    var poster;


    //Display list of popular movies
    $.getJSON(movieURL + api_key, function(data) {

        for (var i in data.results) {
            poster = data.results[i].poster_path;
            var moviePoster = imageUrl + poster;

            $(".movie").append('<a href="#"><img src= "' + moviePoster + '"/></a>');
        }
    });

    //Display list of popular tv-series 
    $.getJSON(tvURL + api_key, function(data) {

        for (var i in data.results) {
            poster = data.results[i].poster_path;
            var tvPoster = imageUrl + poster;
            $('<i class="fa fa-refresh fa-spin"/>').appendTo(".tv")
            $(".tv").append('<a href="#"><img src= "' + tvPoster + '"/></a>');
        }
    });

    //Search movies
    $("#movieBtn").click(function() {
        $(".movie-info").slideDown(200);
        var m = $("#searchMovie").val();

        imageUrl = "https://image.tmdb.org/t/p/w300";
        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query=" + m, function(data) {
            /* if (data.results[0] != null) {*/

            poster = data.results[0].poster_path;
            var moviePoster = imageUrl + poster;
            var movieId = data.results[0].id;
            console.log(data.results[0].poster_path);
            console.log(data.results[0].id);
            $("#mPoster").html('<img src="' + moviePoster + '"/>');
            $("#title").html("Title: " + data.results[0].title);
            $("#releaseDate").html("Release date: " + data.results[0].release_date);
            $("#overview").html("Overview: " + data.results[0].overview);

            //Get movie genre
            $.getJSON("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + api_key + "&language=en-US", function(data) {
                $("#movieGenre").append("<ul>");
                $("#movieGenre ul").attr("class", "movie-genre-list");
                for (var g in data.genres) {
                    console.log(data.genres[g].name);
                    $(".movie-genre-list").append("<li>" + data.genres[g].name + "</li>");
                }
            });

            //Get movie cast from search result
            /*    $.getJSON("https://api.themoviedb.org/3/movie/" + movieId + "-" + data.results[0].title + "/casts?api_key=" + api_key, function(data) {
                   
                    for (var c in data.cast) {
                        console.log(data.cast[c].profile_path);
                        var cast = data.cast[c].name;
                        var castImg = data.cast[c].profile_path;
                       
                        if (data.cast[c].profile_path !== null) {
                            $("#movieCast .row div").html('<img src= "' + imageUrl + castImg + '"/>');
                        }
                    }
                });*/



            /* }*/

        });

    });

    //Search tv-show
    $("#tvBtn").click(function() {
        $(".tv-info").slideDown(200);
        var tv = $("#searchTv").val();
        imageUrl = "https://image.tmdb.org/t/p/w300";
        $.getJSON("https://api.themoviedb.org/3/search/tv?api_key=" + api_key + "&language=en-US&query=" + tv, function(data) {
            /* if (data.results[0] != null) {*/
            var poster = data.results[0].poster_path;
            var tvPoster = imageUrl + poster;
            var tvId = data.results[0].id;
            $("#tvPoster").html('<img src="' + tvPoster + '"/>');
            $("#name").html("Name: " + data.results[0].name);
            $("#firstAirDate").html("First air date: " + data.results[0].first_air_date);
            $("#tvOverview").html("Overview: " + data.results[0].overview);
            console.log(data.results[0].poster_path);
            console.log(data.results[0].id);
            /* }*/


            $("#searchTv").html("");

            $.getJSON("https://api.themoviedb.org/3/tv/" + tvId + "?api_key=" + api_key + "&language=en-US", function(data) {
                $("#tvGenre").append("<ul>").attr("id", "tvGenreList");
                for (var g in data.genres) {
                    console.log(data.genres[g].name);
                    $("#tvGenreList").append("<li>" + data.genres[g].name + "</li>");
                }
            });


            /*    $.getJSON("https://api.themoviedb.org/3/tv/" + tvId + "-" + data.results[0].name + "/cast?api_key=" + api_key, function(data) {
                    
                    for (var c in data.cast) {
                        console.log(data.cast[c].profile_path);
                        var cast = data.cast[c].name;
                        var castImg = data.cast[c].profile_path;

                       
                        if (data.cast[c].profile_path !== null) {
                            $("#tvCast .row div").append('<img src= "' + imageUrl + castImg + '"/>');
                        }
                    }
                });*/

        });
    });

    $.getJSON("https://api.themoviedb.org/3/search/tv?api_key=30ea077d760fb096a1fb2db0ac20aeda&language=en-US&query=the%20flash", function(data) {
        var imageUrl = "https://image.tmdb.org/t/p/w300/lUFK7ElGCk9kVEryDJHICeNdmd1.jpg";

        $("#wishListImg").html('<img src="' + imageUrl + '"/>');
        $("#listTitle").html("Title: " + data.results[0].name);
        $("#ListReleaseDate").html("Release date: " + data.results[0].first_air_date);
        $("#listOverview").html("Overview: " + data.results[0].overview);
    });

    $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=30ea077d760fb096a1fb2db0ac20aeda&language=en-US&query=assassins%20creed", function(data) {
        var imageUrl = "https://image.tmdb.org/t/p/w300/tIKFBxBZhSXpIITiiB5Ws8VGXjt.jpg";

        $("#watchedImg").html('<img src="' + imageUrl + '"/>');
        $("#watchedTitle").html("Title: " + data.results[0].title);
        $("#watchedReleaseDate").html("Release date: " + data.results[0].release_date);
        $("#watchedOverview").html("Overview: " + data.results[0].overview);
    });

});