const request = require('request');

const getWeather = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.darksky.net/forecast/c47c0edc9ccc7624267db8daf7f05eda/${latitude},${longitude}`,
        json: true
      },
      (error, resp, body) => {
        if (error) {
          reject('Unable to connect to the server');
        } else if (resp.statusCode === 400 || resp.statusCode === 404) {
          reject('Unable to find that address');
        } else if (resp.statusCode === 200) {
          resolve({
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
          });
        }
      }
    );
  });
};

module.exports.getWeather = getWeather;
