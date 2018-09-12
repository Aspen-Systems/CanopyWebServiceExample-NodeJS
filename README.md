# Canopy Web Services Example: NodeJS

This project is a simple example of how to communicate with Canopy Web Services from a NodeJS project! This project was generated with the [expressjs generator](https://expressjs.com/en/starter/generator.html) with the [Handlebars](https://handlebarsjs.com/) view engine.

## Requirements

Install [git](https://git-scm.com/).

Make sure you have `nodejs >= v10.x` and `npm >= v6.x` installed on your machine. For convenience, we recommend you use NVM to install the required versions of `node` and `npm`. For Windows users you can get NVM [here](https://github.com/coreybutler/nvm-windows). For other operating systems you download NVM from [here](https://github.com/creationix/nvm).

### Installation with NVM

When you use NVM to install `node` and `npm` you must first install NVM, then from your terminal or powershell run:

`nvm install 10.10.0` to install version 10.10.0 of `node` and its relevant `npm` version as well.
`nvm use 10.10.0` to use the version of `node` that you installed.

## Setup

When you have everything you need installed, perform the following in your terminal or powershell window:

```
git clone https://github.com/Aspen-Systems/CanopyWebServiceExample-NodeJS.git
cd CanopyWebServiceExample-NodeJS
npm install
```

This should leave you with a built project. You will need a valid config to communicate with Canopy Web Services. Copy the `example.config.json` file in the `config` folder and create a new file named `config.json`. Fill in the necessary details from your Canopy Web Service Company information.

The config looks something like this:

```json
{
    "canopy": {
        "serverUrl": "http://company.server.com/CanopyWebService.svc/",
        "consumerKey": "your_key",
        "consumerSecret": "your_secret",
        "accessToken": "your_token",
        "tokenSecret": "your_token_secret"
    }
}
```

You will need to point to a valid Canopy Web Services URL (make sure the URL ends with a `/`) as well as have a valid consumer key, consumer secret, access token, and token secret. Without those you will not be able to connect to Canopy Web Services in this example!

After setting up your config, go back to the terminal or powershell and run:

`npm start`  

And then navigate to `http://localhost:3000` in your browser.

Congrats! You now have an application that communicates with Canopy Web Services!

Please visit [the Aspen Systems forum](https://aspen.forumflash.com/login/) to learn more and communicate with your fellow Canopy users on what you can do with Canopy Web Services!

