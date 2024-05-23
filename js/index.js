document.addEventListener("DOMContentLoaded", () => {
  
  let form = document.getElementById("github-form") 
  let userList = document.getElementById('user-list') 
  let repoList = document.getElementById('repos-list')

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    userList.innerHTML = ""
    repoList.innerHTML = ""
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
    const h2 = document.createElement('h2')
    h2.textContent = user.login
    userList.appendChild(h2)

    const h4 = document.createElement('h4')
    h4.textContent = user.html_url
    userList.appendChild(h4)

    const img = document.createElement('img')
    img.src = user.avatar_url
    userList.appendChild(img)

    img.addEventListener("click", () => {      
      repoList.innerHTML = ""
      fetch(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        data.forEach (item => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = item.html_url;
          link.target = "_blank";
          link.textContent = item.html_url;
          li.appendChild(link);
          repoList.appendChild(li);
        })
      })
    })
  }
})


