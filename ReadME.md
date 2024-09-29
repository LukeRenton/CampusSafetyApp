# Campus Safety App
This project was completed by:

- Mitchell Neilson (2585497)

- Anand Patel (2561034)

- Luke Renton (2540440) 

- Martin Shilenge (2557606)

- Thabiso Mahlaola (2426592)

- Anist Mampuru (449541)

For proof of Scrum Methodology as well as Additional Artifacts please check the following link:

[Notion External Documentation](https://www.notion.so/Navigation-Portal-0e5c2a17d7314a41a01b237fd1160dc5)

Or directly

https://www.notion.so/Navigation-Portal-0e5c2a17d7314a41a01b237fd1160dc5

For documentation on downloading and running the application locally, please read further below.

## Table of Contents
1. [For users](#for-users)
2. [For developers](#for-developers)

    2.1 [File and Code Structure](#file-and-code-structure)

    2.2 [GitHub Branch Naming](#github-branch-naming)

    2.3 [Project Setup](#project-setup)

    2.4 [Project Local Testing](#testing-the-project-locally)

    2.5 [Deploying to the Server](#deploying-to-the-server)

    2.6 [Versions](#versions)



# For Users

# For developers
## File and Code Structure

### General

#### Comments

1. Comments should be clear.
2. Each file should contain a multi-line comment at the beginning of the file indicating the type of file (component, service, model, etc.).
3. Follow the following comment outline:

| // -- ToDo: ____ | Outline something that still needs to be completed in the file code |
| --- | --- |
| /* Function …. */ | Multi-line comment above function definitions to outline what the function does. Should like similar to multi-line comment @ beginning of file |
| // -- xyz | 1-liner comment to outline a patch of code below it |

### Frontend

#### File Structure

- The code should be structured in a nested folder-file system. Files will be in camel-case naming convention.


The application will have the following folders:

1. Components
    - Contains React component .js files

2. Styles
    - Contains .css files for each component

3. Services
    - Contains .js files that specifically access APIs or produce functional code that does not interfere with a component directly

4. Models
    - Contains .js files that are data models for required objects

5. Pages
    - React component .js files that are specifically pages

## GitHub Branch Naming

- Kebab case when naming

  **Format:** 
  
  ``` 
  <main-idea>/<description-of-idea> 
  ```

  examples:

  ```
  bug/fixing-login-failed

  feature/adding-admin-capabilities

  page/tutorial
  ```

## Project Setup
> You can also follow along to the following video for a demonstration of the project setup: [![Watch the video](Project_Setup_Demo.mp4)](Project_Setup_Demo.mp4)

We have added a bash file to automate this process, but will keep the documentation of doing it manually here for future reference. For easier project setup you can use the bash script as follows:

### 1. Clone the repository from [GitHub](https://github.com/LukeRenton/CampusSafetyApp)

```bash
git clone https://github.com/LukeRenton/CampusSafetyApp
```

### 2. Navigate to `CampusSafetyApp/`

```bash
cd CampusSafetyApp/
```
### 1. Give the setup script executable priveledges (once off)
```bash
chmod +x setup.sh
```

### 4. Run the script
```bash
./setup.sh
```
> There you have it! Now if you need to pull any changes you can just run the `setup.sh` script (in the root directory `.../CampusSafetyApp/`) and it will do everything for you!

Alternatively you can do it manually:
### 1. Clone the repository from [GitHub](https://github.com/LukeRenton/CampusSafetyApp)

```bash
git clone https://github.com/LukeRenton/CampusSafetyApp
```

### 2. Navigate to `CampusSafetyApp/`

```bash
cd https://github.com/LukeRenton/CampusSafetyApp/
```

### 3. Set up dependencies for local testing, for client

```bash
cd client/
npm install
```

### 4. For server (assuming you are in the root directory)

```bash
cd server/
npm install
```

### 5. Your project is all set up!

## Testing the project locally
> NOTE: We assume you are in the root directory `.../CampusSafetyApp/`

> NOTE: You also have to run this each time you make a change and want to see the change reflect locally

We have added a bash file to automate this process, but will keep the documentation of doing it manually here for future reference. For easier project setup you can use the bash script as follows:

### 1. Give the test script executable priveledges (once off)
```bash
chmod +x test.sh
```

### 2. Run the test script
```bash
./test.sh
```

### 3. Check out the project:
Open your browser on `http://localhost:5000/` and there it is!


Alternatively you can do it manually:
### 1. Build your React files:

```bash
cd client/
npm run build
# (ensure you return to the root directory for step 2)
cd ..
```

### 2. Run the application
```bash
npm start
```
### 3. Check out the project:
Open your browser on `http://localhost:5000/` and there it is!

## Deploying to the Server
> NOTE: We assume you are in the root directory `.../CampusSafetyApp/`

We have added a bash file to automate this process, but will keep the documentation of doing it manually here for future reference. For easier project setup you can use the bash script as follows:

### 1. Give the deployment script executable priveledges (once off)
```bash
chmod +x deploy.sh
```

### 2. Run the test script
```bash
./deploy.sh
```
> NOTE: During this process you will be prompted to enter your commit message, once you have written your commit message, press enter and all your work is done

### 3. Merge changes (if not on master branch)
1. Go to [GitHub Repository](https://github.com/LukeRenton/CampusSafetyApp)
2. Navigate to your selected branch
3. Select "Make a pull request"
4. Ask someone to review your pull request and confirm it
5. Merge the pull request
6. Check out your changes after it has deployed!

The website is at [campussafetyapp.azurewebsites.net](https://campussafetyapp.azurewebsites.net/)

Alternatively you can do it manually:

```bash
cd client/
npm run build
# (ensure you return to the root directory for step 2)
cd ..
```

### 2. Push your changes

```bash
git add . && git commit -m "your commit message" && git push
```

### 3. Merge changes (if not on master branch)

1. Go to [GitHub Repository](https://github.com/LukeRenton/CampusSafetyApp)
2. Navigate to your selected branch
3. Select "Make a pull request"
4. Ask someone to review your pull request and confirm it
5. Merge the pull request
6. Check out your changes after it has deployed!

The website is at [campussafetyapp.azurewebsites.net](https://campussafetyapp.azurewebsites.net/)

## Versions

- Node: 18.17.0
- Bootstrap: v5
- All other versions are stored in the `package-lock.json` and `package.json` files, but the `setup.sh` script handles the installment of these packages.
