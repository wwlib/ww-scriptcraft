console.log('loading finPlugin.js');
console.log(events);
//console.log(events.on);

function myBlockDestroyHook( event ){
  var breaker = event.player;
  console.log(breaker);
  console.log('Yo, you broke a block');

  ////
  //// Teleport
  ////
  // var location = event.player.location;
  // var loc_y = location.y;
  // console.log(loc_y);
  // loc_y += 4;
  // location.y = loc_y;
  // event.player.teleport(location);

  // var velocity = event.player.getVelocity();
  // velocity.y = 100;
  // event.player.setVelocity(velocity);
  updateScore(event.player.name, 1);
  event.player.sendMessage(event.player.name  + " broke a block");
}
// events.blockDestroy( myBlockDestroyHook );

events.blockBreak(myBlockDestroyHook);

for (var event in events) {
  console.log(event);
}

function onPlayerInteractEntity(event) {
  // console.log('onPlayerInteractEntity');
  // console.log(event.player);
  event.player.sendMessage(event.player.name  + " interacted with an entity");
}

events.playerInteractEntity(onPlayerInteractEntity);


//// Drone Stuff
var Drone = require('drone');

//// MyScraper

function myskyscraper( floors ) {
  var i ;
  if ( typeof floors == 'undefined' ) {
    floors = 10;
  }
  // bookmark the drone's position so it can return there later
  this.chkpt('myskyscraper');
  for ( i = 0; i < floors; i++ ) {
    this
      .box(45,20,1,20)
      .up()
      .box0(blocks.glass_pane,20,3,20)
      .up(3);
  }
  // return the drone to where it started
  this.move('myskyscraper');
};
Drone.extend( myskyscraper );

//// NoScraper

function noscraper( floors ) {
  var i ;
  if ( typeof floors == 'undefined' ) {
    floors = 10;
  }
  // bookmark the drone's position so it can return there later
  this.chkpt('noscraper');
  for ( i = 0; i < floors; i++ ) {
    this
      .box(0,20,1,20)
      .up()
      // .box0(0,20,3,20)
      // .up(3);
  }
  // return the drone to where it started
  this.move('noscraper');
};
Drone.extend( noscraper );


////Scoring

var utils = require('utils');
var scores = {};
var names = {};

function onPlayerJoin(event) {
  var name = event.player.name;

  if (!names[name]) {
    names[name] = event.player;
  }

  event.player.sendMessage("Active players:");
  for (var name in names) {
    event.player.sendMessage(name);
  }
}

events.playerJoin(onPlayerJoin);

function onPlayerEggThrow(event) {
  console.log(" baby birds");
  event.player.sendMessage(event.player.name + " threw an egg");
  updateScore(event.player.name, 10);
}
events.playerEggThrow(onPlayerEggThrow)

/*
  changes score by diff e.g. to add 6 to the player's current score
  updateScore('walter',6); // walter's new score = 5 + 6 = 11.
*/
function updateScore(name, diff){
  if (scores[name]) {
    scores[name] += diff;
  } else {
    scores[name] = diff;
  }
};

exports.updateScore = updateScore;

exports.getScore = function(name){
  return scores[name];
};

function showScores(player) {
  console.log(scores);
  for (var name in scores) {
    console.log(name + ": " + scores[name]);
    if (player) {
      player.sendMessage(name + ": " + scores[name]);
    }
  }
}
 exports.showScores = showScores;

exports.greet = function( player ) {
    echo( player, 'Hi ' + player.name);
}


//// events

