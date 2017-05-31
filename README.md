# IBM MQTT Status Dashboard  
A dashboard for viewing MQTT data from wearable devices. Each row in the dashboard represents a wearable. By selecting/toggling filters at the top of the screen, you can choose what data to view about each device.
This application is used as a diagnostic and monitoring tool for all deployed devices.

BADGES here ...

## development
```bash
$ git clone ...
$ cd mqtt_server_workversion
$ rename `.env-sample` to `.env` and change variables accordingly
$ yarn install
$ yarn start # starts webpack dev serve at port XXXX
# on another terminal
 $ yarn start:server # starts node server on port XXXX
```

## Bluemix - development / production
Running in **development** mode will bypass the Bluemix MQTT connection and use a dummy data server instead (see `server/dummyBroker.js`).

Running in **production** mode will bypass the dummyBroker and connect to Bluemix

A `.env` file is required for authentication of our Stormpath credentials and Bluemix (if you're using it, see above).

Stormpath is used to control access to the web application. If you do not have credentials, contact Matthew Epler.

## TO-DO
- [ ] 'packets' and other new data attributes
- [ ] bad bends ON vs OFF
