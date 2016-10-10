function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

function manageCollisions(){
	soldierEnnemyCollisions();
	shootsEnnemyCollisions();
	bonusCollisions();
	if(bossWave)
		bossEnnemyCollisions();
}

function soldierEnnemyCollisions(){
	soldierEnnemy1Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy2Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy3Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy4Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy5Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy6Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy7Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy8Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy9Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
	soldierEnnemy10Array.forEach(function(soldier){manageEnnemyCollisions(soldier)});
}

function manageEnnemyCollisions(soldier){
	if(soldier.active)
	{
		for(var iShoot = 0; iShoot < shootsArray.length; iShoot++)
		{
			for(var iRect = 0; iRect < soldier.rectArray.length; iRect++)
			{
				if(hitTestRectangle(soldier.rectArray[iRect], shootsArray[iShoot]))
					break;
			}
			
			if(iRect < soldier.rectArray.length)
			{
				soldier.health -= damage;
				removeShootChild(shootsArray[iShoot]);
				if(soldier.health <= 0)
				{
					explode(gameScene.tabExplosions[0], soldier.container.x - soldier.sprite.width/2, soldier.container.y - soldier.sprite.height/2);
					//score++;
					nbSoldiersDestroy++;
					break;
				}
				else
				{
					var widthBar = (soldier.health / soldier.healthMax) * soldierEnnemyHealthBarArray[soldier.type];
					soldier.healthBar.width = parseInt(widthBar);
				}
			}
			else if(shootsArray[iShoot].y > renderer.height || shootsArray[iShoot].y < 0 || shootsArray[iShoot].x > renderer.width)
			{
				removeShootChild(shootsArray[iShoot]);
			}
		}

		if(soldier.health <= 0)
		{
			removeSoldierEnnemyChild(soldier);
			soldierEnnemyNumberOfArray[soldier.type]--;
		}
		else 
		{
			for(var iRect = 0; iRect < soldier.rectArray.length; iRect++)
			{
				if(hitTestRectangle(soldier.rectArray[iRect], ship.rect))
					break;
			}
			if(iRect < soldier.rectArray.length) 
			{
				explode(gameScene.tabExplosions[0], soldier.container.x - soldier.sprite.width/2, soldier.container.y - soldier.sprite.height/2);
				soldier.health = 0;
				if(!ship.shield.visible)
					health -= soldier.damage;
				removeSoldierEnnemyChild(soldier);
				nbSoldiersDestroy++;
				soldierEnnemyNumberOfArray[soldier.type]--;
			}
		}
	}
}

function shootsEnnemyCollisions(){
	shootsEnnemyArray.forEach(function (shootEnnemy) 
	{
		if(hitTestRectangle(shootEnnemy, ship.rect))
		{
			if(!ship.shield.visible)
				health -= shootEnnemy.damage;
			removeShootEnnemyChild(shootEnnemy);
		}
	});
}

function bonusCollisions(){
	bonusArray.forEach(function (bonus) 
	{
		if(hitTestRectangle(ship.rect, bonus.effect.sprite))
		{
			switch(bonus.type)
			{
				case 0 :
					if(health + bonus.effect.health < 128)
					{health += bonus.effect.health;}
					else
					{health = 128;}
					break;
				case 1 :
					if(ammo + bonus.effect.ammo < 9999)
					{ammo += bonus.effect.ammo;}
					else
					{ammo = 9999;}
					break;
				case 2 :
					protection += bonus.effect.time;
					break;
			}
			removeBonusChild(bonus);
		}
	});
}

function bossEnnemyCollisions(){
	
	for(var iShoot = 0; iShoot < shootsArray.length; iShoot++)
	{
		for(var iRect = 0; iRect < bossEnnemy.rectArray.length; iRect++)
		{
			if(hitTestRectangle(bossEnnemy.rectArray[iRect], shootsArray[iShoot]))
				break;
		}
		
		if(iRect < bossEnnemy.rectArray.length)
		{
			if(!bossEnnemy.shield.visible)
				bossEnnemy.health -= damage;
			
			removeShootChild(shootsArray[iShoot]);
			if(bossEnnemy.health <= 0)
			{
				explode(gameScene.tabExplosions[0], bossEnnemy.container.x - bossEnnemy.sprite.width/2, bossEnnemy.container.y - bossEnnemy.sprite.height/2);
				//score++;
				nbSoldiersDestroy++;
				break;
			}
			else
			{
				var widthBar = (bossEnnemy.health / bossEnnemy.healthMax) * bossEnnemyHealthBarArray[bossEnnemy.type];
				bossEnnemy.healthBar.width = parseInt(widthBar);
			}
		}
		else if(shootsArray[iShoot].y > renderer.height || shootsArray[iShoot].y < 0 || shootsArray[iShoot].x > renderer.width)
		{
			removeShootChild(shootsArray[iShoot]);
		}
	}

	if(bossEnnemy.health <= 0)
	{
		removeBossEnnemy();
		bossEndWave = true;
	}
}