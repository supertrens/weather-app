const request = require('request');

const apiKey = 'AIzaSyDn8HmlTO9Jjwh_sVLRosqR1LoYOaCswW4';

const geocodeAddress = (addr, callback) => {
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
        callback('Unable to connect to the server');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address');
      } else if (body.status === 'OK') {
        callback(undefined , {
          address : body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      }
    }
  );
}

module.exports.geocodeAddress = geocodeAddress;
