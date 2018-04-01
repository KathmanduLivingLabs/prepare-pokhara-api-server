// var request = require('request');
// var async = require('async');
//     // url = "http://192.168.0.113:4040/api/v1/hospitals/fetch";
//     url = "https://www.openstreetmap.org/api/0.6/user/details";
//     // auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// request(
//     {
//         url : url,
//         headers : {
//             "Authorization" : 'OAuth oauth_consumer_key="WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65", oauth_nonce="JpCpod", oauth_signature="z9uFS7UpGxZJKJGE6XpR91AenDA%3D", oauth_signature_method="HMAC-SHA1",  oauth_token="CCrpTCeIDAf6ZHwLT7LH42Uv5tKYo0ZRCdehZmEL"',

//             "Content-Type" : "application/x-www-form-urlencoded"
//         }
//     },
//     function (error, response, body) {
//         // Do more stuff with 'body' here
//         console.log("HELLO RERE",response.body)
//         console.log(error)
//     }
// );


// var Srequest = require('sync-request');
// var xml2js = require('xml2js').parseString;
// var fs = require('fs');
// var json2csv = require('json2csv');

// var osmUsers  = [ { name: 'AkAshok', id: '3668314' },
//   { name: 'ALX', id: '514513' },
//   { name: 'Ashwin kumar karki', id: '5122701' },
//   { name: 'Bibek Gurung', id: '3933760' },
//   { name: 'bidurdevkota', id: '3934065' },
//   { name: 'Bikram Regmi', id: '3117346' },
//   { name: 'Biku', id: '3481070' },
//   { name: 'Dev Kapil', id: '3481035' },
//   { name: 'ishapkr', id: '4061869' },
//   { name: 'Kabikc', id: '3954296' },
//   { name: 'mr bungle', id: '1739268' },
//   { name: 'Mrnprabhat', id: '3934069' },
//   { name: 'Nabin Thapa', id: '4242196' },
//   { name: 'nishaadhikari', id: '3481073' },
//   { name: 'Pranish Tamrakar', id: '4456726' },
//   { name: 'Rajan Kumar Adhikari', id: '3117626' },
//   { name: 'Regmisujan', id: '4061858' },
//   { name: 'Ronaldo7179', id: '5807981' },
//   { name: 'Ruchi Shrestha', id: '4110736' },
//   { name: 'SGauchan', id: '4034564' },
//   { name: 'Shree Krishna Adhikari', id: '4851338' },
//   { name: 'Sudipti', id: '4241828' },
//   { name: 'Surendramega', id: '3117061' } ]


// var counts = [];

// osmUsers.forEach(function(osmUser){
// 	var r = Srequest('GET',`https://www.openstreetmap.org/api/0.6/user/${osmUser.id}`);
// 	var xml = (r.getBody());
// 	xml2js(xml, function(err, result) {
// 	    if (err) console.log(err);
// 	    counts.push({
// 	    	display_name: result.osm.user[0]['$'].display_name,
// 	    	id : result.osm.user[0]['$'].id,
// 	    	count : result.osm.user[0].changesets[0]['$'].count
// 	    })
// 	})

// })

// console.log('>>>>',counts)

// console.log('********',osmUsers.length,'&&&&&&&&&',osmUsers.length);

// var csv = json2csv({
// 	data: counts,
// 	fields: ['display_name','count']
// });
  

// fs.writeFile('./counts.csv', csv, function(err) {
// 	console.log('CSV DONE')


// });

  











// ***********************************



