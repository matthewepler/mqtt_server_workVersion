# IBM MQTT Status Dashboard  

**To start**
In separate terminals, run:  
`yarn start`  
`NODE_ENV=development node server`  

Running in **development** mode will bypass the Bluemix MQTT connection and use a dummy data server instead (see `server/dummyBroker.js`). 

Running in **production** mode will bypass the dummyBroker and connect to Bluemix

A `.env` file is required for authentication of our Stormpath credentials and Bluemix (if you're using it, see above). 

Stormpath is used to control access to the web application. If you do not have credentials, contact Matthew Epler.

## TO-DO
- 'packets' and other new data attributes
- bad bends ON vs OFF

