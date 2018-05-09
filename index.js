const express = require('express')
const path = require('path')
const https = require('https');
const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))




  .get('/weater', function (req, res) {

    var weaterData;


    https.get('https://www.metaweather.com/api/location/44418/', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {

        weaterData = JSON.parse(data);
        console.log(weaterData);
        res.render('pages/weater', { weater: weaterData });
      });


    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  })





  .listen(PORT, () => console.log(`Listening on ${PORT}`))