// var usernames = ["mahadev", "mohan", "pratibhasapkota", "shiva", "abinash.subedi28", "adhikariamrit877", "Aesome Sandy", "AkAshok", "Alishha", "ALX", "Amrit Devkota", "Anish Upreti", "ANUP SUBEDI ", "Arjun123", "Ashis104", "Ashish.chalise", "Ashmeera", "Ashmita Sapkota", "Ashwin kumar karki", "asmitlama4", "Avìshek", "basanta123", "Bibek chand", "Bibek Gurung", "Bibekchand", "bidurdevkota", "Bikram Regmi", "Biku", "Bimala chhetri", "Binit chhantyal ", "Bishal", "bishal", "Bishal G", "Chandra Mohan ", "Ddsandyya@gmail.com", "Deepak Parajuli", "Dev Kapil", "Dev Nrayan Poudel", "devkusandy", "Dinesh Bishwakarma", "Dipendra", "dreamershristi1", "g-binod", "hillson", "Hrnprabhat", "ishapkr", "Ivzal13", "Jyoti Devkota", "Kabikc", "Kabiraj Rokaya", "Kalidas", "kalidas sapkota", "Kamal Ksheri", "Khemraj12345", "krishan Timilsina", "Kshitij16", "Kshitizraj Sharma", "KuberM", "Kushal Gauchan", "lafakrish715", "lakhu", "link2m2.72", "Madan chhetri", "Madan Khatri", "Manisha parajuli", "mansunil1997", "marbhungemotu", "menadhikari", "Mesolon", "Mira Neupane", "mr bungle", "Mrnprabhat", "nabeen", "Nabin Thapa", "nabin1", "Nabincoolzo", "nirdesh kc", "nishaadhikari", "NishaAdhikari", "NIshan Adhikari", "pdl_shawn", "PK_prakash", "Poonam Gurung ", "Prakash Paudel", "Prakreti15", "Pranish Tamrakar", "Pratap66", "Prativa G.C.", "Rabin Ojha", "rabin ojha", "Rajan Kumar Adhikari", "Ram Kumar Adhikari", "Rawie Adhikary", "Ray Gunn", "Regmisujan", "Ritesh Gc", "riteshgc.", "Ritika gurung", "Rmeskhanal", "Roger Anish", "Ronaldo7179", "Ronaldo77", "Roshan", "Ruchi Shrestha", "rupesh1282", "Sabita gahatraj123", "Sachin ", "Sadeeptadh", "Sagar Karki", "Sagar Mahat ", "sagar sapkota", "Samjhana", "samritagrg", "Samyak Otaku", "Sandhya.Dhakal", "Sandip Aryal ", "sandpthapa", "Santhosh Shrestha", "Santosh11", "Saroj Nepali", "SaugatGautam", "Saurav Gautam", "Saw Ma ", "Sawma", "SGauchan", "Shiva Krishna chaudhary", "Shree Krishna Adhikari", "Shreeking", "Shrestha suman", "Shukar Raj Subedi", "Sinjal", "Sjoshi", "Skhanal720", "Srijana baral", "Sthapratistha", "Subash Tiwari", "Subsh Baral ", "sudarshan054", "Sudip Gautam", "Sudipti", "sulochana", "Suman2514", "Surendra Koirala", "Surendramega", "Surya Adhikari ", "Sushank", "sushaok", "Susmina", "tekshrestha3", "Thakur lamichhane", "Thapa Pabitra", "theniraj23", "Thubin", "tom Copp", "Tsamtu", "Udaya Parajuli ", "WRC Std daman", "Wrc Std Daman", "Yogendra Karki", "Zahira27"];

var xml2js = require('xml2js').parseString;


// var osmUsers= [];

// var promises = [];

var Srequest = require('sync-request');


// // var r = Srequest('GET','http://api.openstreetmap.org/api/0.6/changesets?display_name=Bishal9841');

// // var xml = (r.getBody());

// // xml2js(xml, function(err, result) {
// //     if (err) console.log(err);
// //     console.log('>>>>',result.osm.changeset.length)
// // })

// usernames.forEach(function(username){
// 	var apiURL = `http://whosthat.osmz.ru/whosthat.php?action=names&q=${username}`;
// 	var r = Srequest('GET',apiURL);
// 	var user = JSON.parse(r.getBody('utf8'));
// 	for(var i =0 ; i<user.length; i++){
// 		if(user[i].names.indexOf(username) !== -1){
// 			osmUsers.push({
// 				'name' : username,
// 				'id' : user[i].id
// 			});
// 			console.log('osmUsers',osmUsers);
// 			break;

// 		}
// 	}

// })



// &&&&&&&&&&&&&&&&&&&&&&&&&&&

var osmUsers = [];

