function displayBackground(){
	if(background10.position.x == 0)
	{background11.position.x = background10.width;}
	else if(background11.position.x == 0)
	{background10.position.x = background11.width;}

	if(background20.position.x == 0)
	{background21.position.x = background20.width;}
	else if(background21.position.x == 0)
	{background20.position.x = background21.width;}

	background10.position.x -= 0.5;
	background11.position.x -= 0.5;
	background20.position.x -= 8;
	background21.position.x -= 8;
}

function shipMovement(){
	if((up.isDown || zKey.isDown) && ship.vy > -10)
	{
		ship.vy -= 0.5;
	}
	else if((down.isDown || sKey.isDown) && ship.vy < 10)
	{
		ship.vy += 0.5;
	}
	else if((up.isUp || zKey.isDown) && ship.vy < -1)
	{
		if(ship.vy > -2)
		{ship.vy += 0.05;}
		else if(ship.vy > -4)
		{ship.vy += 0.1;}
		else if(ship.vy > -6)
		{ship.vy += 0.2;}
		else
		{ship.vy += 0.5;}
	}
	else if((down.isUp || sKey.isDown)  & ship.vy > 1)
	{
		if(ship.vy < 2)
		{ship.vy += 0.05;}
		else if(ship.vy < 4)
		{ship.vy -= 0.1;}
		else if(ship.vy < 6)
		{ship.vy -= 0.2;}
		else
		{ship.vy -= 0.5;}
	}
	
	if(ship.vy < 0)
	{
		if((shipContainer.y + ship.vy) <= 18)
		{
			shipContainer.y = 18;
			ship.vy = 0;
		}
	}
	else if(ship.vy > 0)
	{
		if((shipContainer.y + ship.vy) >= renderer.height - ship.height - 5)
		{
			shipContainer.y = renderer.height - ship.height - 5;
			ship.vy = 0;
		}
	}
	
	shipContainer.y += ship.vy;
	ship.rect.position.set(shipContainer.x+15,shipContainer.y+12);
	ship.shield.position.set(shipContainer.x+shipContainer.width/2,shipContainer.y+shipContainer.height/2);
}

function objectsMovement(){
	soldierEnnemy1Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy2Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy3Array.forEach(function(soldier){movingEnnnemy(soldier)});  
	soldierEnnemy4Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy5Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy6Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy7Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy8Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy9Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	soldierEnnemy10Array.forEach(function(soldier){movingEnnnemy(soldier)}); 
	
	shootsArray.forEach(function (shoot) 
	{
		shoot.x+=10;
		shoot.y+=shoot.acceleration;
		
		if(shoot.y > renderer.height || shoot.y < 0 || shoot.x > renderer.width)
			removeShootChild(shoot);
	});
	
	shootsEnnemyArray.forEach(function (shootEnnemy) 
	{
		shootEnnemy.x-=10;
		
		if(shootEnnemy.x + shootEnnemy.width < renderer.x)
			removeShootEnnemyChild(shootEnnemy);
	});
	
	bonusArray.forEach(function (bonus) 
	{
		bonus.effect.sprite.x -= bonus.speed;
		
		if(bonus.x + bonus.width < 0 )
			removeBonusChild(bonus);
	});
	
	if(bossWave)
	{
		//if(bossEnnemy.container.y + bossEnnemy.vy >= renderer.y + 18 && bossEnnemy.container.y + bossEnnemy.container.height + bossEnnemy.vy <= renderer.height - 5)
		if(1)
		{
			bossEnnemy.container.y += bossEnnemy.vy;
			bossEnnemy.rectArray.forEach(function (rect){rect.y += bossEnnemy.vy;});
			bossEnnemy.shield.y += bossEnnemy.vy;
		}
	}
}

function movingEnnnemy(soldier){
	if(soldier.active)
	{
		soldier.container.x -= soldier.speed;
		//soldier.rect.position.set(soldier.container.x+35,soldier.container.y+3);
		soldier.rectArray.forEach(function (rect){rect.x -= soldier.speed;});
		if(soldier.container.x + soldier.sprite.width < 0 )
		{
			health -= soldier.damage;
			removeSoldierEnnemyChild(soldier);
			soldierEnnemyNumberOfArray[soldier.type]--;
		}
	}
}