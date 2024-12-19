document.addEventListener('DOMContentLoaded', () => {
    const movieName = new URLSearchParams(window.location.search).get('movie'); // Get movie name from URL
    const movieNameElement = document.getElementById('movie-name');
    const reviewForm = document.getElementById('review-form');
    const reviewText = document.getElementById('review-text');
    const reviewsContainer = document.getElementById('reviews-container');
    const movieHeader = document.getElementById('movie-header');
    
    // Movie image mapping (ensure the names are capitalized correctly)
    const movieImages = {
        Inception: 'Inception.jpg',
        'The Dark Knight': 'The Dark Knight.jpg',
        Interstellar: 'Interstellar.jpg',
        // Add other movies here if needed
    };

    // Set the movie name and background image
    movieNameElement.textContent = movieName;

    // Log the movie name for debugging
    console.log(`Movie Name: ${movieName}`);

    // Capitalize the first letter of the movie name to match the object keys
    const capitalizedMovieName = movieName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    // Log the capitalized movie name for debugging
    console.log(`Capitalized Movie Name: ${capitalizedMovieName}`);

    const imageFileName = movieImages[capitalizedMovieName];
    
    if (imageFileName) {
        const imageUrl = `./movie back img/${imageFileName}`;
        movieHeader.style.backgroundImage = `url(${imageUrl})`;
        console.log(`Background Image URL: ${imageUrl}`);
    } else {
        // If the image is not found, set a default background image
        movieHeader.style.backgroundImage = 'url(./movie back img/default.jpg)';
        console.log('No image found, setting default.');
    }

    // Load saved reviews from localStorage
    loadReviews();

    // Handle review form submission
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get the review text and rating
        const review = reviewText.value.trim();
        const rating = document.querySelector('input[name="rating"]:checked')?.value;

        if (review && rating) {
            // Save the review in localStorage
            saveReview(movieName, review, rating);
            reviewText.value = ''; // Clear the textarea
            loadReviews(); // Reload the reviews
        } else {
            alert("Please provide both a review and a rating.");
        }
    });

    // Load reviews for the specific movie from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        const movieReviews = reviews[movieName] || [];

        reviewsContainer.innerHTML = ''; // Clear current reviews

        movieReviews.forEach((reviewObj) => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <p><strong>Rating: ${reviewObj.rating} stars</strong></p>
                <p>${reviewObj.review}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Save the review and rating in localStorage
    function saveReview(movie, review, rating) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        
        if (!reviews[movie]) {
            reviews[movie] = [];
        }

        reviews[movie].push({ review, rating });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
});
