// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
// Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.

form = document
  .getElementById("github-form")
  .addEventListener("submit", (e) => {
    const userList = document.querySelector("#user-list");
    const reposList = document.getElementById("repos-list");
    reposList.innerHTML = "";
    userList.innerHTML = "";
    e.preventDefault();
    //e.target[0].value;
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
      .then((response) => response.json())
      .then((response) => {
        response.items.map((item) => {
          const li = document.createElement("li");
          const h2 = document.createElement("h2");
          h2.textContent = item.login;

          h2.addEventListener("click", (e) => showUserRepos(item.login, e));
          const img = document.createElement("img");
          img.src = item.avatar_url;

          li.append(h2, img);
          userList.append(li);
        });
        e.target[0].value = "";
      });
  });

function showUserRepos(username, e) {
  const reposList = document.getElementById("repos-list");
  reposList.innerHTML = "";
  e.preventDefault();
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((response) => {
      response.map((repo) => {
        const li = document.createElement("li");
        const h1 = document.createElement("h1");
        h1.textContent = repo.name;
        li.append(h1);
        reposList.append(li);
      });
    });
}
