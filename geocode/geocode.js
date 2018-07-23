const request = require('request');

const apiKey = 'AIzaSyDn8HmlTO9Jjwh_sVLRosqR1LoYOaCswW4';

const geocodeAddress = (addr) => {
  request(
    {
      url: [
        'https://maps.googleapis.com/maps/api/geocode/json?address=',
        encodeURIComponent(addr),
        '&key=',
        apiKey
      ].join(''),
      json: true
    },
    (error, resp, body) => {
      if (error) {
        console.log('Unable to connect to the server');
      } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address');
      } else if (body.status === 'OK') {
        console.log('Address:', body.results[0].formatted_address);
        console.log('Longitude: ', body.results[0].geometry.location.lng);
        console.log('Latitude: ', body.results[0].geometry.location.lat);
      }
    }
  );
}

module.exports.geocodeAddress = geocodeAddress;