/*
[19:38:13 INFO]: [scriptcraft] on
[19:38:13 INFO]: [scriptcraft] weatherChange
[19:38:13 INFO]: [scriptcraft] lightningStrike
[19:38:13 INFO]: [scriptcraft] thunderChange
[19:38:13 INFO]: [scriptcraft] vehicleMove
[19:38:13 INFO]: [scriptcraft] vehicleDestroy
[19:38:13 INFO]: [scriptcraft] vehicleExit
[19:38:13 INFO]: [scriptcraft] vehicleEntityCollision
[19:38:13 INFO]: [scriptcraft] vehicleBlockCollision
[19:38:13 INFO]: [scriptcraft] vehicleEnter
[19:38:13 INFO]: [scriptcraft] vehicleDamage
[19:38:13 INFO]: [scriptcraft] vehicleUpdate
[19:38:13 INFO]: [scriptcraft] vehicleCreate
[19:38:13 INFO]: [scriptcraft] enchantItem
[19:38:13 INFO]: [scriptcraft] prepareItemEnchant
[19:38:13 INFO]: [scriptcraft] playerInteractEntity
[19:38:13 INFO]: [scriptcraft] playerEggThrow
[19:38:13 INFO]: [scriptcraft] playerUnleashEntity
[19:38:13 INFO]: [scriptcraft] playerInventory
[19:38:13 INFO]: [scriptcraft] playerLevelChange
[19:38:13 INFO]: [scriptcraft] playerPortal
[19:38:13 INFO]: [scriptcraft] playerItemConsume
[19:38:13 INFO]: [scriptcraft] playerTeleport
[19:38:13 INFO]: [scriptcraft] playerBedEnter
[19:38:13 INFO]: [scriptcraft] playerUnregisterChannel
[19:38:13 INFO]: [scriptcraft] playerArmorStandManipulate
[19:38:13 INFO]: [scriptcraft] playerChat
[19:38:13 INFO]: [scriptcraft] playerShearEntity
[19:38:13 INFO]: [scriptcraft] playerItemDamage
[19:38:13 INFO]: [scriptcraft] asyncPlayerChat
[19:38:13 INFO]: [scriptcraft] playerDropItem
[19:38:13 INFO]: [scriptcraft] playerRegisterChannel
[19:38:13 INFO]: [scriptcraft] playerMove
[19:38:13 INFO]: [scriptcraft] playerItemBreak
[19:38:13 INFO]: [scriptcraft] playerBucketEmpty
[19:38:13 INFO]: [scriptcraft] playerStatisticIncrement
[19:38:13 INFO]: [scriptcraft] playerToggleFlight
[19:38:13 INFO]: [scriptcraft] playerItemHeld
[19:38:13 INFO]: [scriptcraft] playerAchievementAwarded
[19:38:13 INFO]: [scriptcraft] playerToggleSneak
[19:38:13 INFO]: [scriptcraft] playerExpChange
[19:38:13 INFO]: [scriptcraft] playerResourcePackStatus
[19:38:13 INFO]: [scriptcraft] playerPreLogin
[19:38:13 INFO]: [scriptcraft] playerJoin
[19:38:13 INFO]: [scriptcraft] playerAnimation
[19:38:13 INFO]: [scriptcraft] playerEditBook
[19:38:13 INFO]: [scriptcraft] playerPickupItem
[19:38:13 INFO]: [scriptcraft] playerInteractAtEntity
[19:38:13 INFO]: [scriptcraft] playerChangedWorld
[19:38:13 INFO]: [scriptcraft] playerFish
[19:38:13 INFO]: [scriptcraft] playerChatTabComplete
[19:38:13 INFO]: [scriptcraft] playerRespawn
[19:38:13 INFO]: [scriptcraft] playerBedLeave
[19:38:13 INFO]: [scriptcraft] asyncPlayerPreLogin
[19:38:13 INFO]: [scriptcraft] playerInteract
[19:38:13 INFO]: [scriptcraft] playerBucketFill
[19:38:13 INFO]: [scriptcraft] playerVelocity
[19:38:13 INFO]: [scriptcraft] playerQuit
[19:38:13 INFO]: [scriptcraft] playerLogin
[19:38:13 INFO]: [scriptcraft] playerSwapHandItems
[19:38:13 INFO]: [scriptcraft] playerKick
[19:38:13 INFO]: [scriptcraft] playerToggleSprint
[19:38:13 INFO]: [scriptcraft] playerCommandPreprocess
[19:38:13 INFO]: [scriptcraft] playerGameModeChange
[19:38:13 INFO]: [scriptcraft] furnaceSmelt
[19:38:13 INFO]: [scriptcraft] prepareAnvil
[19:38:13 INFO]: [scriptcraft] inventoryDrag
[19:38:13 INFO]: [scriptcraft] craftItem
[19:38:13 INFO]: [scriptcraft] furnaceBurn
[19:38:13 INFO]: [scriptcraft] inventoryOpen
[19:38:13 INFO]: [scriptcraft] inventoryPickupItem
[19:38:13 INFO]: [scriptcraft] inventoryMoveItem
[19:38:13 INFO]: [scriptcraft] inventoryClick
[19:38:13 INFO]: [scriptcraft] inventoryClose
[19:38:13 INFO]: [scriptcraft] inventoryCreative
[19:38:13 INFO]: [scriptcraft] inventory
[19:38:13 INFO]: [scriptcraft] prepareItemCraft
[19:38:13 INFO]: [scriptcraft] furnaceExtract
[19:38:13 INFO]: [scriptcraft] brew
[19:38:13 INFO]: [scriptcraft] serverCommand
[19:38:13 INFO]: [scriptcraft] serverListPing
[19:38:13 INFO]: [scriptcraft] serviceRegister
[19:38:13 INFO]: [scriptcraft] pluginDisable
[19:38:13 INFO]: [scriptcraft] remoteServerCommand
[19:38:13 INFO]: [scriptcraft] mapInitialize
[19:38:13 INFO]: [scriptcraft] serviceUnregister
[19:38:13 INFO]: [scriptcraft] pluginEnable
[19:38:13 INFO]: [scriptcraft] villagerAcquireTrade
[19:38:13 INFO]: [scriptcraft] playerDeath
[19:38:13 INFO]: [scriptcraft] entityCreatePortal
[19:38:13 INFO]: [scriptcraft] entityCombust
[19:38:13 INFO]: [scriptcraft] sheepDyeWool
[19:38:13 INFO]: [scriptcraft] expBottle
[19:38:13 INFO]: [scriptcraft] entityTame
[19:38:13 INFO]: [scriptcraft] projectileLaunch
[19:38:13 INFO]: [scriptcraft] entityDamage
[19:38:13 INFO]: [scriptcraft] itemSpawn
[19:38:13 INFO]: [scriptcraft] projectileHit
[19:38:13 INFO]: [scriptcraft] foodLevelChange
[19:38:13 INFO]: [scriptcraft] itemDespawn
[19:38:13 INFO]: [scriptcraft] villagerReplenishTrade
[19:38:13 INFO]: [scriptcraft] entityPortalEnter
[19:38:13 INFO]: [scriptcraft] entityPortal
[19:38:13 INFO]: [scriptcraft] entityTarget
[19:38:13 INFO]: [scriptcraft] entityDeath
[19:38:13 INFO]: [scriptcraft] entitySpawn
[19:38:13 INFO]: [scriptcraft] sheepRegrowWool
[19:38:13 INFO]: [scriptcraft] entityShootBow
[19:38:13 INFO]: [scriptcraft] creeperPower
[19:38:13 INFO]: [scriptcraft] entityCombustByBlock
[19:38:13 INFO]: [scriptcraft] entityBreakDoor
[19:38:13 INFO]: [scriptcraft] entityDamageByEntity
[19:38:13 INFO]: [scriptcraft] entityUnleash
[19:38:13 INFO]: [scriptcraft] entityExplode
[19:38:14 INFO]: [scriptcraft] entityInteract
[19:38:14 INFO]: [scriptcraft] entityToggleGlide
[19:38:14 INFO]: [scriptcraft] explosionPrime
[19:38:14 INFO]: [scriptcraft] horseJump
[19:38:14 INFO]: [scriptcraft] creatureSpawn
[19:38:14 INFO]: [scriptcraft] entityCombustByEntity
[19:38:14 INFO]: [scriptcraft] entityDamageByBlock
[19:38:14 INFO]: [scriptcraft] entityTargetLivingEntity
[19:38:14 INFO]: [scriptcraft] entityTeleport
[19:38:14 INFO]: [scriptcraft] playerLeashEntity
[19:38:14 INFO]: [scriptcraft] spawnerSpawn
[19:38:14 INFO]: [scriptcraft] itemMerge
[19:38:14 INFO]: [scriptcraft] slimeSplit
[19:38:14 INFO]: [scriptcraft] pigZap
[19:38:14 INFO]: [scriptcraft] fireworkExplode
[19:38:14 INFO]: [scriptcraft] potionSplash
[19:38:14 INFO]: [scriptcraft] entityChangeBlock
[19:38:14 INFO]: [scriptcraft] entityPortalExit
[19:38:14 INFO]: [scriptcraft] entityRegainHealth
[19:38:14 INFO]: [scriptcraft] entityBlockForm
[19:38:14 INFO]: [scriptcraft] blockSpread
[19:38:14 INFO]: [scriptcraft] blockMultiPlace
[19:38:14 INFO]: [scriptcraft] blockExplode
[19:38:14 INFO]: [scriptcraft] notePlay
[19:38:14 INFO]: [scriptcraft] cauldronLevelChange
[19:38:14 INFO]: [scriptcraft] blockFade
[19:38:14 INFO]: [scriptcraft] blockPlace
[19:38:14 INFO]: [scriptcraft] blockPhysics
[19:38:14 INFO]: [scriptcraft] blockIgnite
[19:38:14 INFO]: [scriptcraft] blockBreak
[19:38:14 INFO]: [scriptcraft] blockBurn
[19:38:14 INFO]: [scriptcraft] blockFromTo
[19:38:14 INFO]: [scriptcraft] blockRedstone
[19:38:14 INFO]: [scriptcraft] blockPistonRetract
[19:38:14 INFO]: [scriptcraft] blockDispense
[19:38:14 INFO]: [scriptcraft] signChange
[19:38:14 INFO]: [scriptcraft] blockPistonExtend
[19:38:14 INFO]: [scriptcraft] blockCanBuild
[19:38:14 INFO]: [scriptcraft] blockGrow
[19:38:14 INFO]: [scriptcraft] leavesDecay
[19:38:14 INFO]: [scriptcraft] blockExp
[19:38:14 INFO]: [scriptcraft] blockForm
[19:38:14 INFO]: [scriptcraft] blockDamage
[19:38:14 INFO]: [scriptcraft] hangingPlace
[19:38:14 INFO]: [scriptcraft] hangingBreakByEntity
[19:38:14 INFO]: [scriptcraft] hangingBreak
[19:38:14 INFO]: [scriptcraft] structureGrow
[19:38:14 INFO]: [scriptcraft] spawnChange
[19:38:14 INFO]: [scriptcraft] worldLoad
[19:38:14 INFO]: [scriptcraft] worldInit
[19:38:14 INFO]: [scriptcraft] worldUnload
[19:38:14 INFO]: [scriptcraft] worldSave
[19:38:14 INFO]: [scriptcraft] chunkUnload
[19:38:14 INFO]: [scriptcraft] chunkPopulate
[19:38:14 INFO]: [scriptcraft] portalCreate
[19:38:14 INFO]: [scriptcraft] chunkLoad
*/
