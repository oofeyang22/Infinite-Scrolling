// Selecting HTML elements and initializing variables
const postsContainer= document.getElementById("posts-container");
const loading= document.querySelector(".loader");

let limit= 30; // Set the initial limit for the number of posts to fetch
let page= 1; // Initializes the current page variable

// Async function to fetch posts from the API
async function getPosts(){
    // Construct the URL for fetching posts with a specified limit and page
    const res= await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    // Converts the fetched data to JSON format
    const data= await res.json();

    return data; // Returns the fetched data
}


// Async function to display fetched posts
async function showPosts(){
    // Fetches posts using the getPosts function and store them in posts variable
    const posts = await getPosts();

    // Iterates through each post and create HTML elements to display them
    posts.forEach(post => {
        const postEl = document.createElement('div'); // Create a container for each post
        postEl.classList.add('post'); // Adds the “post” class for styling
        postEl.innerHTML= `
        <div class="number">${post.id}</div> 
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2> 
            <p class="post-body">${post.body}</p> 
        </div>
        `;

        postsContainer.appendChild(postEl); // Appends each post to the post container
    })
};


// Function to show loading animation
function showLoading() {
    loading.classList.add("show"); // Displays the loader animation by adding the “show” class

    setTimeout(() => {
        loading.classList.remove("show"); // Hides the loader animation after a delay
        setTimeout(() => {
            page++; // Increments the page variable to load the next page of posts

            showPosts(); // Calls the showPosts() function to load and display new posts
        }, 300); // Adds a delay before loading more posts
    }, 1000); // Displays loader animation for 1 second before removing it
}


// Initial call to load and display the first set of posts
showPosts();


// Event listener for the “scroll” event on the window
window.addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // Checks if user has scrolled to bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 5){
        showLoading()
    }
});
