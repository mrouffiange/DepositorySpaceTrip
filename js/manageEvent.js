var escapeKey = keyboard(27),
		spaceBar = keyboard(32),
		left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);
		qKey = keyboard(81);
		rKey = keyboard(82);
		sKey = keyboard(83);
		zKey = keyboard(90);
		
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function eventListener(evt){
	if(((evt.type = "keydown" && evt.keyCode == 76) || (evt.type == "mousedown" && evt.which == 1)) && (gameScene.visible && state == play && ammo > 0))
	{
		doAshoot()
	}
	else if(((evt.type = "keydown" && evt.keyCode == 77) || (evt.type == "mousedown" && evt.which == 2)) && (gameScene.visible && state == play && protection > 0))
	{
		toggleShield();
	}	
}

function doAshoot(){
	shoot = new Sprite(resources["images/shootShip.png"].texture);
	shoot.position.set(150,shipContainer.y + shipContainer.height/2);
	shoot.acceleration = ship.vy;
	shootsArray.push(shoot);
	ammo--;
	gameScene.addChild(shoot);
}

function toggleShield(){
	if(ship.shield.visible)
	{
		ship.shield.visible = false;
	}
	else
	{
		ship.shield.visible = true;
	}
}

function addKeyPress(){
	left.press = function() {
		if(gameScene.visible)
				ship.vy = 0;
	};
	
	qKey.press = function() {
		if(gameScene.visible)
				ship.vy = 0;
	};

	spaceBar.press = function() {
		if(gameOverScene.visible)
		{
			initializeVariableGame();
		}
	};

	escapeKey.press = function() {
		if(gameScene.visible && state == play)
		{
			state = function(){};
			message = new Text(
			"PAUSE",
			{font: "64px Futura", fill: "white"}
			);

			message.x = renderer.width/2 - message.width/2;
			message.y = renderer.height/2 - message.height/2;

			gameScene.addChild(message);
		}
		else if(gameScene.visible && state != play)
		{
			gameScene.removeChild(message);
			state = play;
		}
  };
	
	rKey.press = function() {
		if(gameScene.visible)
		{
			reloadGame();
		}
  };
}