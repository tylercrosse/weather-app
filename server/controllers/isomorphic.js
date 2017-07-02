const path = require('path');

/**
 * Serve the index.html file
 * @param  {Object} req Express request
 * @param  {Object} res Express response
 */
const serveIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
}

module.exports = {
  serveIndex
};
