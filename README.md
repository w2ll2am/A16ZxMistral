# DROPOUT Repo

This is the DROPOUT repo, the platform to monitors hazardous events in your camera feeds for first responders and live feed security. 

The following are instructions to run the website, first follow steps in `Setup`, then follow steps in `Running the Website`.

## Project

There are three folders for each of the major components. 

* `./ui` - Website frontend, everything that you view in your browser
* `./api`- Website backend, provide AI functionality to the website

## Running the Website

First follow the guide in `Setups` to set up node, conda, and python. Use the following instructions to locally run the website.

1. Install requirements `npm install`
2. Serve the website `npm run serve`
3. To access the website enter into your browser `http://localhost:5173`
4. Test the backend for Windows `wget http://localhost:8080/` or Mac/Linux `curl -v http://localhost:8080/`

To re-install dependencies

1. Delete conda environment with `conda env remove --name=aixlaw`
2. Delete both `./node_modules` and `./aixlaw/node_modules` folders 
3. Reinstall dependencies with `npm run install`

## Setup 

Follow these chapters step by step to set up all necessary supporting software to develop and run the website.

1. Clone the Repo
2. Install Frontend Requirements (nvm, node)
3. Install Backend Requirements (python, langserve)
4. Serve

### 1. Clone the repo

1. Ensure git is installed with `git -v`, if not follow [this online guide](https://github.com/git-guides/install-git)
2. Clone the repo with `git clone https://github.com/w2ll2am/AIxLaw`
3. Enter the repo with `cd AIxLAW`

### 2. Install Frontend Requirements (nvm, node)

If you don't have node installed already we are using `nvm` to manage our versions of node. First ensure you are in the parent directory when running these steps. 

Windows Guide

1. Download nvm by downloading the `nvm-setup.exe` file [from here](https://github.com/coreybutler/nvm-windows/releases)
2. Install Node with `nvm install 20.15.0`
3. Activate Node with `nvm use 20.15.0`
4. Verify the Node version with `node -v`
5. Update `npm` with `npm install -g npm`

Mac / Linux Guide

1. Download nvm with either

    ```run curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash```

    ```wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash```

2. Install Node with `nvm install 20.15.0`
3. Activate Node with `nvm use 20.15.0`
4. Verify the Node version with `node -v`
5. Update `npm` with `npm install -g npm`

### 4. Install AI Backend Requirements (python, Google Cloud CLI)

1. Install conda by following [this guide](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)
2. 
### Summary of Software Versions and Initilisations

* git 
* Node v20.15.0
* npm 10.8.1
* React initialised with https://vitejs.dev/guide/ using 
    - React + TS
* LangServe initilaised with [this template](rag-google-cloud-vertexai-search)
    - Python 3.12

## Copyright

 Copyright (C) 2024 William Booth-Clibborn w.j.boothclibborn@gmail.com
 
 This file is part of the A16ZXMISTRAL project repo. It is owned by and exclusivly authored by.

 * William Booth-Clibborn
 * Keerthanan Ravichandran
 * William Yu
 
 The AIxLAW project repo can not be copied, distributed, run, or used in any fashion without the express permission of all authors listed above.
