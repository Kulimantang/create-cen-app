import * as p from "@clack/prompts";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT, FULL_STACK_CEN_TEMPLATE_REPO } from "~/consts.js";
import { installDependencies } from "~/helpers/installDependencies.js";

interface FullStackInstallerOptions {
  projectName: string;
  backendDir: string;
  frontendDir: string;
  projectDir: string;
  noInstall?: boolean;
}

export const fullStackInstaller = async ({
  projectName,
  backendDir,
  frontendDir,
  projectDir,
  noInstall,
}: FullStackInstallerOptions) => {
  // pull the repo from template repo into project folder
  const s = p.spinner();
  s.start(`Cloning full-stack-cen-template repository...`);
  await execa("git", ["clone", FULL_STACK_CEN_TEMPLATE_REPO, projectName], {
    cwd: PKG_ROOT,
    stdio: "inherit",
  });
  s.stop();
  p.log.success(`Successfully cloned ${chalk.green.bold("full-stack-cen-template")} repository\n`);

  // delete .git folder
  p.log.info(`Cleaning up...`);
  fs.removeSync(path.join(projectDir, ".git"));
  p.log.success(`Successfully cleaned up\n`);

  // create .env file
  const envDest = path.join(projectDir, ".env");
  fs.copySync(path.join(projectDir, ".env.example"), envDest);

  if (noInstall) {
    p.log.info("Skipping dependencies installation");
    return;
  }

  p.log.info("Preparing Python environment...");

  // Check for available Python versions in descending order
  const pythonVersions = ["3.12", "3.11", "3.10"];
  let selectedVersion = null;

  for (const version of pythonVersions) {
    const versionInstalled = await execa(`python${version}`, ["--version"])
      .then(() => true)
      .catch(() => false);

    if (versionInstalled) {
      selectedVersion = version;
      break;
    }
  }

  if (!selectedVersion) {
    p.log.error(
      "Python 3.10 or higher is not installed. Please install Python 3.10+ and follow the Backend README.",
    );
    return;
  }

  s.start(`Creating virtual environment with Python ${selectedVersion}...`);

  try {
    await execa("uv", ["venv", "--python", `python${selectedVersion}`], {
      cwd: backendDir,
      stdio: "inherit",
    });

    await execa("uv", ["sync"], {
      cwd: backendDir,
      stdio: "inherit",
    });

    s.stop();
    p.log.success(`Successfully installed ${chalk.green.bold("python")} requirements\n`);
  } catch (error) {
    s.stop();
    p.log.error(
      "Failed to setup Python environment. Please check the Backend README for manual setup.",
    );
  }

  await installDependencies({ frontendDir });
};