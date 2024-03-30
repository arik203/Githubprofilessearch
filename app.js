// Define the base URL for the GitHub API
const APIURL = "https://api.github.com/users/";

// Select the main container and search box from the HTML
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search")

// Function to fetch user data from the GitHub API
const getUser = async (username) => {
    // Fetch user data using the provided username
    const response = await fetch(APIURL + username);
    const data = await response.json()

    // Construct HTML for user profile card
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="User Avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                  
                </div>
            </div>
        </div>
    `
    // Render user profile card in the main container
    main.innerHTML = card;

    // Fetch and display user repositories
    getRepos(username)
}

// Call getUser function with a default username
getUser("arik83")

// Function to fetch user repositories from the GitHub API
const getRepos = async (username) => {
    // Select the element where repositories will be displayed
    const repos = document.querySelector("#repos")

    // Fetch repositories data using the provided username
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json();

    // Iterate through each repository and create a link for it
    data.forEach(
        (item) => {
            const elem = document.createElement("a")
            elem.classList.add("repo")
            elem.href = item.html_url
            elem.innerText = item.name
            elem.target = "_blank"
            repos.appendChild(elem)
        }
    )
}

// Function to handle form submission (when the search box is used)
const formSubmit = () => {
    // If the search box is not empty, fetch user data for the entered username
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    // Prevent default form submission behavior
    return false;
}

// Add event listener to the search box to trigger form submission on focus out
searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit()
    }
)