var usernames = ["mahadev", "mohan", "pratibhasapkota", "shiva", "abinash.subedi28", "adhikariamrit877", "Aesome Sandy", "AkAshok", "Alishha", "ALX", "Amrit Devkota", "Anish Upreti", "ANUP SUBEDI ", "Arjun123", "Ashis104", "Ashish.chalise", "Ashmeera", "Ashmita Sapkota", "Ashwin kumar karki", "asmitlama4", "Avìshek", "basanta123", "Bibek chand", "Bibek Gurung", "Bibekchand", "bidurdevkota", "Bikram Regmi", "Biku", "Bimala chhetri", "Binit chhantyal ", "Bishal", "bishal", "Bishal G", "Chandra Mohan ", "Ddsandyya@gmail.com", "Deepak Parajuli", "Dev Kapil", "Dev Nrayan Poudel", "devkusandy", "Dinesh Bishwakarma", "Dipendra", "dreamershristi1", "g-binod", "hillson", "Hrnprabhat", "ishapkr", "Ivzal13", "Jyoti Devkota", "Kabikc", "Kabiraj Rokaya", "Kalidas", "kalidas sapkota", "Kamal Ksheri", "Khemraj12345", "krishan Timilsina", "Kshitij16", "Kshitizraj Sharma", "KuberM", "Kushal Gauchan", "lafakrish715", "lakhu", "link2m2.72", "Madan chhetri", "Madan Khatri", "Manisha parajuli", "mansunil1997", "marbhungemotu", "menadhikari", "Mesolon", "Mira Neupane", "mr bungle", "Mrnprabhat", "nabeen", "Nabin Thapa", "nabin1", "Nabincoolzo", "nirdesh kc", "nishaadhikari", "NishaAdhikari", "NIshan Adhikari", "pdl_shawn", "PK_prakash", "Poonam Gurung ", "Prakash Paudel", "Prakreti15", "Pranish Tamrakar", "Pratap66", "Prativa G.C.", "Rabin Ojha", "rabin ojha", "Rajan Kumar Adhikari", "Ram Kumar Adhikari", "Rawie Adhikary", "Ray Gunn", "Regmisujan", "Ritesh Gc", "riteshgc.", "Ritika gurung", "Rmeskhanal", "Roger Anish", "Ronaldo7179", "Ronaldo77", "Roshan", "Ruchi Shrestha", "rupesh1282", "Sabita gahatraj123", "Sachin ", "Sadeeptadh", "Sagar Karki", "Sagar Mahat ", "sagar sapkota", "Samjhana", "samritagrg", "Samyak Otaku", "Sandhya.Dhakal", "Sandip Aryal ", "sandpthapa", "Santhosh Shrestha", "Santosh11", "Saroj Nepali", "SaugatGautam", "Saurav Gautam", "Saw Ma ", "Sawma", "SGauchan", "Shiva Krishna chaudhary", "Shree Krishna Adhikari", "Shreeking", "Shrestha suman", "Shukar Raj Subedi", "Sinjal", "Sjoshi", "Skhanal720", "Srijana baral", "Sthapratistha", "Subash Tiwari", "Subsh Baral ", "sudarshan054", "Sudip Gautam", "Sudipti", "sulochana", "Suman2514", "Surendra Koirala", "Surendramega", "Surya Adhikari ", "Sushank", "sushaok", "Susmina", "tekshrestha3", "Thakur lamichhane", "Thapa Pabitra", "theniraj23", "Thubin", "tom Copp", "Tsamtu", "Udaya Parajuli ", "WRC Std daman", "Wrc Std Daman", "Yogendra Karki", "Zahira27"];

for(let i =0 ; i <usernames.length; i++){
  let username = usernames[i];
  try{
      var r = Srequest('GET',encodeURI(`http://api.openstreetmap.org/api/0.6/changesets?display_name=${username}`));
      var xml = (r.getBody());
      xml2js(xml, function(err, result) {
          if (err) console.log(err);
          if(result && result.osm && result.osm && result.osm['changeset'] && result.osm['changeset'].length){
            osmUsers.push({
              'name' : username ,
              'id' : result.osm['changeset'][0]['$'].uid
            })
            
          }else{
            osmUsers.push({
              'name' : username ,
              'id' : 'NO',
              'changeset' : 0
            })
          }
          console.log('All',osmUsers);
          
      })
  }
  catch(e){
    osmUsers.push({
      'name' : username ,
      'id' : '*'
    })
  }
}


var fs = require('fs')
// console.log('All',osmUsers);

