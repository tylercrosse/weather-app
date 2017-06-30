const express = require('express');
const fetch = require('isomorphic-fetch');

const router = express.Router();

router.get('/api/forecast/:latlng', (req, res) => {
  const uri = `https://api.darksky.net/forecast/1780bf38f274f706e6a341962cfa4f60/${req.params.latlng}`

  console.log(uri);

  // TODO improve error handling (response codes)
  fetch(uri)
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(err => {
      console.log('❌', error)
    })
})

// serve index
router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


module.exports = router;
