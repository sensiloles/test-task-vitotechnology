# Application for uploading images and searching users on github

---

### Installation

Clone repository.

```sh
$ git clone https://github.com/sensiloles/test-task-vitotechnology.git
```

Add your own [GitHub personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) in a .env.development.local file in project folder

- scopes/permissions you need to check: admin:org, repo, user, notifications

```sh
$ cd test-task-vitotechnology
$ touch .env.development.local
edit .env.development.local
add to .env.development.local a new line with REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=XXXXXXXXXXXXXXX
```

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm start
```

### Todos

- Fill the main page
- Implement a token request in the interface or enable github authentication
- Add the ability to save data in a database or in local storage
- Improve styles of footer
- Supplement the displayed GitHub user data
- Supplement the displayed repository data
