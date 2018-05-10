var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test');
 

db.run("CREATE TABLE IF NOT EXISTS `UserData` (	`WOED`	INTEGER,	`title`	TEXT,	`min_temp`	INTEGER,	`max_temp`	INTEGER,	`WS`	TEXT)");
db.run('INSERT INTO UserData (WOED, title,min_temp,max_temp,WS)  VALUES  (100,"city",5,10,"cloudy")');


db.close();