fs.writeFile(`./osmusers.json`, JSON.stringify(osmUsers), 'utf8', (err, response) => {
  if (err) reject(err);
  resolve();
});



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// var osmUsers = [{"name":"mahadev","id":"NO","changeset":0},{"name":"mohan","id":"NO","changeset":0},{"name":"pratibhasapkota","id":"*"},{"name":"shiva","id":"NO","changeset":0},{"name":"abinash.subedi28","id":"*"},{"name":"adhikariamrit877","id":"NO","changeset":0},{"name":"Aesome Sandy","id":"*"},{"name":"AkAshok","id":"3668314"},{"name":"Alishha","id":"*"},{"name":"ALX","id":"514513"},{"name":"Amrit Devkota","id":"6497064"},{"name":"Anish Upreti","id":"NO","changeset":0},{"name":"ANUP SUBEDI ","id":"*"},{"name":"Arjun123","id":"NO","changeset":0},{"name":"Ashis104","id":"*"},{"name":"Ashish.chalise","id":"*"},{"name":"Ashmeera","id":"*"},{"name":"Ashmita Sapkota","id":"6496851"},{"name":"Ashwin kumar karki","id":"5122701"},{"name":"asmitlama4","id":"*"},{"name":"Avìshek","id":"*"},{"name":"basanta123","id":"NO","changeset":0},{"name":"Bibek chand","id":"*"},{"name":"Bibek Gurung","id":"3933760"},{"name":"Bibekchand","id":"*"},{"name":"bidurdevkota","id":"3934065"},{"name":"Bikram Regmi","id":"3117346"},{"name":"Biku","id":"3481070"},{"name":"Bimala chhetri","id":"*"},{"name":"Binit chhantyal ","id":"*"},{"name":"Bishal","id":"NO","changeset":0},{"name":"bishal","id":"*"},{"name":"Bishal G","id":"6075024"},{"name":"Chandra Mohan ","id":"3954294"},{"name":"Ddsandyya@gmail.com","id":"*"},{"name":"Deepak Parajuli","id":"*"},{"name":"Dev Kapil","id":"3481035"},{"name":"Dev Nrayan Poudel","id":"*"},{"name":"devkusandy","id":"*"},{"name":"Dinesh Bishwakarma","id":"6075041"},{"name":"Dipendra","id":"*"},{"name":"dreamershristi1","id":"*"},{"name":"g-binod","id":"*"},{"name":"hillson","id":"6075019"},{"name":"Hrnprabhat","id":"*"},{"name":"ishapkr","id":"4061869"},{"name":"Ivzal13","id":"*"},{"name":"Jyoti Devkota","id":"*"},{"name":"Kabikc","id":"3954296"},{"name":"Kabiraj Rokaya","id":"*"},{"name":"Kalidas","id":"*"},{"name":"kalidas sapkota","id":"*"},{"name":"Kamal Ksheri","id":"*"},{"name":"Khemraj12345","id":"*"},{"name":"krishan Timilsina","id":"*"},{"name":"Kshitij16","id":"*"},{"name":"Kshitizraj Sharma","id":"7004124"},{"name":"KuberM","id":"*"},{"name":"Kushal Gauchan","id":"*"},{"name":"lafakrish715","id":"*"},{"name":"lakhu","id":"NO","changeset":0},{"name":"link2m2.72","id":"*"},{"name":"Madan chhetri","id":"*"},{"name":"Madan Khatri","id":"*"},{"name":"Manisha parajuli","id":"*"},{"name":"mansunil1997","id":"NO","changeset":0},{"name":"marbhungemotu","id":"*"},{"name":"menadhikari","id":"*"},{"name":"Mesolon","id":"*"},{"name":"Mira Neupane","id":"6075008"},{"name":"mr bungle","id":"1739268"},{"name":"Mrnprabhat","id":"3934069"},{"name":"nabeen","id":"NO","changeset":0},{"name":"Nabin Thapa","id":"4242196"},{"name":"nabin1","id":"NO","changeset":0},{"name":"Nabincoolzo","id":"*"},{"name":"nirdesh kc","id":"*"},{"name":"nishaadhikari","id":"3481073"},{"name":"NishaAdhikari","id":"*"},{"name":"NIshan Adhikari","id":"*"},{"name":"pdl_shawn","id":"6525896"},{"name":"PK_prakash","id":"6496878"},{"name":"Poonam Gurung ","id":"*"},{"name":"Prakash Paudel","id":"*"},{"name":"Prakreti15","id":"*"},{"name":"Pranish Tamrakar","id":"4456726"},{"name":"Pratap66","id":"*"},{"name":"Prativa G.C.","id":"*"},{"name":"Rabin Ojha","id":"6075053"},{"name":"rabin ojha","id":"*"},{"name":"Rajan Kumar Adhikari","id":"3117626"},{"name":"Ram Kumar Adhikari","id":"*"},{"name":"Rawie Adhikary","id":"NO","changeset":0},{"name":"Ray Gunn","id":"NO","changeset":0},{"name":"Regmisujan","id":"4061858"},{"name":"Ritesh Gc","id":"*"},{"name":"riteshgc.","id":"*"},{"name":"Ritika gurung","id":"*"},{"name":"Rmeskhanal","id":"NO","changeset":0},{"name":"Roger Anish","id":"6075257"},{"name":"Ronaldo7179","id":"5807981"},{"name":"Ronaldo77","id":"*"},{"name":"Roshan","id":"*"},{"name":"Ruchi Shrestha","id":"4110736"},{"name":"rupesh1282","id":"NO","changeset":0},{"name":"Sabita gahatraj123","id":"*"},{"name":"Sachin ","id":"NO","changeset":0},{"name":"Sadeeptadh","id":"*"},{"name":"Sagar Karki","id":"*"},{"name":"Sagar Mahat ","id":"3933518"},{"name":"sagar sapkota","id":"*"},{"name":"Samjhana","id":"*"},{"name":"samritagrg","id":"*"},{"name":"Samyak Otaku","id":"*"},{"name":"Sandhya.Dhakal","id":"*"},{"name":"Sandip Aryal ","id":"*"},{"name":"sandpthapa","id":"*"},{"name":"Santhosh Shrestha","id":"*"},{"name":"Santosh11","id":"*"},{"name":"Saroj Nepali","id":"*"},{"name":"SaugatGautam","id":"*"},{"name":"Saurav Gautam","id":"*"},{"name":"Saw Ma ","id":"NO","changeset":0},{"name":"Sawma","id":"*"},{"name":"SGauchan","id":"4034564"},{"name":"Shiva Krishna chaudhary","id":"*"},{"name":"Shree Krishna Adhikari","id":"4851338"},{"name":"Shreeking","id":"*"},{"name":"Shrestha suman","id":"*"},{"name":"Shukar Raj Subedi","id":"*"},{"name":"Sinjal","id":"NO","changeset":0},{"name":"Sjoshi","id":"*"},{"name":"Skhanal720","id":"*"},{"name":"Srijana baral","id":"6496856"},{"name":"Sthapratistha","id":"*"},{"name":"Subash Tiwari","id":"6075635"},{"name":"Subsh Baral ","id":"*"},{"name":"sudarshan054","id":"6497262"},{"name":"Sudip Gautam","id":"*"},{"name":"Sudipti","id":"4241828"},{"name":"sulochana","id":"*"},{"name":"Suman2514","id":"*"},{"name":"Surendra Koirala","id":"*"},{"name":"Surendramega","id":"3117061"},{"name":"Surya Adhikari ","id":"3660849"},{"name":"Sushank","id":"*"},{"name":"sushaok","id":"*"},{"name":"Susmina","id":"*"},{"name":"tekshrestha3","id":"*"},{"name":"Thakur lamichhane","id":"*"},{"name":"Thapa Pabitra","id":"NO","changeset":0},{"name":"theniraj23","id":"NO","changeset":0},{"name":"Thubin","id":"*"},{"name":"tom Copp","id":"*"},{"name":"Tsamtu","id":"*"},{"name":"Udaya Parajuli ","id":"3481052"},{"name":"WRC Std daman","id":"*"},{"name":"Wrc Std Daman","id":"*"},{"name":"Yogendra Karki","id":"7004471"},{"name":"Zahira27","id":"*"}]

