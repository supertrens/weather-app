const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: ' Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;
const encodedAddr = encodeURIComponent(argv.addr);
const apiKey = 'AIzaSyDn8HmlTO9Jjwh_sVLRosqR1LoYOaCswW4';
const geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${apiKey}`;
let address ;

axios.get(geoCodeUrl)
  .then(resp => { // geocodePromise
    if (resp.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to fund that address.');
    }
   
    const latitude = resp.data.results[0].geometry.location.lat;
    const longitude = resp.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/c47c0edc9ccc7624267db8daf7f05eda/${latitude},${longitude}`;
    
    address = resp.data.results[0].formatted_address;

    return axios.get(weatherUrl);
  })
  .then( weatherResp => { // weather promise
    const temperature = weatherResp.data.currently.temperature;
    const apparentTemperature = weatherResp.data.currently.apparentTemperature;

    console.log(`At ${address} the temperature is ${temperature}.
    However it feels like ${apparentTemperature}`);
  })
  .catch(err => {
    if (err.code === 'ENOTFOUND') {
      console.log('Unable to connect to API resource');
    } else {
      console.log(err.message);
    }
  });
