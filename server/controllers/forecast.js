const fetch = require('isomorphic-fetch');
const moment = require('moment');
const _ = require('lodash');

/**
 * Get forecast data for a given lat long.
 * Reponse contains 168+ hrs of hourly data starting at 12:00 AM of current day,
 * this requires two HTTP requests to the darksky API. One is historic data
 * @param  {Object} req Express request, containing a latlng string
 * @param  {Object} res Express response, forecast data formatted in JSON
 */
const getForecast = async (req, res) => {
  const currentUnixTime = moment().format('X');
  const historicURI = `https://api.darksky.net/forecast/1780bf38f274f706e6a341962cfa4f60/${req
    .params
    .latlng},${currentUnixTime}?exclude=[currently,minutely,flags]&extend=hourly`;
  const forecastURI = `https://api.darksky.net/forecast/1780bf38f274f706e6a341962cfa4f60/${req
    .params.latlng}?exclude=[flags]&extend=hourly`;

  try {
    const historicJSON = await fetch(historicURI).then(response =>
      response.json()
    );
    const forecastJSON = await fetch(forecastURI).then(response =>
      response.json()
    );

    const historicHourly = _.keyBy(historicJSON.hourly.data, 'time');
    const forecastHourly = _.keyBy(forecastJSON.hourly.data, 'time');
    const mergedHourly = _.merge(forecastHourly, historicHourly);

    forecastJSON.hourly.data = Object.values(mergedHourly);

    res.json(forecastJSON);
  } catch (err) {
    // TODO improve error handling (response codes)
    console.log('❌', error);
  }
};

module.exports = {
  getForecast
};
