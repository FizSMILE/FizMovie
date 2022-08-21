function searchMovie() {
  $("#movie-list").html("");

  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dca61bcc",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `<div class="card mb-5 ms-5" style="max-width: 540px">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="` +
              data.Poster +
              `" class="img-fluid rounded-start" alt="..." />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">` +
              data.Title +
              `</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This a movie from FizMovie.</p>
                      <p class="card-text"><small class="text-muted">Upload From Year ` +
              data.Year +
              `</small></p>
                  <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                `
          );
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `<div class="col p-5">
          <h1 class="text-center text-danger">Nothing Found</h1>
          </div>`
        );
      }
    },
  });
}



$("#search-button").on("click", function () {
  searchMovie();
});
 

$("#search-input").on("keyup", function (e) {
  if (e.which === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "https://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dca61bcc",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
            <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
              <img src="` +
            movie.Poster +
            `" class="img-fluid">
              </div>
              <div class="col-md-6 ms-auto">
              <ul class="list-group">
    <li class="list-group-item active" aria-current="true">Title : ` +
            movie.Title +
            `</li>
    <li class="list-group-item">Released : ` +
            movie.Released +
            `</li>
    <li class="list-group-item">Genre : ` +
            movie.Genre +
            `</li>
              <li class="list-group-item">Director : ` +
            movie.Director +
            `</li>
              <li class="list-group-item">Actors : ` +
            movie.Actors +
            `</li>
  </ul>
              </div>
            </div>
        
                      </div>
                      </div>
                      `
        );
      }
    },
  });
});
