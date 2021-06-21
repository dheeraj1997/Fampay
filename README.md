# Fampay

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Features
* Get videos
* Search videos
* Fetch videos in background and store it to db

### Setup
#### NOTE: Multiple Google API keys can be specified to avoid quota exceed errors. To do this, specify them as a single string, separated using ` | ` (space-pipe-space). Example:
`GOOGLE_API_KEY = 'KEY1 | KEY2 | KEY3 | KEY4'`

### Using Docker
Use docker-compose to test the app locally. Make sure to make relevant changes to the environment variables in docker-compose.yml file. Use the following command to build and start the app:
```bash
docker-compose up
```
### Installing locally
Make sure you have node, npm and then follow the below steps

## Steps

* Install mongo db in your pc and run it
* Clone this repo or make download the zip file
* Unzip to a new folder. Call it codebase
* Inside codebase/backend run npm install
* Create a file called **.env** and insert the following code

```
NODE_ENV=development
HOST='localhost'
NODE_PORT='4095'

MONGO_HOST='localhost'
MONGO_PORT=27017
MONGO_DBNAME='fampay'

GOOGLE_API_KEY=YOU_API_KEY
GOOGLE_API_REFRESH_INTERVAL=10
YT_SEARCH_QUERY='music'
```
### Running

To run the server do
```
node index.js
```

You will see the following logs
```
info: [DATABASE] mongodb://localhost:27017/fampay
info: [APP] Starting server initialization
info: [SERVER] Initializing routes
Fetching videos data!
info: [SERVER] Live at http://localhost:4095
info: [APP] initialized SUCCESSFULLY
info: Connected to MongoDB successfully.
```

### Try it Out
**All Requests should be accompanied by the 'Content-Type : application/json' in the header**
* Get videos list
```
URL - http://localhost:4095/videos/list?page_no=page_no
Method - GET
Authentication - None
Query Param - page_no | optional
```

* Search video
```
URL - http://localhost:4095/videos/search?text=:search_string
Method - GET
Authentication - None
Query Param - page_no | required
```

### Extras
To run the server in production change the line in **.env**
```
NODE_ENV=production
```

#### Making changes in production/development
You can change the port number and db name in the two seperate files located inside config/environments
