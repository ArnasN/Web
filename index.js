const express = require('express')
const path = require('path')
const https = require('https');
var bodyParser = require('body-parser')
var weater = require('./weater')
const PORT = process.env.PORT || 5000
var urlencodedParser = bodyParser.urlencoded({ extended: false })


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

  
  .post('/weater',urlencodedParser, function (req, res){
  

    var WOED = req.body.WOED;

    var weaterData;
    

    https.get('https://www.metaweather.com/api/location/'+WOED+'/', (resp) => {
      let data = '';
     
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
      weaterData = weater.weatherParser(data);   
      console.log(WOED);   
        res.render('pages/weater', { weater: weaterData, lacationID : 'locating' });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  })







  .listen(PORT, () => console.log(`Listening on ${PORT}`))




