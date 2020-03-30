# Food Trucks

A web service that tells the user what types of food trucks might be found near a specific location on a map.
You can also search for the nearest trucks from the current location and display it.

![capture](https://raw.githubusercontent.com/endmaster0809/em-food-trucks/master/src/assets/img/screenshot.png)

## What you can do

- Show food trucks within 1 km from specific location on Google Map
- Search for the nearest truck within 1 km from current location

## App URL

http://em-food-trucks.surge.sh/

## Uber coding challange

- [Uber's tools team coding challenge](https://github.com/uber/coding-challenge-tools)
- [coding-challenge-tools/coding_challenge.md at master · uber/coding-challenge-tools · GitHub](https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md)

### Project Type: 4.Food Trucks

> Create a service that tells the user what types of food trucks might be found near a specific location on a map.
> via [https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md#food-trucks](https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md#food-trucks)

## Get Involved

### 1. Clone Repo

```
$ git clone https://github.com/endmaster0809/em-food-trucks.git
$ cd em-food-trucks
```

### 2. Create env variable

```
1. Go to the project's `./` folder and create the environment variable. - `touch .env`
2. Fill the `.env` file with Google API Key. For example:
REACT_APP_GOOGLE_API_KEY=#############################
```

### 3. Running as local

```
$ yarn install
$ yarn start
```

## Tasks

- Create-React-App
- Bootstrap for UI components
- Google Map Integration
- API Integration with [DataSF](http://www.datasf.org/): [Food Trucks](https://data.sfgov.org/Permitting/Mobile-Food-Facility-Permit/rqzj-sfat)
