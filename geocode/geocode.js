const request = require('request');

const apiKey = 'AIzaSyDn8HmlTO9Jjwh_sVLRosqR1LoYOaCswW4';

const geocodeAddress = addr => {
  return new Promise((resolve, reject) => {
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
          reject('Unable to connect to server');
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Unable to find that address');
        } else if (body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
};

module.exports.geocodeAddress = geocodeAddress;
