# MoviesTube 

MoviesTube is an application that allows users to browse and watch video content, similar to the popular YouTube platform. It utilizes the [YouTube V3 API](https://rapidapi.com/ytdlfree/api/youtube-v31/) available through Rapid API, providing access to a wide range of video content. Users can explore, search, and playback videos and channels according to their interests.

At the moment, work is underway on a new version with Typescript, Zustand, etc.

## Demo

Live Demo [here](https://bartek0074-moviestube.netlify.app/).

**NOTE:** I'm using the free version of API, which allows only 500 requests per day. If this limit is exceeded, the page will be not working properly. If this happened, go to [Instructions](#instructions) and install the app with your own API KEY.


![moviestube1](https://user-images.githubusercontent.com/88652468/206906248-c4bf27ea-3c3a-4ff4-b02b-f9e80e61e3a9.gif)


## Instructions

First clone this repository.

```bash
$ git clone https://github.com/Bartek0074/MoviesTube.git
```

Get a free api key from Rapid API Youtube V3. Get it [here](https://rapidapi.com/ytdlfree/api/youtube-v31/).

Create a .env file in the root of your project folder and add the following.

```
REACT_APP_API_KEY=[YOUR_API_KEY_FROM_RAPID_API_YOUTUBE_V3]
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

```bash
$ npm install # or yarn
```

Run it

```bash
$ npm start # or yarn start
```

## Technologies

- React,
- SCSS,
- React Router.
- Node packages.

## Other packages

- axios,
- react-icons,
- react-player.

## Gifs from app

![moviestube2](https://user-images.githubusercontent.com/88652468/206915419-857e48b1-e48d-42ee-bf5d-713a7ea31d55.gif)

![moviestube3](https://user-images.githubusercontent.com/88652468/206915664-4a7fdc5b-4329-47c5-bc54-8b496969a12c.gif)

![moviestube4](https://user-images.githubusercontent.com/88652468/206923451-867dbe1c-b10d-4af5-ba39-4cd8bf81c5a4.gif)

![moviestube5](https://user-images.githubusercontent.com/88652468/206923505-1bd01551-3ba5-4ba4-8eb0-69129407c226.gif)
