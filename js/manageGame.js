function initializeVariableGame(){
	health = 128;
	ammo = 100;
	protection = 100;
	nbSoldiersMax = 5;
	randomBonus = 40;
	nbSoldiersDestroyStageUp = 3;
	nbSoldiersDestroyNext = nbSoldiersDestroyStageUp;
	wave = 1;
	damage = 1;
	
	initializeSoldierEnnemyHealth();
	initializeSoldierEnnemyDamage();
	initializeSoldierEnnemySpeed();
	initializeSoldierEnnemyHealthBar();
	initializeSoldierEnnemyRandomArray();
	initializeSoldierEnnemyMaxArray();
	initializeSoldierEnnemyNumberOfArray();
	
	initializeBossEnnemyHealth();
	initializeBossEnnemyDamage();
	initializeBossEnnemySpeed();
	initializeBossEnnemyHealthBar();
	initializeBossName();
	
	IDSpawn = 0;
	IDWageUp = 0;
	IDBonus = 0;
	IDBoss = 0;
	IDProtection = 0;
	numberOfSoldiers = 0;
	bonusByWave = 0;
	bonusByWaveMax = 0;
	nbSoldiersDestroy = 0;
	ship.vy = 0;
	waveType = 0;
	bossWave = false;
	//score = 0;
	
	//messageScore.text = score;
	messageSoldiersDestroy.text = nbSoldiersDestroy;
	messageSpeed.text = 0;
	messageAmmo.text = ammo;
	messageWave.text = wave;
	messageProtection.text = protection;
	
	shipContainer.position.set(30, renderer.height/2);
	ship.rect.position.set(shipContainer.x+15,shipContainer.y+12);
	ship.shield.position.set(shipContainer.x+shipContainer.width/2,shipContainer.y+shipContainer.height/2);
	ship.shield.visible = false;
	
	gameOverScene.visible = false;
	gameScene.visible = true;
	
	state = play;
}

function initializeSoldierEnnemyHealth(){
	soldierEnnemyHealthArray[0] = 1; //First soldier
	soldierEnnemyHealthArray[1] = 2; 
}

function initializeSoldierEnnemyDamage(){
	soldierEnnemyDamageArray[0] = 8; //First soldier
	soldierEnnemyDamageArray[1] = 16; 
}

function initializeSoldierEnnemySpeed(){
	soldierEnnemySpeedArray[0] = 3; //First soldier
	soldierEnnemySpeedArray[1] = 4; 
}

function initializeSoldierEnnemyHealthBar(){
	soldierEnnemyHealthBarArray[0] = 64; //First soldier
	soldierEnnemyHealthBarArray[1] = 120; 
}

function initializeSoldierEnnemyRandomArray(){
	soldierEnnemyRandomArray[0] = 45; //First soldier
	soldierEnnemyRandomArray[1] = 70; 
}

function initializeSoldierEnnemyMaxArray(){
	soldierEnnemyMaxArray[0] = 3;
	soldierEnnemyMaxArray[1] = 1;
}

function initializeSoldierEnnemyNumberOfArray(){
	for(var i = 0; i < 10; i++)
	{soldierEnnemyNumberOfArray[i] = 0;}
}

function initializeBossEnnemyHealth(){
	bossEnnemyHealthArray[0] = 10; //First boss
}

function initializeBossEnnemyDamage(){
	bossEnnemyDamageArray[0] = 16; //First boss
}

function initializeBossEnnemySpeed(){
	
}

function initializeBossEnnemyHealthBar(){
	bossEnnemyHealthBarArray[0] = 258; //First boss
}

