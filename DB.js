
module.exports = {
    UserDataInser: function (UserData) {

        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('test');

db.run("CREATE TABLE IF NOT EXISTS `UserData` (	`WOED`	INTEGER,	`title`	TEXT,	`min_temp`	INTEGER,	`max_temp`	INTEGER,	`WS`	TEXT)");


var w_s = "\""+UserData.WS+"\"";

db.run('INSERT INTO UserData (WOED,title,min_temp,max_temp,WS)  VALUES  ('
+parseFloat(UserData.WOED)+','
+UserData.title+','
+parseFloat(UserData.min_temp).toFixed(2)+','
+parseFloat(UserData.max_temp).toFixed(2)+','
+w_s+    
    ')'

, function(err, row) {
    console.log(err);
});
db.close();
    }
}
