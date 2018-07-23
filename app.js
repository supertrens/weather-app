const request = require('request');
const yargs = require('yargs');

const apiKey = 'AIzaSyDn8HmlTO9Jjwh_sVLRosqR1LoYOaCswW4';
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

// get the address from the console
const address = encodeURIComponent(argv.address);

request(
  {
    url: [
      'https://maps.googleapis.com/maps/api/geocode/json?address=',
      address,
      '&key=',
      apiKey
    ].join(''),
    json: true
  },
  (error, resp, body) => {
    console.log('Address:', body.results[0].formatted_address);
    console.log('Longitude: ', body.results[0].geometry.location.lng);
    console.log('Latitude: ', body.results[0].geometry.location.lat);

    // console.log(JSON.stringify(resp, undefined, 2));
  }
);
