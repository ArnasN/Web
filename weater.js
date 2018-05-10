module.exports = {
    weatherParser: function (weatherData) {
         myVar = JSON.parse(weatherData);

      //  console.log(myVar);

        if(myVar.detail =='Not found.') {
          return null;
        }
        


            var state = [];
            var min_temp = 0.0;
            var max_temp = 0.0;
            var predictability = 0.0 ;
            var sourcesCount = myVar.consolidated_weather.length;

            for (i = 0; i < myVar.consolidated_weather.length; i++) {
              state[i] = myVar.consolidated_weather[i].weather_state_name;
              min_temp += parseFloat(myVar.consolidated_weather[i].min_temp);
              max_temp += parseFloat( myVar.consolidated_weather[i].max_temp);
              predictability +=parseFloat(myVar.consolidated_weather[i].predictability);
            }
      
            var decodedWeather = {
              'title' : myVar.title,
              'sourcesCount' : sourcesCount,
              'min_temp' : (min_temp/sourcesCount).toFixed(2)+'°C',
              'max_temp' : (max_temp/sourcesCount).toFixed(2)+'°C',
              'predictability' : (predictability/sourcesCount).toFixed(2)+'%',
            }
            
            
            state = compressArray(state); 
            state.forEach(element => {
              decodedWeather[element.value] = ((element.count/sourcesCount)*100).toFixed(2)+'%' ;
            });
       
         
       return decodedWeather;             
    }
  }

function compressArray(original) {
    var compressed = [];
    var copy = original.slice(0);
    for (var i = 0; i < original.length; i++) {
      var myCount = 0;
      for (var w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          myCount++;
          delete copy[w];
        }
      }
      if (myCount > 0) {
        var a = new Object();
        a.value = original[i];
        a.count = myCount;
        compressed.push(a);
      }
    }
    return compressed;
  };
