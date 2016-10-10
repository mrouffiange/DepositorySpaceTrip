http://www.pronztube.com/video/37/business-parties-can-be-fun-too
var Container = PIXI.Container,
		autoDetectRenderer = PIXI.autoDetectRenderer,
		loader = PIXI.loader,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text,
		Graphics = PIXI.Graphics;
		
var escapeKey = keyboard(27),
		spaceBar = keyboard(32),
		left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);
			
var ship,
		background10,
		background11,
		background20,
		background21,
		healthBar,
		innerBar,
		outerBar,
		message,
		period,
		IDUp,
		IDDown,
		renderer,
		stage;
		

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

function displayBackground(){
	if(background10.position.x == 0)
	{background11.position.x = background10.width;}
	else if(background11.position.x == 0)
	{background10.position.x = background11.width;}

	if(background20.position.x == 0)
	{background21.position.x = background20.width;}
	else if(background21.position.x == 0)
	{background20.position.x = background21.width;}

	background10.position.x -= 4;
	background11.position.x -= 4;
	background20.position.x -= 8;
	background21.position.x -= 8;
}

function gameLoop(){
	requestAnimationFrame(gameLoop);
	
	state();

	renderer.render(stage);
}

function movementShip(){

	if(up.isDown)
	{
		if(IDUp == 0)
			if(IDDown != 0)
			{
				clearInterval(IDDown);
				period = 1000;
			}
			IDUp = setInterval(movementShipUp, period);
	}
	else if(down.isDown)
	{
		if(IDDown == 0)
		{
			if(IDUp != 0)
			{
				clearInterval(IDUp);
				period = 1000;
			}
			IDDown = setInterval(movementShipDown, period);
		}
	}
	
	if(ship.vy < 0)
	{
		if((ship.y + ship.vy) <= 55)
		{
			ship.y = 55;
			ship.vy = 0;
			if(IDUp != 0)
				clearInterval(IDUp);
		}
	}
	else if(ship.vy > 0)
	{
		if((ship.y + ship.vy) >= renderer.height - 45)
		{
			ship.y = renderer.height - 45;
			ship.vy = 0;
			if(IDDown != 0)
				clearInterval(IDDown);
		}
	}
	
	ship.y += ship.vy;
}

function movementShipUp() {
	if(ship.vy > -10)
	{
		ship.vy--;
		period-=10;
	}
	IDUp = 0;
}

function movementShipDown() {
	if(ship.vy < 10)
	{
		ship.vy++;
		period-=10;
	}
	IDDown = 0;
}

function play(){
	displayBackground();
	
	movementShip();
}

function setup() {	
  ship = new Sprite(resources["images/ship.png"].texture);
  background10 = new Sprite(resources["images/background10.png"].texture);
	background11 = new Sprite(resources["images/background11.png"].texture);
  background20 = new Sprite(resources["images/background20.png"].texture);
	background21 = new Sprite(resources["images/background21.png"].texture);
	
	renderer = autoDetectRenderer(1000, 600,{backgroundColor : 0x1099bb});
	renderer.view.style.border = "1px dashed black";
	renderer.backgroundColor = "#000000";
	
	document.getElementsByTagName("main")[0].appendChild(renderer.view);

	stage = new Container();
	
	gameScene = new Container();
	stage.addChild(gameScene);

	gameOverScene = new Container();
	stage.addChild(gameOverScene);
	
	gameScene.visible = false;
	
	gameScene.addChild(background10);
	gameScene.addChild(background11);
	gameScene.addChild(background20);
	gameScene.addChild(background21);
	gameScene.addChild(ship);
	
	ship.anchor.x = 0.5;
	ship.anchor.y = 0.5;
	ship.rotation = Math.PI /2;
	ship.position.set(100, renderer.height /2);
  ship.vy = 0;
	
	createHealthBar();
	addKeyPress();
	addStartMessages();
	state = function(){};
	gameLoop();
}

function addKeyPress(){
	left.press = function() {
		if(gameScene.visible)
		{
			if(ship.vy > 2)
			{
				ship.vy = 1;
			}
			else if(ship.vy < -2)
			{
				ship.vy = -1;
			}
			else
			{
				ship.vy = 0;
			}
		}
	};

	spaceBar.press = function() {
		if(gameOverScene.visible)
		{
			gameOverScene.visible = false;
			gameScene.visible = true;
			state = play;
			IDUp = 0;
			IDDown = 0;
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
}

function createHealthBar(){
	//Create the health bar
	healthBar = new Container();
	healthBar.position.set(50, 6)
	gameScene.addChild(healthBar);

	//Create the black background rectangle
	innerBar = new Graphics();
	innerBar.beginFill(0x555555);
	innerBar.drawRect(0, 0, 128, 8);
	innerBar.endFill();
	healthBar.addChild(innerBar);

	//Create the front red rectangle
	outerBar = new Graphics();
	outerBar.beginFill(0xFF3300);
	outerBar.drawRect(0, 0, 128, 8);
	outerBar.endFill();
	healthBar.addChild(outerBar);

	healthBar.outer = outerBar;
}

function addStartMessages(){
	var y = 75;
	
	message = new Text(
		"! Space Trip !",
		{font: "80px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 150;
	message = new Text(
		"Faire monter le vaiseau : flèche du haut",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Faire descendre le vaiseau : flèche du bas",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Stabilisé le vaiseau : flèche gauche",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Pause : escape",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 150;
	message = new Text(
		"Appuyez sur espace pour commencer !",
		{font: "45px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
}

function init() {
	PIXI.loader
  .add([
    "images/ship.png",
    "images/background10.png",
    "images/background11.png",
    "images/background20.png",
    "images/background21.png",
  ])
  .load(setup);
}
window.onload = init;