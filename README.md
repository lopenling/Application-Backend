<h1 align="center">
  <br>
  <a href="https://github.com/lopenling"><img src="https://raw.githubusercontent.com/lopenling/Home/main/assets/Lopenling-Logo-Icon.png" alt="Lopen Ling" width="100"></a>
  <br>
</h1>

<h3 align="center">Application Backend</h3>

<p align="center">

  <a href="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png">
    <img width=150px src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Cc-by-nc-sa_icon.svg/1280px-Cc-by-nc-sa_icon.svg.png" alt="License">
  </a>
</p>

<p align="center">
  <a href="#floppy_disk-description">Description</a> •
  <a href="#closed_book-docs">Docs</a> •
  <a href="#grin-owner">Owner</a> •
  <a href="#speech_balloon-get-help">Get Help</a>
</p>
<hr>

## :floppy_disk: Description

Backend of Lopen Ling. Providing API and database for management of projects, teams, glossaries etc

## :grin: Owner

[@mikkokotila](https://github.com/mikkokotila)

[@mcsneaky](https://github.com/mcsneaky)

## :closed_book: Docs

### To start up dev server:
- `docker compose up` - starts up local database, DB managent UI and mail trap
- `npm install`
- `npm run dev`
- `cp .env.example .env`

Might want to check that variables in `.env` file fit to your need. 
They are configured to work out of box with default config

### Setup prod deployment

Render.com handles deployments automatically, but in case need to set up new deployment for backend, then follow those steps:

- Go to [render.com](https://dashboard.render.com/project/prj-cos1lf7sc6pc73dvehg0)
- Click `New` and then select `Web Service`
- Select `Build and deploy from a Git repository`
- Select Application-Backend repo
- Select branch as `main`
- Pick any instance type. 0.5CPU and 512 RAM is good enough to get started
- Set `Dockerfile Path` to `./Dockerfile`
- Set `Pre-Deploy Command` to `node ace migration:run --force`
- Set same environment variables that are liste in `.env.example` file in Backend. Some might need to be changed, like `DB_USER` and `DB_PASSWORD`
- Set custom domains as you wish. Note that API domain must also be set in frontend as `VITE_API_URL` env variable

## :speech_balloon: Get Help

If you need any help or have suggestions for improvements, you can do that [here](issues/new).
