console.log('loading mqtt.js');

var mqtt = require('sc-mqtt');
var client = mqtt.client('tcp://test.mosquitto.org:1883','TestClient'); // default is localhost 1883
var mqtt_topic = 'jmgx/all';
client.connect();

client.publish(mqtt_topic,  // topic
               'ready', // payload
               1,            // QoS (1 is send at least once)
               true );       // broker should retain message

// events.on('block.BlockBreakEvent', function (listener, event){
//   console.log('mqtt.js: sending minecraft/blockbreak');
//   client.publish(mqtt_topic,  // topic
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
  console.log(event.player);
  console.log('You broke a block!' );

  var block = event.block;
  console.log('Block:');
  console.log(block);

  var player_name = event.player.name;
  console.log("Player name:");
  console.log(player_name);

  var block_type = String(block.type);
  console.log("Block type:");
  console.log(block_type);

  console.log("Block Stringified");
  try {
    console.log(JSON.stringify(block));
  } catch (error) {
    console.log("Error: ");
    console.log(error);
  }

  for (var p in event) {
    console.log(p);
  }

  var message_obj = {
    event: 'blockBreak',
    player: player_name,
    data: {
      blocktype: block_type,
      location: {x:block.getX(),y:block.getY(),z:block.getZ()}
    }
  }

  console.log('Message Object:');
  console.log(message_obj);

  var message_obj_str = JSON.stringify(message_obj);
  console.log(message_obj_str);

  client.publish(mqtt_topic,  // topic
                 message_obj_str, // payload
                 1,            // QoS (1 is send at least once)
                 true );
});

events.blockPlace( function( event ) {
  var block = event.block;
  var player_name = event.player.name;
  var block_type = String(block.type);
  var message_obj = {
    event: 'blockPlace',
    player: player_name,
    data: {
      blocktype: block_type,
      location: {x:block.getX(),y:block.getY(),z:block.getZ()}
    }
  }

  var message_obj_str = JSON.stringify(message_obj);
  client.publish(mqtt_topic,  // topic
                 message_obj_str, // payload
                 1,            // QoS (1 is send at least once)
                 true );
});

events.playerJoin( function( event ) {
  console.log('mqtt.js: events.playerJoin', event.player);
  console.log( event.player, 'Welcome to the server!' );
  client.publish(mqtt_topic,  // topic
                 'playerJoin', // payload
                 1,            // QoS (1 is send at least once)
                 true );
});
