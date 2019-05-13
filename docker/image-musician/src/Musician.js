// importation
var dgram = require('dgram');
const uuidv1 = require('uuid/v1');

//udp protocol
var s = dgram.createSocket('udp4');
var PROTOCOL_PORT = 9907;
var PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
var instruments = new Map();

//instruments
instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");



var instrument = new Object();

// access the third command line arguments
instrument.sound = instruments.get(process.argv[2]);
instrument.uuid = uuidv1();

console.log(instrument.sound);

var payload = JSON.stringify(instrument);

message = new Buffer(payload);

// execute a function on a periodic basis of one second
setInterval(function () {

    //send the payload
    s.send(message, 0, message.length, PROTOCOL_PORT, PROTOCOL_MULTICAST_ADDRESS, function (err, bytes) {
        console.log("Sending payload: " + payload + "via port " + s.address().port);
    })
}, 1000);

