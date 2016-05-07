console.log('loading mqtt.js');

var mqtt = require('sc-mqtt');
var client = mqtt.client(); // default is localhost 1883
client.connect();

client.publish('minecraft',  // topic
               'ready', // payload
               1,            // QoS (1 is send at least once)
               true );       // broker should retain message

// events.on('block.BlockBreakEvent', function (listener, event){
//   console.log('mqtt.js: sending minecraft/blockbreak');
//   client.publish('minecraft',  // topic
//                  'blockbreak', // payload
//                  1,            // QoS (1 is send at least once)
//                  true );       // broker should retain message
// });

// events.blockDestroy( function( evt, cancel ) {
//   console.log('mqtt.js: events.blockDestroy');
//   echo(evt.player, evt.player.name + ' broke a block!');
// } );

events.blockBreak( function( event ) {
  console.log('mqtt.js: blockBreak');
  console.log(event.player,  'You broke a block!' );

  client.publish('minecraft',  // topic
                 'blockBreak', // payload
                 1,            // QoS (1 is send at least once)
                 true );
});

events.playerJoin( function( event ) {
  console.log('mqtt.js: events.playerJoin', event.player);
  console.log( event.player, 'Welcome to the server!' );
  client.publish('minecraft',  // topic
                 'playerJoin', // payload
                 1,            // QoS (1 is send at least once)
                 true );
});