// var Srequest = require('sync-request');
// var xml2js = require('xml2js').parseString;
// var fs = require('fs');
// var json2csv = require('json2csv');


// var counts = [];

// osmUsers.forEach(function(osmUser){
//   if(osmUser.id !=='*' && osmUser.id !=='NO'){
//     var apiURL = `https://www.openstreetmap.org/api/0.6/user/${osmUser.id}`;
//     console.log('$$$',apiURL)
//     var r = Srequest('GET',apiURL);
//     var xml = (r.getBody());
//     xml2js(xml, function(err, result) {
//         if (err) console.log(err);
//         counts.push({
//           display_name: result.osm.user[0]['$'].display_name,
//           id : result.osm.user[0]['$'].id,
//           count : result.osm.user[0].changesets[0]['$'].count
//         })
//     })
//   }else{
//       counts.push({
//         display_name: osmUser.name,
//         id : osmUser.id,
//         count : osmUser.id === 'NO' ? 0 : 'No such user'
//       })
//   }
 

// })

// console.log('>>>>',counts)

// console.log('********',osmUsers.length,'&&&&&&&&&',osmUsers.length);

// var csv = json2csv({
//  data: counts,
//  fields: ['display_name','count']
// });
  

// fs.writeFile('./counts.csv', csv, function(err) {
//  console.log('CSV DONE')


// });