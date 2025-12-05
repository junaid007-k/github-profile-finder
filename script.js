function getProfile() {
    const username = document.getElementById("username").value.trim();
    const profileDiv = document.getElementById("profile");
    const reposDiv = document.getElementById("repos");
    const errorMsg = document.getElementById("error");

    profileDiv.innerHTML = "";
    reposDiv.innerHTML = "";
    errorMsg.innerHTML = "";

    if (username === "") {
        errorMsg.textContent = "Please enter a username.";
        return;
    }

    axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
            const data = response.data;

            profileDiv.innerHTML = `
                <div class="profile-card">
                    <img src="${data.avatar_url}" alt="avatar">
                    <h2>${data.name || data.login}</h2>
                    <p>${data.bio || "No bio available"}</p>
                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><strong>Following:</strong> ${data.following}</p>
                </div>
            `;
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                errorMsg.textContent = "User not found.";
            } else {
                errorMsg.textContent = "Something went wrong.";
            }
        });

    axios.get(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            reposDiv.innerHTML = `<h3>Repositories:</h3>`;
            const repos = response.data;

            repos.forEach(repo => {
                reposDiv.innerHTML += `
                    <div class="repo-item">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                `;
            });
        })
        .catch(() => {
            reposDiv.innerHTML = "";
        });
}
