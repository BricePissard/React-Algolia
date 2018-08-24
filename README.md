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


# Extra Features
The purpose of this demo is to show how simple and accurate are Algolia services so some features have been added:<br/>
- Add statistics on rating and payment modes like the ones next to the food types.<br/><br/>
![statistics](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/statistics.png)

- Pagination at the bottom of the result list.<br/>
![pagination](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/pagination.png)

- Responsive CSS UI to adapt the view to the user screen.
- A specific Mobile UI/UX to provide a better search experience on small devices.<br/>
![mobile menu](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/preview_mobile_menu.png)
![mobile](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/preview_mobile.png)

- Add a location search field on the top bar to allow to search for a specific location to find the restaurants nearby.<br/>
![location search ](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/location_search.png)

- Add the distance in the results of the restaurants if the location filter have been provided.<br/>
![distance](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/distance.png)
- Replace images by vectorial font icons (@see https://fontawesome.com/icons)

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

A new file is then created locally:
```sh
./src/data/restaurants_merge.json
```
This file have to be uploaded in Algolia website: <br/>
https://www.algolia.com/apps/
<br/>
In Algolia web interface an ``Indice`` ``restaurants`` have been created and the data from ``restaurants_merge.json`` have been imported in it.

# Configuration of Algolia Index
To be able to search through Algolia in the data imported, some settings have to be 
customized in ``Indices > restaurants > Ranking`` and ``Indices > restaurants > Display``
![algolia_ranking](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/algolia_ranking.png)
![algolia_display](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/algolia_display.png)


# Debug
For debugging purpose some tracing functions have been kept open to see the process while using the app.
Open the Chrome Dev Toolbar by pressing: [ALT]+[COMMAND]+[J]
![alt text](https://raw.githubusercontent.com/BricePissard/React-Algolia/master/public/debug.png)
