# IBM MQTT Status Dashboard

##Summary
A simple tool for seeing if the broker is publishing data and what tags are online.

This displays the connectivity status of a client to the MQTT broker. It displays all tags that are connected and sending environmental data (which they all do every 1 sec). 

##Install/Run
Clone or download the source to your computer. `cd` into the directory and install dependencies using `yarn install` at the project root.

To start the app, run `yarn run start`

If you get an error related to `node-sass`, make sure you've installed `node-sass` globally (`npm install -g node-sass`) and then run the command `npm rebuild node-sass` within the project's root directory.

For other issues, contact Matthew