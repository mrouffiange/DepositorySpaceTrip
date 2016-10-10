function removeMessageWageUp(){
	gameScene.removeChild(messageWageUp);
	IDWageUp = 0;
}

function createHealthBar(){
	
	message = new Text(
		"LIVE",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 35;
	message.y = 2;

	gameScene.addChild(message);
	
	//Create the health bar
	healthBar = new Container();
	healthBar.position.set(75, 6)
	gameScene.addChild(healthBar);

	//Create the black background rectangle
	innerBar = new Graphics();
	innerBar.beginFill(0x555555);
	innerBar.drawRect(0, 0, WIDTH_HEALTHBAR_SHIP, 8);
	innerBar.endFill();
	healthBar.addChild(innerBar);

	//Create the front red rectangle
	outerBar = new Graphics();
	outerBar.beginFill(0xFF3300);
	outerBar.drawRect(0, 0, WIDTH_HEALTHBAR_SHIP, 8);
	outerBar.endFill();
	healthBar.addChild(outerBar);

	healthBar.outer = outerBar;
}

function createHealthSoldierEnnemyBar(width){
	//Create the health bar
	var healthBarSoldier = new Container();
	healthBarSoldier.position.set(0, 0)

	//Create the black background rectangle
	var innerBarSoldier = new Graphics();
	innerBarSoldier.beginFill(0x555555);
	innerBarSoldier.drawRect(0, 0, width, 8);
	innerBarSoldier.endFill();
	healthBarSoldier.addChild(innerBarSoldier);

	//Create the front red rectangle
	var outerBarSoldier = new Graphics();
	outerBarSoldier.beginFill(0xFF3300);
	outerBarSoldier.drawRect(0, 0, width, 8);
	outerBarSoldier.endFill();
	healthBarSoldier.addChild(outerBarSoldier);

	healthBarSoldier.outer = outerBarSoldier;
	
	return healthBarSoldier;
}

/*function createScoreBar(){
	message = new Text(
		"SCORE",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 230;
	message.y = 2;

	gameScene.addChild(message);
	
	messageScore = new Text(
		"",
		{font: "12px Futura", fill: "white"}
	);

	messageScore.x = 280;
	messageScore.y = 2;

	gameScene.addChild(messageScore);
}*/

function createSpeedBar(){
	message = new Text(
		"SPEED",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 230;
	message.y = 2;

	gameScene.addChild(message);
	
	messageSpeed = new Text(
		"",
		{font: "12px Futura", fill: "white"}
	);

	messageSpeed.x = 280;
	messageSpeed.y = 2;

	gameScene.addChild(messageSpeed);
}

function createAmmoBar(){
	message = new Text(
		"AMMO",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 330;
	message.y = 2;

	gameScene.addChild(message);
	
	messageAmmo = new Text(
		"",
		{font: "12px Futura", fill: "white"}
	);

	messageAmmo.x = 380;
	messageAmmo.y = 2;

	gameScene.addChild(messageAmmo);
}

function createWaveBar(){
	message = new Text(
		"VAGUE",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 430;
	message.y = 2;

	gameScene.addChild(message);
	
	messageWave = new Text(
		"",
		{font: "12px Futura", fill: "white"}
	);

	messageWave.x = 480;
	messageWave.y = 2;

	gameScene.addChild(messageWave);
}

function createSoldiersDestroyBar(){
	message = new Text(
		"VAISSEAUX DETRUITS ",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 530;
	message.y = 2;

	gameScene.addChild(message);
	
	messageSoldiersDestroy = new Text(
		"",
		{font: "12px Futura", fill: "white"}
	);

	messageSoldiersDestroy.x = 660;
	messageSoldiersDestroy.y = 2;

	gameScene.addChild(messageSoldiersDestroy);
}

function createProtectionBar(){
	message = new Text(
		"PROTECTION",
		{font: "12px Futura", fill: "white"}
	);

	message.x = 710;
	message.y = 2;

	gameScene.addChild(message);
	
	messageProtection = new Text(
		"",
		{font: "12px Futura", fill: "white"}
	);

	messageProtection.x = 790;
	messageProtection.y = 2;

	gameScene.addChild(messageProtection);
}
function createWageUpMessage(){
	messageWageUp = new Text(
		"VAGUE SUIVANTE !",
	{font: "42px Futura", fill: "white"}
	);

	messageWageUp.x = renderer.width/2 - messageWageUp.width/2;
	messageWageUp.y = renderer.height/2 - messageWageUp.height/2;	
}

function createBossMessage(){
	messageBoss = new Text(
		"",
	{font: "50px Futura", fill: "white"}
	);

	messageBoss.x = 0;
	messageBoss.y = 50;	
}

function createEndMessage(){
	messageFin = new Text(
		"PERDU",
		{font: "64px Futura", fill: "white"}
	);

	messageFin.x = renderer.width/2 - messageFin.width/2;
	messageFin.y = renderer.height/2 - messageFin.height/2;
}

function addStartMessages(){
	var y = 65;
	
	message = new Text(
		"! Space Trip !",
		{font: "80px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 150;
	message = new Text(
		"Faire monter le vaiseau : flèche du haut ou Z",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Faire descendre le vaiseau : flèche du bas ou S",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Stabiliser le vaiseau : flèche gauche ou Q",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Tirer : Clique gauche ou L",
		{font: "32px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
	
	y += 35;
	message = new Text(
		"Activer bouclier : Clique molette ou M",
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
	
	y += 120;
	message = new Text(
		"Appuyez sur espace pour commencer !",
		{font: "45px Futura", fill: "white"}
	);
	message.x = renderer.width/2 - message.width/2;
	message.y = y;
	gameOverScene.addChild(message);
}