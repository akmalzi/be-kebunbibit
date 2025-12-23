Backend Kebun Bibit Wonorejo
============================

## Clone Repository
```bash
# Using HTTPS
git clone https://github.com/Agriculture-six-Asix/Backend.git
```
```bash
# Using SSH
git clone git@github.com:Agriculture-six-Asix/Backend.git
```

## Initialize the project
```bash
cd Backend/
```
#### then install the node modules
```bash
# Using npm
npm install
```
```bash
# Using yarn
yarn install
```
```bash
# Using pnpm
pnpm install
```

## Create the environment for development and production
#### Using Bash (or any other shell)
```bash
# for Development Environment
cp .env.example .env.dev
```
```bash
# for Production Environment
cp .env.example .env
```
#### Using Powershell
```pwsh
# for Development Environment 
Copy-Item .env.example .env.dev
```
```pwsh
# for Production Environment
Copy-Item .env.example .env
```
#### Then fill the necessesary data for the environment
## Start the Project
#### Using npm
```bash
#for Development
npm run dev
```
```bash
#for Production
npm run start
```
#### Using yarn
```bash
#for Development
yarn dev
```
```bash
#for Production
yarn start
```
#### Using pnpm
```bash
#for Development
pnpm run dev
```
```bash
#for Production
pnpm run start
```

## You can read the API docs [here (STILL WIP)](./docs/)
