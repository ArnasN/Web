const express = require('express')
const path = require('path')
const https = require('https');
var bodyParser = require('body-parser')
var weater = require('./weater')
var DB = require('./DB')
const PORT = process.env.PORT || 5000
var urlencodedParser = bodyParser.urlencoded({ extended: false })


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/userData', urlencodedParser, function (req, res){
     var userData = req.body; 
     DB.UserDataInser(userData);
    console.log(userData);
    res.render('pages/db.ejs',{data: userData});
  })
  

  .post('/weater',urlencodedParser, function (req, res){
  
    var WOED = req.body.WOED;
    var weaterData;
    var userDataWeater;
    https.get('https://www.metaweather.com/api/location/'+WOED+'/', (resp) => {
      let data = '';
     
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
      weaterData = weater.weatherParser(data);

        DB.getUsersData(function(data){
          userDataWeater =  JSON.stringify(data);
         
        res.render('pages/weater', { weater: weaterData, lacationID : 'locating', userData:userDataWeater });
     //   console.log(data);
     });


       
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  })







  .listen(PORT, () => console.log(`Listening on ${PORT}`))




