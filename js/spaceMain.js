function gameLoop(){
	requestAnimationFrame(gameLoop);
	displayBackground();
	
	state();

	renderer.render(stage);
}

function setup() {	
  ship = new Sprite(resources["images/ship.png"].texture);
	ship.rect = new Graphics();
	ship.rect.lineStyle(0, 0x0000FF, 1);
	ship.rect.drawRect(0, 0, 130, 49);
	ship.shield = new Graphics();
	ship.shield.lineStyle(2, 0x0000FF, 1);
	ship.shield.drawEllipse(-10, 0, 90,45);
	
  background10 = new Sprite(resources["images/background10.png"].texture);
	background11 = new Sprite(resources["images/background11.png"].texture);
  background20 = new Sprite(resources["images/background20.png"].texture);
	background21 = new Sprite(resources["images/background21.png"].texture);
	
	renderer = autoDetectRenderer(1000, 600,{backgroundColor : 0x1099bb});
	renderer.view.style.border = "1px dashed black";
	renderer.backgroundColor = 0x000000;
	
	window.addEventListener("mousedown", eventListener, false);
	window.addEventListener("keydown", eventListener, false);
	
	document.getElementsByTagName("main")[0].appendChild(renderer.view);

	stage = new Container();
	stage.addChild(background10);
	stage.addChild(background11);
	stage.addChild(background20);
	stage.addChild(background21);

	gameScene = new Container();
	gameScene.tabExplosions = [];
	stage.addChild(gameScene);

	gameOverScene = new Container();
	stage.addChild(gameOverScene);
	
	gameScene.visible = false;
	gameScene.addChild(ship.rect);
	gameScene.addChild(ship.shield);
	
	shipContainer = new Container();
	gameScene.addChild(shipContainer);
	shipContainer.addChild(ship);
	
	fillExplosionArray();
	gameScene.tabExplosions.push(createNewExplosionMovie());
	createHealthBar();
	//createScoreBar();
	createSpeedBar();
	createAmmoBar();
	createWaveBar();
	createSoldiersDestroyBar();
	createProtectionBar();
	createWageUpMessage();
	createBossMessage();
	createEndMessage();
	addKeyPress();
	addStartMessages();
	state = function(){};
	gameLoop();
}

function init() {
	PIXI.loader
  .add([
    "images/ship.png",
    "images/background10.png",
    "images/background11.png",
    "images/background20.png",
    "images/background21.png",
    "images/shootShip.png",
    "images/shootEnnemy.png",
    "images/shipEnnemy1.png",
    "images/shipEnnemy2.png",
    "images/shipEnnemy3.png",
    "images/shipEnnemy4.png",
    "images/shipEnnemy5.png",
    "images/shipEnnemy6.png",
    "images/shipEnnemy7.png",
    "images/shipEnnemy8.png",
    "images/shipEnnemy9.png",
    "images/shipEnnemy10.png",
		"images/bonusHealth.png",
		"images/bonusAmmo.png",
		"images/bonusProtection.png",
		"images/explosion/1.png",
		"images/explosion/2.png",
		"images/explosion/3.png",
		"images/explosion/4.png",
		"images/explosion/5.png",
		"images/explosion/6.png",
		"images/explosion/7.png",
		"images/explosion/8.png",
		"images/explosion/9.png",
		"images/explosion/10.png",
		"images/explosion/11.png",
		"images/explosion/12.png",
		"images/explosion/13.png",
		"images/explosion/14.png",
		"images/explosion/15.png",
		"images/explosion/16.png",
		"images/explosion/17.png",
		"images/explosion/18.png",
		"images/explosion/19.png",
		"images/explosion/20.png",
		"images/boss1.png",
		"images/boss2.png",
		"images/boss3.png",
		"images/boss4.png",
		"images/boss5.png",
		"images/boss6.png",
		"images/boss7.png",
		"images/boss8.png",
		"images/boss9.png",
		"images/boss10.png"
  ])
  .load(setup);
}
window.onload = init;