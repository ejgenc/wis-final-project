# Development guide

## File structure

The tree below can help to give an overview of the file structure of this project:

```
|
|-- media => The static media files (.png, .svg,. pdf...)
|
|-- src => The actual application code (.html, .js, .css, .py...)
|   |-- app => Code related to the "color palette application" page
|       |-- app.html
|       |-- app.js
|       |-- app.py => The color palette extraction sub-module
|   |-- info => Code related to the "project info" page
|       |-- info.html
|   |-- landing => Code related to the "landing" page (call to action, star field etc.)
|       |-- landing.css
|       |-- landing.js => The JS file that also holds the p5.js animation
|   |-- server.js => The Node.js server
|
|-- Procfile => Config file for Heroku hosting
|
|-- README.md => Top-level documentation for the project
|
|-- CONTRIBUTING.md => Development guide
|
|-- landing.html => The .html file related to the "landing" page, seperate from src/landing/...
|
|-- package-lock.json
|
|-- package.json => Dependency management and packaging info for the project
|
```

- **Almost all of the code that will be written by us is located inside the `src` folder.** The file `landing.html` is an exception to this. It is the file that is first retrieved by the server when the first GET request is made. Because of this, it must stay at the top level.
- Each "view" or "page" that we have in our project has its own sub-folder within the `src` folder. This way, the different "views" of our application are self-contained.
- **The file `server.js` is responsible for handling any request that is sent to the server in which our project is hosted.** This includes serving to the client the individual pages as well as performing the color palette analysis.

## Using Git

WIP

### Git commands cheatsheet

Below is a very brief list of Git commands that can be used to achieve the workflow described above. For a more in-depth reference and learning tutorial, you can check the Git documentation or the official ProGit book.

- `git clone https://github.com/ejgenc/wis-final-project.git`: Create a local clone of the `wis-final-project` repository or your personal fork of it.
- `git checkout -b [BRANCH-NAME] [TARGET-BRANCH]`: Create a branch based on [TARGET-BRANCH] and immediately switch to it. When our Git workflow is considered only the following options are possible:
- `git push origin [BRANCH-NAME]`: Push commited changes to origin. If used right after git checkout, this command makes [BRANCH-NAME] remotely available.
- `git fetch --prune origin`: Fetch changes from the origin branch (most likely master). --prune option also updates the list of remote branches that is maintained locally. Used in conjunction with the command below.
- `git merge origin [BRANCH-NAME]`: Merge the recently fetched changes. Used in conjunction with the command above.
- `git branch -a`: To see all local and remote branches.

## Setting up and using your local development environment

WIP

### Prerequisites

WIP

### Download all the files related to the project

WIP

### Install the project dependencies

WIP