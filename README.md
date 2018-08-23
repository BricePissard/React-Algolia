This project presents a simple React app with data stored in Algolia.
The app is an 100% Javascript Web-App.
The JSON datasets have been reformatted and pushed to Algolia server.

![alt text](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/preview.png)

# Installation
To launch this application please follow this instructions:
- Install in your local computer ``node``, ``yarn`` and ``npx``
- Download the source files to your local computer in ``your-folder``
- Install the node dependencies:
```sh
cd your_folder
yarn install
```
- Start the local node server:
```sh
yarn start
```

A demo have been deployed here:
http://algolia.robby.ai:3000



# Data Manipulation
To make it works a dataset of a JSON and a CSV files have used:
```sh
./src/data/restaurants_list.json
./src/data/restaurants_info.csv
```
This files contains complementary informations about the restaurants to search in the web-app.<br/>
A script have been required to convert the CSV file into JSON and to combine this two data in one file.

To execute the script do:
```sh
$ npm i -g csvtojson
$ cd ./src/data/
$ csvtojson restaurants_info.csv > restaurants_info.json
$ node _script.js
```

A new file have been created locally:
```sh
./src/data/restaurants_merge.json
```
This file have to be uploaded in Algolia website: https://www.algolia.com/apps/
