//DECLARATION---------------------------------------------------------------------------------------------------------------------------------

/*function Ennemy(type){
	this.healthMax = soldierEnnemyHealthArray[type];
	this.health = soldierEnnemyHealthArray[type];
	this.speed = soldierEnnemySpeedArray[type];
	this.damage = soldierEnnemyDamageArray[type];
	this.type = type;
}*/

function SoldierEnnemy(type){
	this.rectArray = [];
	this.container = new Container();
	this.variationHelthBar = 0;
	
	switch(type)
	{
		case 0 :
			this.sprite = new Sprite(resources["images/shipEnnemy1.png"].texture);
			this.sprite.position.set(0, 0);
			this.container.addChild(this.sprite);
			this.container.position.set(renderer.width,randomInt(20, renderer.height-this.container.height-12));
			this.variationHelthBar = 20;
			
			var rect = new Graphics();
			rect.lineStyle(0, 0x0000FF, 1);
			rect.drawRect(0, 0, 80, 75);
			rect.position.set(this.container.x+35,this.container.y+3);
			this.rectArray.push(rect);
			break;
		case 1 :
			this.sprite = new Sprite(resources["images/shipEnnemy2.png"].texture);
			this.sprite.position.set(0, 0);
			this.container.addChild(this.sprite);
			this.container.position.set(renderer.width,randomInt(20, renderer.height-this.container.height-12));
			
			var rect = new Graphics();
			rect.lineStyle(0, 0x0000FF, 1);
			rect.drawRect(0, 0, 140, 40);
			rect.position.set(this.container.x+5,this.container.y+35);
			this.rectArray.push(rect);
			rect = new Graphics();
			rect.lineStyle(0, 0x0000FF, 1);
			rect.drawRect(0, 0, 40, 80);
			rect.position.set(this.container.x+55,this.container.y+15);
			this.rectArray.push(rect);
			rect = new Graphics();
			rect.lineStyle(0, 0x0000FF, 1);
			rect.drawRect(0, 0, 40, 106);
			rect.position.set(this.container.x+95,this.container.y+3);
			this.rectArray.push(rect);
			break;
	}
	this.rectArray.forEach(function (rect){gameScene.addChild(rect);});
	
	this.healthBar = createHealthSoldierEnnemyBar(soldierEnnemyHealthBarArray[type]);
	this.healthBar.position.set(this.sprite.width/2 - soldierEnnemyHealthBarArray[type]/2 + this.variationHelthBar, this.sprite.height);
	this.container.addChild(this.healthBar);
	
	this.healthMax = soldierEnnemyHealthArray[type];
	this.health = soldierEnnemyHealthArray[type];
	this.speed = soldierEnnemySpeedArray[type];
	this.damage = soldierEnnemyDamageArray[type];
	this.type = type;
	this.active = true;
	gameScene.addChild(this.container);
}

function BossEnnemy(type){
	this.rectArray = [];
	this.weaponsArray = [];
	this.container = new Container();
	this.container.position.set(renderer.width, renderer.height / 2);
	
	switch(type)
	{
		case 0 :
			this.sprite = new Sprite(resources["images/boss1.png"].texture);
			this.container.y -= this.sprite.height/2;
			this.timeWeaponsReload = 1000;
			this.timeShieldReload = 5000;
			this.timeShieldActive = 5000;
			this.speedUp = -1;
			this.speedDown = 1;
			
			var rect = new Graphics();
			rect.lineStyle(0, 0x0000FF, 1);
			rect.drawRect(0, 0, 190, 75);
			rect.position.set(this.container.x+30,this.container.y+42);
			this.rectArray.push(rect);
			
			rect = new Graphics();
			rect.lineStyle(0, 0x0000FF, 1);
			rect.drawRect(0, 0, 50, 155);
			rect.position.set(this.container.x+190,this.container.y+2);
			this.rectArray.push(rect);
			
			var weapon = {};
			weapon.x = this.sprite.width/2;
			weapon.y = this.sprite.height/2 - 25;
			weapon.damage = 16;
			this.weaponsArray.push(weapon);
			
			weapon = {};
			weapon.x = this.sprite.width/2;
			weapon.y = this.sprite.height/2 + 25;
			weapon.damage = 16;
			this.weaponsArray.push(weapon);
			break;
	}
	this.rectArray.forEach(function (rect){gameScene.addChild(rect);});
	this.weaponsArray.forEach(function (weapon){weapon.reload = true;});
	
	this.shield = new Graphics();
	this.shield.lineStyle(2, 0xFF0000, 1);
	this.shield.drawEllipse(this.container.x + this.sprite.width/2, this.container.y + this.sprite.height/2, this.sprite.width/2 + 10, this.sprite.height/2 + 10);
	this.shield.reload = false;
	//this.shield.IDVisible = 0;
	//this.shield.IDReload = 0;
	gameScene.addChild(this.shield);
	
	this.healthMax = bossEnnemyHealthArray[type];
	this.health = bossEnnemyHealthArray[type];
	this.speed = bossEnnemySpeedArray[type];
	this.damage = bossEnnemyDamageArray[type];
	this.type = type;
	this.vy = 0;
	
	this.sprite.position.set(0, 0);
	this.healthBar = createHealthSoldierEnnemyBar(bossEnnemyHealthBarArray[type]);
	this.healthBar.position.set(this.sprite.width - bossEnnemyHealthBarArray[type], this.sprite.height);
	gameScene.addChild(this.container);
	this.container.addChild(this.sprite);
	this.container.addChild(this.healthBar);
}

