// Get references to the search bar and the movie gallery
const searchBar = document.getElementById('search-bar');
const movieGallery = document.getElementById('movie-gallery');

// Add an event listener to the search bar for user input
searchBar.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase(); // Get the search query in lowercase
    const movieCards = movieGallery.getElementsByClassName('movie-card'); // Get all movie cards

    // Loop through all movie cards to check for matches
    for (let card of movieCards) {
        const movieTitle = card.querySelector('h3').innerText.toLowerCase(); // Get the movie title
        if (movieTitle.includes(query)) {
            card.style.display = ''; // Show matching movie card
        } else {
            card.style.display = 'none'; // Hide non-matching movie card
        }
    }
});
