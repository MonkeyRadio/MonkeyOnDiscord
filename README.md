# MonkeyOnDiscord

[Get MonkeyRadio](https://discord.com/oauth2/authorize?client_id=896742657047547925&permissions=35461400627264&scope=bot) in your discord server

---

Monkey Radio Bot Module for Discord with basic API integration

## Features

* Voice State support (Listen MonkeyRadio in your server)
* Get the currently playing metadata (track and show)
* Get the current listeners amount
* Enable restriction (on the play and stop command) -> Create "MonkeyMaster" role

## Testing

* Clone this repo
* Install all modules
    ```
    npm install
    ```
* Create .env file (from .env.example file)
    Fill it with your token and client id
* Build app
    ```
    npm run build
    ```
* Run app
    ```
    npm start
    ```

## Production


Docker image : [nicojqn/monkey-on-discord](https://hub.docker.com/r/nicojqn/monkey-on-discord)

Run it with some env value (described in .env.example)


---


Feel free to Fork and submit Pull Request :)
