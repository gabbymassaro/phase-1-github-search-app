// User Repos Endpoint: You can find all the public repositories 
// for a user using this endpoint. 
// Example: if we wanted to find all the repositories for a user with GitHub 
// username octocat, we would make a GET request to 
// https://api.github.com/users/octocat/repos. To view the response, you can '
// copy and paste that URL into your browser. 

// Deliverables:
// 4. Using the response from the Users Repos Endpoint, display all the repositories 
// for that user on the page.


document.addEventListener("DOMContentLoaded", () => {
  
  let form = document.getElementById("github-form") 
  let gitHubContainer = document.getElementById('github-container')
  let userList = document.getElementById('user-list') 
  let repoList = document.getElementById('repos-list')

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
    })
  })

  const createUsers = (user) => {
    const li = document.createElement('li')
    li.textContent = user.login
    userList.appendChild(li)

    const img = document.createElement('img')
    img.src = user.avatar_url
    userList.appendChild(img)

    img.addEventListener("click", () => {      
      fetch(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const ol = document.createElement('ol')
        ol.textContent = data.name
        repoList.appendChild(ol)
      })
    })

    const p = document.createElement('p')
    p.textContent = user.html_url
    userList.appendChild(p)
  }
})


