const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address , (errMsg , geocodeResp) => {
  if(errMsg){
    console.log(errMsg);
  } else {
    getWeather(geocodeResp);
  }
});

function getWeather(geocodeResp){
  weather.getWeather(geocodeResp.latitude , geocodeResp.longitude, (errMsg , weatherResp) => {
    if(errMsg){
      console.log(errMsg);
    } else {
      console.log(`At ${geocodeResp.address} the temperature is ${weatherResp.temperature}.
      However it feels like ${weatherResp.apparentTemperature}`);
    }
  }); 
}


