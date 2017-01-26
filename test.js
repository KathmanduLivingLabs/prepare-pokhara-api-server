var request = require('request'),
    url = "http://192.168.0.113:4040/api/v1/hospitals/fetch";
    // url = "https://www.openstreetmap.org/api/0.6/user/details";
    // auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
request(
    {
        url : url,
        headers : {
            "Authorization" : 'OAuth oauth_consumer_key="WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65", oauth_nonce="BC4OQZ", oauth_signature="6qLyNqyT%2FAFNj2lZ2vAar1u5W%2FM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1485420172", oauth_token="Ae0NiDrHVAOGc6Nvof5pvfxTfr4om03RxAjU4PxC"' ,

            "Content-Type" : "application/x-www-form-urlencoded"
        }
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
        console.log("HELLO RERE",response.body)
        console.log(error)
    }
);

