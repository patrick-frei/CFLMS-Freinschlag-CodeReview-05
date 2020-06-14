$(document).ready(function() {
	let readJSON = function (file) {
		let json = {}
		$.ajax({
		    'async': false,
		    'global': false,
		    'url': file,
		    'dataType': "json",
		    'success': function (data) {
		        json = data;
		    }
		});
		return json;
	}
	let movies = readJSON("json/movies.json")
	function loadMovies() {
		movies.sort(function(a, b) {
			switch ($("#orderBy").val()) {
				case "name":
					if ($("#down-button").data("activated")) {
						if ( a.title > b.title ){
							return -1;
						}
						if ( a.title < b.title ){
							return 1;
						}
						return 0;
					} else if ($("#up-button").data("activated")) {
						if ( a.title < b.title ){
							return -1;
						}
						if ( a.title > b.title ){
							return 1;
						}
						return 0;
					}
				case "likes":
					if ($("#down-button").data("activated")) {
						if ( a.likes > b.likes ){
							return -1;
						}
						if ( a.likes < b.likes ){
							return 1;
						}
						return 0;
					} else if ($("#up-button").data("activated")) {
						if ( a.likes < b.likes ){
							return -1;
						}
						if ( a.likes > b.likes ){
							return 1;
						}
						return 0;
					}
				case "year":
					if ($("#down-button").data("activated")) {
						if ( a.year > b.year ){
							return -1;
						}
						if ( a.year < b.year ){
							return 1;
						}
						return 0;
					} else if ($("#up-button").data("activated")) {
						if ( a.year < b.year ){
							return -1;
						}
						if ( a.year > b.year ){
							return 1;
						}
						return 0;
					}
			}
		});
		$("#movies").empty();
		$(movies).each(function(i) {
			$("#movies").append($("#movie-template").html());
			$(".movie-cover").last().attr("src", movies[i].img);
			$(".movie-header").last().html(`${movies[i].title} (${movies[i].year})`);
			$(".movie-description").last().html(movies[i].description);
			$(".movie-link").last().attr("href", "#");
			$(".like-counter").last().html(movies[i].likes);
			$(".like-button").last().data({
				"title": movies[i].title,
				"liked": false
			})
		});	
		$(".like-button").on("click", function() {
			if ($(this).data("liked")) {
				$(this).siblings(".like-counter").html(--movies[movies.findIndex(movie => movie.title == $(this).data("title"))].likes);
				$(this).data("liked", false);
				$(this).html("Like");
			} else {
				$(this).siblings(".like-counter").html(++movies[movies.findIndex(movie => movie.title == $(this).data("title"))].likes);
				$(this).data("liked", true);
				$(this).html("Unlike");
			}
		});
	}
	$("#down-button").data("activated", false);
	$("#up-button").data("activated", true);
	$("#down-button, #up-button").on("click", function() {
		$("#down-button").data("activated", !$("#down-button").data("activated"));
		$("#down-button").html($("#down-button").data("activated") ? "&#9660" : "&#9661")
		$("#up-button").data("activated", !$("#down-button").data("activated"));
		$("#up-button").html($("#up-button").data("activated") ? "&#9650" : "&#9651")
		loadMovies();
	});
	$("#orderBy").on("change", function() {
		loadMovies();
	});
	loadMovies();
})