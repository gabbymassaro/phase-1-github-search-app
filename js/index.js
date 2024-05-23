// required to add custom header to your requests:
// Accept: application/vnd.github.v3+json

// User Search Endpoint: You can search for users matching a certain name
// Example: if we wanted to find all users named octocat, we would make 
// a GET request to https://api.github.com/search/users?q=octocat. 
// To view the response, you can copy and paste that URL into your browser. ✔️

// User Repos Endpoint: You can find all the public repositories 
// for a user using this endpoint. 
// Example: if we wanted to find all the repositories for a user with GitHub 
// username octocat, we would make a GET request to 
// https://api.github.com/users/octocat/repos. To view the response, you can '
// copy and paste that URL into your browser. 

// Deliverables:
// 1. The index.html file has a form with a search input. When the form is submitted, 
// it should take the value of the input and search GitHub for user matches using the 
// User Search Endpoint. ✔️
//
// 2. Using the results of the search, display information about the users to the page.
// (You might include showing their username, avatar and a link to their profile.) ✔️
//
// 3. Clicking on one of these users should send a request to the User Repos Endpoint
// and return data about all the repositories for that user.
//
// 4. Using the response from the Users Repos Endpoint, display all the repositories 
// for that user on the page.
document.addEventListener("DOMContentLoaded", () => {
  
  let form = document.getElementById("github-form") 
  let gitHubContainer = document.getElementById('github-container')
  let userList = document.getElementById('user-list') 

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    userList.innerHTML = ""
    queryValue = document.getElementById("search").value

    fetch("https://api.github.com/search/users?q=" + queryValue, {
      headers: {
        "Accept": "application/vnd.github.v3+json"
      }
    })
    .then(response => response.json())
    .then(data => {
      data.items.forEach(createUsers);
      console.log(data.items);
    })
  })

  const createUsers = (user) => {
    const li = document.createElement('li')
    li.textContent = user.login
    userList.appendChild(li)

    const img = document.createElement('img')
    img.src = user.avatar_url
    userList.appendChild(img)

    const p = document.createElement('p')
    p.textContent = user.html_url
    userList.appendChild(p)
  }
  
})


