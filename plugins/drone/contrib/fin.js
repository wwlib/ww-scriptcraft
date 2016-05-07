'use strict';
/*global require */
var Drone = require('drone'),
    blocks = require('blocks');

console.log("Initializing finTower function");
/************************************************************************
### Drone.finTower() method

#### Example

```javascript
/js finTower()
```

***/
function finTower( ) {
  console.log('Executing finTower');
  echo( "Executing finTower function")
  this
    .chkpt('finTower')
    .up()
    .box( blocks.glass_pane ) // windows to left and right
    .right(4)
    .box( blocks.glass_pane )
    .move('finTower')
  ;
}

Drone.extend(finTower);
