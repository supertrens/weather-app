const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

let  data;
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

geocode.geocodeAddress(argv.address)
.then(location => { // resolve location promise
  data = location;
 return weather.getWeather(location.latitude , location.longitude);
})
.then(weatherResp => { // resolve weather promise
  console.log(`At ${data.address} the temperature is ${weatherResp.temperature}.
  However it feels like ${weatherResp.apparentTemperature}`);
})
.catch(err => {
  console.log('error : ', err);
});



