
var net = require("net");

var client = new net.Socket();
client.connect(30000, '192.168.1.4', function() {
    console.log('connected to iMatic!');
});

var PREFIX  = '\xFD\x02\x20';
var POSTFIX = "\x5D";

function iMaticOn(relayId) {
    var relay = String.fromCharCode(relayId);
    var on    = String.fromCharCode(1);
    var cmd   = PREFIX+relay+on+POSTFIX;
    client.write(cmd, 'ascii');
}

function iMaticOff(relayId) {
    var relay = String.fromCharCode(relayId);
    var off   = String.fromCharCode(0);
    var cmd   = PREFIX+relay+off+POSTFIX;
    client.write(cmd, 'ascii');
}


function doSetTimeout(j)
{

	setTimeout(function(){

					console.log(j);
					if(on)
					{
						iMaticOn(j);
					}
					else
					{
						iMaticOff(j);
					}

				},(j*100)/250
					);
}

var on = true;
var speed = 1;
var iterator = 0;
function infiniteLoop()
{

	setTimeout(function(){
			console.log(on);
			for(var j = 1; j < 3; j++)
			{
				doSetTimeout(j);
				
			}

			if(on)
			{
				on = false;
			}
			else
			{
				on = true;
			}
			speed = speed + .04;

			if(iterator < 20)
			{
			infiniteLoop();

			}
			iterator++;
	},250)

}
infiniteLoop();
// for(var i = 0; i < 50; i++)
// {

// 	iMaticOn(1);
// }