function Bonus(){
	this.type = setTypeBonus();
	this.speed = randomInt(2, 6);
	switch(this.type)
	{
		case 0 :
			this.effect = new BonusHealth();
			break;
		case 1 :
			this.effect = new BonusAmmo();
			break;
		case 2 :
			this.effect = new BonusProtection();
			break;
	}
	this.effect.sprite.position.set(renderer.width + this.effect.sprite.width,randomInt(20, renderer.height-85));
	gameScene.addChild(this.effect.sprite);
}

function BonusHealth(){
	this.sprite = new Sprite(resources["images/bonusHealth.png"].texture);
	this.health = randomInt(20, 128);
}

function BonusAmmo(){
	this.sprite = new Sprite(resources["images/bonusAmmo.png"].texture);
	this.ammo = randomInt(80, 300);
}

function BonusProtection(){
	this.sprite = new Sprite(resources["images/bonusProtection.png"].texture);
	this.time = randomInt(100, 500);
}

function setTypeBonus(){
	var random = randomInt(0, 9);
	if(random < 5)
	{return 1;}
	else if(random < 7)
	{return 0;}
	else
	{return 2;}
}

//SPAWN---------------------------------------------------------------------------------------------------------------------------------

function spawnSoldierEnnemy(){
	if(randomInt(0, soldierEnnemyRandomArray[0]) == 1 && soldierEnnemyNumberOfArray[0] < soldierEnnemyMaxArray[0])
	{
		var soldier = new SoldierEnnemy(0);
		soldierEnnemy1Array.push(soldier);
		soldierEnnemyNumberOfArray[0]++;
	}
	else if(wave > 10 && randomInt(0, soldierEnnemyRandomArray[1]) == 1 && soldierEnnemyNumberOfArray[1] < soldierEnnemyMaxArray[1])
	//if(randomInt(0, 2) == 1 && soldierEnnemyNumberOfArray[1] < 1)
	{
		var soldier = new SoldierEnnemy(1);
		soldierEnnemy2Array.push(soldier);
		soldierEnnemyNumberOfArray[1]++;
	}
	IDSpawn = 0;
}

function spawnBonus(){
	if(randomInt(0, randomBonus) == 1)
	//if(1)
	{
		var bonus = new Bonus();
		bonusArray.push(bonus);
		bonusByWave++;
	}
	IDBonus = 0;
}

function spawnBoss(){
	bossEnnemy = new BossEnnemy((wave/10) - 1);
}

function removeSoldierEnnemyChild(soldier){
	gameScene.removeChild(soldier.rect);
	soldier.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
	gameScene.removeChild(soldier.container);
	soldier.active = false;
}

function removeShootChild(shoot){
	gameScene.removeChild(shoot);
	var i = shootsArray.indexOf(shoot);
	if(i != -1) {
		shootsArray.splice(i, 1);
	}
}

function removeShootEnnemyChild(shootEnnemy){
	gameScene.removeChild(shootEnnemy);
	var i = shootsEnnemyArray.indexOf(shootEnnemy);
	if(i != -1) {
		shootsEnnemyArray.splice(i, 1);
	}
}

function removeBonusChild(bonus){
	gameScene.removeChild(bonus.effect.sprite);
	var i = bonusArray.indexOf(bonus);
	if(i != -1) {
		bonusArray.splice(i, 1);
	}
}

function removeBossEnnemy(){
	gameScene.removeChild(bossEnnemy.container);
	gameScene.removeChild(bossEnnemy.shield);
	bossEnnemy.rectArray.forEach(function (rect){gameScene.removeChild(rect);});
	bossEnnemy = {};
}

function manageEnnemyArray(){
	if(wave < 11)
	{
		if(soldierEnnemyNumberOfArray[0] == 0)
			soldierEnnemy1Array = [];
	}
	if(wave < 21)
	{
		if(soldierEnnemyNumberOfArray[1] == 0)
			soldierEnnemy2Array = [];
	}
	if(wave < 31)
	{
		if(soldierEnnemyNumberOfArray[2] == 0)
			soldierEnnemy3Array = [];
	}
	if(wave < 41)
	{
		if(soldierEnnemyNumberOfArray[3] == 0)
			soldierEnnemy4Array = [];
	}
	if(wave < 51)
	{
		if(soldierEnnemyNumberOfArray[4] == 0)
			soldierEnnemy5Array = [];
	}
	if(wave < 61)
	{
		if(soldierEnnemyNumberOfArray[5] == 0)
			soldierEnnemy6Array = [];
	}
	if(wave < 71)
	{
		if(soldierEnnemyNumberOfArray[6] == 0)
			soldierEnnemy7Array = [];
	}
	if(wave < 81)
	{
		if(soldierEnnemyNumberOfArray[7] == 0)
			soldierEnnemy8Array = [];
	}
	if(wave < 91)
	{
		if(soldierEnnemyNumberOfArray[8] == 0)
			soldierEnnemy9Array = [];
	}
	if(wave <= 100)
	{
		if(soldierEnnemyNumberOfArray[9] == 0)
			soldierEnnemy10Array = [];
	}
}