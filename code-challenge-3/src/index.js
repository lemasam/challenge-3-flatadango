// Your code here

//This event ensures that the JavaScript code inside the event listener will run after the HTML content is fully loaded.
document.addEventListener("DOMContentLoaded", function () {


  const baseURL = "http://localhost:3000/films/";
//assigning 
  fetchMovieDetails(1);
  fetchAllMoviesMenu();

  document.getElementById("buy ticket")

  document.addEventListener("click", function () {
    const currentMovieId = document.getElementById("movieDetails").dataset.id;
    buyTicket(currentMovieId);
    
  });
  //function for creating images for the movies
     function fetchMovieDetails(id) {
        fetch(`${baseURL}${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          //fetch function ,the then() method is get to the fetch call to handle the promise returned .
          .then((movie) => {
            const movieDetailsDiv = document.getElementById("movieDetails");
            movieDetailsDiv.dataset.id = movie.id;
            movieDetailsDiv.innerHTML = `
                <img src="${movie.poster}" alt="${
              movie.title
            } poster" class="images">
                <h3>${movie.title}</h3>
                <p>Runtime: ${movie.runtime} minutes</p>
                <p>Showtime: ${movie.showtime}</p>
                <p>Remaining Tickets: ${movie.capacity - movie.tickets_sold}</p>
                <p>Description: ${movie.description}</p>
            `;
            updateBuyTicketButton(movie.capacity, movie.tickets_sold);
          })
          //The catch() method is used to handle any errors that may occur during the fetch operation.
          .catch((error) =>
            console.error("Error fetching movie details:", error)
          );
    }
// function for creating movie menu
    function fetchAllMoviesMenu() {
        fetch(`${baseURL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movies => {
            const filmsList = document.getElementById("movies");
            filmsList.innerHTML = movies.map(movie => `
                <li class="film item ${movie.capacity - movie.tickets_sold === 0 ? 'sold-out' : ''}"
                    data-id="${movie.id}">
                    ${movie.title}
                </li>
            `).join('');
            attachMovieClickEvents();
        })
        .catch(error => console.error('Error fetching movies menu:', error));
    }

    function attachMovieClickEvents() {
        const movieItems = document.querySelectorAll(".film.item");
        movieItems.forEach(item => {
            item.addEventListener("click", function() {
                const movieId = this.dataset.id;
                fetchMovieDetails(movieId);
            });
        });
    }
// function for creating  buy ticket button
    function buyTicket(movieId) {
        fetch(`${baseURL}${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movie => {
            if (movie.tickets_sold < movie.capacity) {
                const updatedTicketsSold = movie.tickets_sold + 1;
                return fetch(`${baseURL}${movieId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tickets_sold: updatedTicketsSold
                    })
                });
            } else {
                throw new Error('Tickets are sold out!');
            }
        })
        .then(() => {
            fetchMovieDetails(movieId);
            fetchAllMoviesMenu();
        })
        .catch(error => console.error('Error buying ticket:', error));
    }

    function updateBuyTicketButton(capacity, ticketsSold) {
        const buyTicketButton = document.getElementById("buyTicket");
        if (capacity - ticketsSold === 0) {
            buyTicketButton.textContent = "Sold Out";
            buyTicketButton.disabled = true;
        } else {
            buyTicketButton.textContent = "Buy Ticket";
            buyTicketButton.disabled = false;
        }
    }
  //function for creating delete button
     const deleteButton= document.createElement ("button")
     deleteButton.textContent="Delete"
     deleteButton.addEventListener ("click",function (){
      const movieId = movie.id
      fetch (`${baseURL}/${movieId}`,{
        method:"DELETE"
    
     })
     .then(response=>{
      if(!response.ok){
        throw new Error("Failed to delete the movie.")
      }
     ul.remove( );
     })
      .catch(error => console.error('Error deleting movie:', error));

     })
  
    });
    
  

