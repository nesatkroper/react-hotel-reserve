const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute: ${command}`, e.message);
    return false;
  }
  return true;
};

const repoName = process.argv[2];

if (!repoName) {
  console.error("Error: Please provide a repository name.");
  process.exit(1); // Exit with error
}

const gitCheckoutCommand = `git clone --depth 1 https://github.com/nesatkroper/react-hotel-reserve.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name "${repoName}"...`);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) {
  console.error("Error: Failed to clone the repository.");
  process.exit(-1);
}

console.log(`Installing dependencies for "${repoName}"...`);
const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) {
  console.error("Error: Failed to install dependencies.");
  process.exit(-1);
}

console.log("Congratulations! The setup is complete.");
console.log("Run the following commands to get started:");
console.log(`\ncd ${repoName} && npm run dev\n`);
