async function getRepositories() {
	const username = document.getElementById('username').value;

	if (!username) {
	  alert('Please enter a valid GitHub username.');
	  return;
	}

	const apiUrl = `https://api.github.com/users/${username}/repos?per_page=10`;

	try {
	  const response = await fetch(apiUrl);
	  const repos = await response.json();
	  displayRepos(repos);
	} catch (error) {
	  console.error('Error fetching GitHub repositories:', error);
	}
  }

  async function displayRepos(repos) {
	const reposContainer = document.getElementById('repos-container');
	reposContainer.innerHTML = ''; // Clear previous results

	if (repos.length === 0) {
	  reposContainer.innerHTML = '<p>No repositories found.</p>';
	  return;
	}

	for (const repo of repos) {
	  const repoCard = document.createElement('div');
	  repoCard.classList.add('repo-card');

	  const repoName = document.createElement('div');
	  repoName.classList.add('repo-name');
	  repoName.textContent = repo.name;

	  const repoDescription = document.createElement('div');
	  repoDescription.classList.add('repo-description');
	  repoDescription.textContent = repo.description || 'No description available.';

	  const repoTech = document.createElement('div');
	  repoTech.classList.add('repo-tech');
	  repoTech.textContent = await getRepoTech(repo.owner.login, repo.name);

	  const repoLink = document.createElement('a');
	  repoLink.classList.add('repo-link');
	  repoLink.href = repo.html_url;
	  repoLink.target = '_blank';
	  repoLink.textContent = 'View on GitHub';

	  repoCard.appendChild(repoName);
	  repoCard.appendChild(repoDescription);
	  repoCard.appendChild(repoTech);
	  repoCard.appendChild(repoLink);

	  reposContainer.appendChild(repoCard);
	}
  }

  async function getRepoTech(owner, repoName) {
	const techUrl = `https://api.github.com/repos/${owner}/${repoName}/topics`;
	
	try {
	  const response = await fetch(techUrl);
	  const data = await response.json();
	  return data.names.join(', ');
	} catch (error) {
	  console.error(`Error fetching technologies for ${owner}/${repoName}:`, error);
	  return 'Technologies not available';
	}
  }