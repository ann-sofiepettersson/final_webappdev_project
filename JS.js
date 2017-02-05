/*By Ann-Sofie Pettersson*/

$(document).ready(function() {


    $(function() {

        $('#listOverview').slimScroll({

        });
        $('#watchedOverview').slimScroll({

        });
        $('#movieCast').slimScroll({

        });
        $('#tvCast').slimScroll({

        });
        $('#movieOverview').slimScroll({

        });
        $('#tvOverview').slimScroll({

        });
    });



    var api_key = "30ea077d760fb096a1fb2db0ac20aeda";
    var movieURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=";
    var tvURL = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=";
    var imageUrl = "https://image.tmdb.org/t/p/w300";
    var poster;


    //Display list of popular movies
    $.getJSON(movieURL + api_key, function(data) {
        $(".movie").append('<div class="innerMovie"><a id="arrowLeft" class="left-control" href="#" data-slide="prev"><i class="fa fa-chevron-left fa-3x"></i></a><a id="arrowRight" class="right-control" href="#" data-slide="next"><i class="fa fa-chevron-right fa-3x"></i></a></div>')

        for (var i in data.results) {
            poster = data.results[i].poster_path;
            var moviePoster = imageUrl + poster;
            var movieId = data.results[0].id

            $(".innerMovie").append('<img src="' + moviePoster + '"/>');
        }

        $("#arrowRight, #arrowLeft").click(function(e) {
            e.preventDefault();
            var dir = this.id == "arrowRight" ? '+=' : '-=';
            $(".movie").stop().animate({ scrollLeft: dir + '600' }, 1000);
        });
    });

    //Display list of popular tv-series 
    $.getJSON(tvURL + api_key, function(data) {
        $(".tv").append('<div class="innerTv"><a id="arrowLeftTv" class="left-control" href="#" data-slide="prev"><i class="fa fa-chevron-left fa-3x"></i></a><a id="arrowRightTv" class="right-control" href="#" data-slide="next"><i class="fa fa-chevron-right fa-3x"></i></a></div>')

        for (var i in data.results) {
            poster = data.results[i].poster_path;
            var tvPoster = imageUrl + poster;

            $(".innerTv").append('<img src= "' + tvPoster + '"/>');
        }
        $("#arrowRightTv, #arrowLeftTv").click(function(e) {
            e.preventDefault();
            var dir = this.id == "arrowRightTv" ? '+=' : '-=';
            $(".tv").stop().animate({ scrollLeft: dir + '600' }, 1000);
        });
    });

    //Search movies
    $("#movieBtn").click(function() {
        $(".movie-info").slideDown(200);
        $("#mPoster, #title, #movieOverview, .movie-genre-list ul, #movieCast").empty();

        var m = $("#searchMovie").val();

        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query=" + m, function(data) {

            if (data.results[0] != null) {

                poster = data.results[0].poster_path;
                var moviePoster = imageUrl + poster;
                var movieId = data.results[0].id;

                $("#mPoster").html('<img src="' + moviePoster + '"/><a id="addTo" href="#myLists"><i class="fa fa-plus fa-2x"></i><span class="tooltip">Add to wishlist</span></a>');
                $("#title").html(data.results[0].title + ' (' + data.results[0].release_date + ')');
                $("#movieOverview").html(data.results[0].overview);

                //Get movie genre
                $.getJSON("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + api_key + "&language=en-US", function(data) {

                    /*$("#movieGenre").append("<ul>");*/
                    $("#movieGenre ul").attr("class", "movie-genre-list");
                    for (var g in data.genres) {
                        console.log(data.genres[g].name);

                        $(".movie-genre-list").append("<li><em>" + data.genres[g].name + "</em></li>");
                    }
                });

                //Get movie cast from search result
                $.getJSON("https://api.themoviedb.org/3/movie/" + movieId + "-" + data.results[0].title + "/casts?api_key=" + api_key, function(data) {

                    for (var c in data.cast) {
                        var cast = data.cast[c].name;
                        var character = data.cast[c].character;

                        $("#movieCast").append('<div class="col-sm-6"><p>' + cast + '</p><p>' + character + '</p></div>');
                    }
                });
            }

            $("#addTo").click(function(e) {
                e.preventDefault();
                $(".movie-info").hide(200);
                var add = '<div class="wishlist-item row">';
                add += '<div id="wishListImg" class="col-sm-3"><img src="' + moviePoster + '"/></div>';
                add += '<div id="wishListInfo" class="col-sm-9"><div id="listTitle">' + data.results[0].title + ' (' + data.results[0].release_date + ')' + '</div><div id="listOverview">' + data.results[0].overview + '</div></div>';
                add += '</div>'

                $("#wishList").append(add);

                $("body, html").animate({
                    scrollTop: $($(this).attr('href')).offset().top
                }, 600);

            });
        });
    });

    //Search tv-show
    $("#tvBtn").click(function() {
        $(".tv-info").slideDown(200);
        $("#tvPoster, #name, #tvOverview, .tv-genre-list ul, #tvCast").empty();
        var tv = $("#searchTv").val();
        imageUrl = "https://image.tmdb.org/t/p/w300";
        $.getJSON("https://api.themoviedb.org/3/search/tv?api_key=" + api_key + "&language=en-US&query=" + tv, function(data) {

            if (data.results[0] != null) {

                poster = data.results[0].poster_path;
                var tvPoster = imageUrl + poster;
                var tvId = data.results[0].id;

                $("#tvPoster").html('<img src="' + tvPoster + '"/>');
                $("#name").html(data.results[0].name + ' (' + data.results[0].first_air_date + ')');
                $("#tvOverview").html(data.results[0].overview);

                console.log(data.results[0].id);
                //Get genre
                $.getJSON("https://api.themoviedb.org/3/tv/" + tvId + "?api_key=" + api_key + "&language=en-US", function(data) {

                    $("#tvGenre ul").attr("class", "tv-genre-list");

                    for (var g in data.genres) {
                        console.log(data.genres[g].name);

                        $(".tv-genre-list").append("<li><em>" + data.genres[g].name + "</em></li>");
                    }
                });

                //get cast from tv
                $.getJSON("https://api.themoviedb.org/3/tv/" + tvId + "-" + data.results[0].name + "/credits?api_key=" + api_key, function(data) {

                    for (var c in data.cast) {

                        var name = data.cast[c].name;
                        var character = data.cast[c].character

                        console.log(data.cast[c].character);

                        $("#tvCast").append('<div class="col-sm-6"><p>' + name + '</p><p>' + character + '</p></div>');

                    }
                });
            }
        });
    });



    // Personal lists
    $.getJSON("https://api.themoviedb.org/3/search/tv?api_key=30ea077d760fb096a1fb2db0ac20aeda&language=en-US&query=the%20flash", function(data) {
        var imageUrl = "https://image.tmdb.org/t/p/w300/lUFK7ElGCk9kVEryDJHICeNdmd1.jpg";

        $("#wishListImg").html('<img src="' + imageUrl + '"/>');
        $("#listTitle").html(data.results[0].name + ' (' + data.results[0].first_air_date + ')');
        $("#listOverview").html(data.results[0].overview);

    });

    $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=30ea077d760fb096a1fb2db0ac20aeda&language=en-US&query=assassins%20creed", function(data) {
        var imageUrl = "https://image.tmdb.org/t/p/w300/tIKFBxBZhSXpIITiiB5Ws8VGXjt.jpg";

        $("#watchedImg").html('<img src="' + imageUrl + '"/>');
        $("#watchedTitle").html(data.results[0].title + ' (' + data.results[0].release_date + ')');
        $("#watchedOverview").html(data.results[0].overview);
    });



    $(".navbar-nav li a").on("click", function(e) {
        e.preventDefault();

        $("body, html").animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);

    });
});