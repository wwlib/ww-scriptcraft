console.log('loading mqtt.js');

var mqtt = require('sc-mqtt');
var client = mqtt.client('tcp://test.mosquitto.org:1883','TestClient'); // default is localhost 1883
var mqtt_topic = 'jmgx/all';
client.connect();

var message_obj = {
  event: 'scriptcraftMqttReady'
}
var message_obj_str = JSON.stringify(message_obj);
client.publish(mqtt_topic,  // topic
               message_obj_str, // payload
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
  var block = event.block;
  var message_obj = {
    event: 'blockBreak',
    player: event.player.name,
    data: {
      blocktype: block.type,
      location: {x:block.getX(),y:block.getY(),z:block.getZ()}
    }
  }
  var message_obj_str = JSON.stringify(message_obj);
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
  console.log('mqtt.js: event.playerJoin', event.player);
  var player_name = event.player.name;
  var message_obj = {
    event: 'playerJoin',
    player: player_name
  }
  var message_obj_str = JSON.stringify(message_obj);
  client.publish(mqtt_topic,  // topic
                 message_obj_str, // payload
                 1,            // QoS (1 is send at least once)
                 true );
});

events.playerQuit( function( event ) {
  console.log('mqtt.js: event.playerQuit', event.player);
  var player_name = event.player.name;
  var message_obj = {
    event: 'playerQuit',
    player: player_name
  }
  var message_obj_str = JSON.stringify(message_obj);
  client.publish(mqtt_topic,  // topic
                 message_obj_str, // payload
                 1,            // QoS (1 is send at least once)
                 true );
});

// events.playerDeath( function( event ) {
//   console.log('playerDeath:' + event.entity);
//   var message_obj = {
//     event: 'playerDeath',
//     entity: event.entity
//   }
//   var message_obj_str = JSON.stringify(message_obj);
//   client.publish(mqtt_topic,  // topic
//                  message_obj_str, // payload
//                  1,            // QoS (1 is send at least once)
//                  true );
// });

function onPlayerInteractEntity(event) {
    var message_obj = {
      event: 'playerInteractEntity',
      player: event.player.name,
      clickedEntity: event.clickedEntity
    }
    var message_obj_str = JSON.stringify(message_obj);
    client.publish(mqtt_topic,  // topic
                   message_obj_str, // payload
                   1,            // QoS (1 is send at least once)
                   true );
}
events.playerInteractEntity(onPlayerInteractEntity);

function onPlayerEggThrow(event) {
    var message_obj = {
      event: 'playerEggThrow',
      player: event.player.name
    }
    var message_obj_str = JSON.stringify(message_obj);
    client.publish(mqtt_topic,  // topic
                   message_obj_str, // payload
                   1,            // QoS (1 is send at least once)
                   true );
}
events.playerEggThrow(onPlayerEggThrow);


function onPlayerBedEnter(event) {
    var message_obj = {
      event: 'playerBedEnter',
      player: event.player.name
    }
    var message_obj_str = JSON.stringify(message_obj);
    client.publish(mqtt_topic,  // topic
                   message_obj_str, // payload
                   1,            // QoS (1 is send at least once)
                   true );
}
events.playerBedEnter(onPlayerBedEnter);

function onPlayerBedLeave(event) {
    var message_obj = {
      event: 'playerBedLeave',
      player: event.player.name
    }
    var message_obj_str = JSON.stringify(message_obj);
    client.publish(mqtt_topic,  // topic
                   message_obj_str, // payload
                   1,            // QoS (1 is send at least once)
                   true );
}
events.playerBedLeave(onPlayerBedLeave);


function onPlayerFish(event) {
    var message_obj = {
      event: 'playerFish',
      player: event.player.name
    }
    var message_obj_str = JSON.stringify(message_obj);
    client.publish(mqtt_topic,  // topic
                   message_obj_str, // payload
                   1,            // QoS (1 is send at least once)
                   true );
}
events.playerFish(onPlayerFish);

function onCraftItem(event) {
    var message_obj = {
      event: 'craftItem',
      transaction: event.transaction
    }
    var message_obj_str = JSON.stringify(message_obj);
    client.publish(mqtt_topic,  // topic
                   message_obj_str, // payload
                   1,            // QoS (1 is send at least once)
                   true );
}
events.craftItem(onCraftItem);