function initializeBossName(){
	bossEnnemyNameArray[0] = "Le Black Pearl"; 
	bossEnnemyNameArray[1] = "L'UltraFighterJet"; 
	bossEnnemyNameArray[2] = "Le GreenForce 48B-X"; 
	bossEnnemyNameArray[3] = "Le FastViolet HILL"; 
	bossEnnemyNameArray[4] = "Le RED-5"; 
	bossEnnemyNameArray[5] = "Le ZSpaceJ-us"; 
	bossEnnemyNameArray[6] = "Le FAT-Blue SRIV"; 
	bossEnnemyNameArray[7] = "Le RD - Sprk VIII"; 
	bossEnnemyNameArray[8] = "Le T-Sharker 5512"; 
	bossEnnemyNameArray[9] = "Le !DELTA!"; 
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function healthUpdate(){
	if(health >= 0)
		healthBar.outer.width = health;
	
	if(health <= 0)
	{
		gameScene.addChild(messageFin);
		setTimeout(reloadGame, 3000);
	}
}

function reloadGame(){
	shootsArray.forEach(function (shoot) 
	{
		gameScene.removeChild(shoot);
	});
	shootsArray = [];
	
	shootsEnnemyArray.forEach(function (shootsEnnemy) 
	{
		gameScene.removeChild(shootsEnnemy);
	});
	shootsEnnemyArray = [];
	
	soldierEnnemy1Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy1Array = [];
	
	soldierEnnemy2Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy2Array = [];
	
	soldierEnnemy3Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy3Array = [];
	
	soldierEnnemy4Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy4Array = [];
	
	soldierEnnemy5Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy5Array = [];
	
	soldierEnnemy6Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy6Array = [];
	
	soldierEnnemy7Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy7Array = [];
	
	soldierEnnemy8Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy8Array = [];
	
	soldierEnnemy9Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy9Array = [];
	
	soldierEnnemy10Array.forEach(function (soldier) 
	{
		soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
		gameScene.removeChild(soldier.container);
	});
	soldierEnnemy10Array = [];
	
	bonusArray.forEach(function (bonus) 
	{
		gameScene.removeChild(bonus.effect.sprite);
	});
	bonusArray = [];
	
	if(health == 0 || state != play)
		gameScene.removeChild(message);
	
	if(bossWave)
		removeBossEnnemy();
	
	gameScene.removeChild(messageFin);
	
	gameOverScene.visible = true;
	gameScene.visible = false;
	state = function(){};
}

function manageWave(){
	if(nbSoldiersDestroy >= nbSoldiersDestroyStageUp)
	{
		if(wave%10 === 0 && !bossWave)
		{
			messageBoss.text = bossEnnemyNameArray[(wave/10) - 1];
			messageBoss.x = renderer.width/2 - messageBoss.width/2;
			gameScene.addChild(messageBoss);
			setTimeout(function(){gameScene.removeChild(messageBoss);IDWageUp = 0;}, 3000);
			bossWave = true;
			bossEndWave = false;
			spawnBoss();
			
			initializeSoldierEnnemyRandomArray();
			initializeSoldierEnnemyMaxArray();
		}
		else if(!bossWave || bossEndWave)
		{
			if(bossEndWave)
			{
				damage++;
				messageBoss.text = "Canon pricipal améliorer !";
				messageBoss.x = renderer.width/2 - messageBoss.width/2;
				gameScene.addChild(messageBoss);
				setTimeout(function(){gameScene.removeChild(messageBoss);IDWageUp = 0;}, 3000);
				bossWave = false;
				bossEndWave = false;
			}
			
			wave++;
			gameScene.addChild(messageWageUp);
			if(IDWageUp == 0)
				IDWageUp = setTimeout(removeMessageWageUp, 2000);
			
			if(wave%5 === 0 && wave%10 !== 0)
			{
				soldierEnnemyHealthArray[waveType]++;
				bonusByWaveMax++;
			}		
			
			if(wave-1%10 === 0)
			{
				soldierEnnemySpeedArray[waveType] += 0.5;
				waveType++;
			}
			else
			{
				soldierEnnemyMaxArray[waveType]++;
				soldierEnnemyDamageArray[waveType]++;
			}
			
		
			nbSoldiersDestroyNext ++;
			nbSoldiersDestroyStageUp += nbSoldiersDestroyNext;

			for(var iRandom; iRandom < soldierEnnemyRandomArray.length; iRandom++)
			{
				if(soldierEnnemyRandomArray[iRandom] > 10)
					soldierEnnemyRandomArray[iRandom]--;
			}				
			
			bonusByWave = 0;
		}	
	}
}

function manageShield(){
	if(ship.shield.visible)
	{
		if(protection == 0)
		{
			ship.shield.visible = false;
		}
		else
		{
			protection--;
		}
	}
}

function play(){
	if(!bossWave && (IDSpawn == 0 && numberOfSoldiers < nbSoldiersMax))
		IDSpawn = setTimeout(spawnSoldierEnnemy, 30);
	
	if(IDBonus == 0 && bonusByWave < bonusByWaveMax)
		IDBonus = setTimeout(spawnBonus, 400);
	
	if(bossWave)
		manageBoss();
	
	shipMovement();
	
	objectsMovement();
	
	manageCollisions();
	
	healthUpdate();
	
	manageWave();
	
	manageShield();
	
	manageEnnemyArray();
	
	speed = parseInt(ship.vy);
	messageSpeed.text = speed;
	//messageScore.text = score;
	messageAmmo.text = ammo;
	messageWave.text = wave;
	messageSoldiersDestroy.text = nbSoldiersDestroy;
	messageProtection.text = protection;
}