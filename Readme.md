# Canonical Cards
This is a web project assignment for showcasing use of vanilla framework to create dynamic cards.

## Live Demo
Check out the live demo of this project on GitHub Pages: [Canonical Cards Demo](https://banjobyster.github.io/canonical-cards/)

## Project Overview
### Directory Structure
- `index.html`: Contains html code of the webpage.
- `src/`: Contains the SCSS and JavaScript file.
- `dist/`: Contains the compiled CSS files.
- `node_modules/`: Node.js dependencies (ignored in version control).
- `package.json` and `package-lock.json`: Configuration and package information.
- `.gitignore`: Specifies files and directories to be ignored in Git.
- `README.md`: This documentation file.

### Build Process
The project uses SCSS for styling, and the CSS is compiled during the build process. Here are the main scripts available:
- `npm run build-css`: Compiles SCSS files into CSS.
- `npm run watch-css`: Watches for changes in SCSS files and recompiles them (development only).
- `npm run predeploy`: Runs before deploying to ensure CSS is up to date.
- `npm run deploy`: Deploys the project to GitHub Pages.

## Getting Started
To run this project locally:

1. Clone this repository to your local machine:
   ```shell
   git clone https://github.com/banjobyster/canonical-cards.git
   ```

2. Navigate to the project directory:
   ```shell
   cd canonical-cards
   ```

3. Install project dependencies:
   ```shell
   npm install
   ```

4. Open index.html or run in local development server. Watch for css changes and recompile them during development:
   ```shell
   npm run watch-css
   ```
