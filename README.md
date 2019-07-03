# RacePace 
#### Software Design and Development Major Project

<img src="https://forthebadge.com/images/badges/made-with-python.svg" alt="python 3.6"/> <img src="https://forthebadge.com/images/badges/powered-by-electricity.svg" alt="ionic framework"/>



<a href="https://discord.gg/CpwayNM"><img src="https://discordapp.com/api/guilds/426251391988662276/widget.png?style=banner2" alt="" /></a>

## Welcome
RacePace is an application that generates the best running/cycling route for the user based on a variety of factors. A route can be specified by run type, elevation, greenery and other factors such as user ratings. Coaches can use this app to track and analyse multiple participants in realtime to help runners perform at a higher level.

## Project Structure 

#### Backend:
* Our internal API written in python uses `Sanic` as an asynchronous web server.

#### Client:
* A cross platform mobile application
* Uses react native

## Installing the server

You must have `python 3.7+` and `pipenv`. Clone the repository and run the following command.

```console
pipenv install --dev
```

To run the server

```console
pipenv run python3 server/app.py
```

Make sure to copy the `.env.example` file and remove the `.example` suffix so you are left with `.env`, update the key value pairs accordingly. 


