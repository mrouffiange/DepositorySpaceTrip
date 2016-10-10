function manageBoss(){
	if(renderer.width - bossEnnemy.sprite.width - 20 < bossEnnemy.container.x)
	{
		moveBossInX();
	}
	else
	{
		var noDanger = true;
		
		if(bossEnnemy.shield.reload)
				activateBossShield();
			
		if(!bossEnnemy.shield.visible && shootsArray.length > 0);
			noDanger = bossAvoidShoots();
		
		if(noDanger)
		{
			var weaponTarget = aimTarget();
			if(weaponTarget !== false)
			{
				bossShoot(weaponTarget);
			}
			else
			{
				moveBossToShip();			
			}
		}
	}
}

function moveBossInX(){
	bossEnnemy.container.x--;
	bossEnnemy.rectArray.forEach(function (rect){rect.x --;});
	bossEnnemy.shield.x--;
	if(!(renderer.width - bossEnnemy.sprite.width - 20 < bossEnnemy.container.x))
	{
		bossEnnemy.shield.visible = false;
		setTimeout(setShieldReloadToTrue, bossEnnemy.timeShieldReload);
	}
}

function setShieldVisibleToFalse(){
	bossEnnemy.shield.visible = false;
	bossEnnemy.timeShieldReload *= 1.5;
	setTimeout(setShieldReloadToTrue, bossEnnemy.timeShieldReload);
}

function setShieldReloadToTrue(){
	bossEnnemy.shield.reload = true;
}

function activateBossShield(){
	bossEnnemy.shield.visible = true;
	bossEnnemy.shield.reload = false;
	setTimeout(setShieldVisibleToFalse, bossEnnemy.timeShieldActive);
}

function aimTarget()
{
	for(var iWeapon = 0; iWeapon < bossEnnemy.weaponsArray.length; iWeapon++)
	{
		if(bossEnnemy.weaponsArray[iWeapon].reload &&
		   bossEnnemy.weaponsArray[iWeapon].y + bossEnnemy.container.y > ship.rect.y && 
		   bossEnnemy.weaponsArray[iWeapon].y + bossEnnemy.container.y < ship.rect.y + ship.rect.height)
			return iWeapon;
	}
	return false;
}

function freeWeapon()
{
	for(var iWeapon = 0; iWeapon < bossEnnemy.weaponsArray.length; iWeapon++)
	{
		if(bossEnnemy.weaponsArray[iWeapon].reload)
			return iWeapon;
	}
	return false;
}

function bossShoot(weaponTarget){
	bossEnnemy.vy = 0;
	bossEnnemy.weaponsArray[weaponTarget].reload = false;
	setTimeout(function(){setWeaponsReloadToFalse(weaponTarget);}, bossEnnemy.timeWeaponsReload);
	
	var shootEnnemy = new Sprite(resources["images/shootEnnemy.png"].texture);
	shootEnnemy.position.set(bossEnnemy.container.x + bossEnnemy.weaponsArray[weaponTarget].x, bossEnnemy.container.y + bossEnnemy.weaponsArray[weaponTarget].y);
	shootEnnemy.damage = bossEnnemy.weaponsArray[weaponTarget].damage;
	shootsEnnemyArray.push(shootEnnemy);
	gameScene.addChild(shootEnnemy);
}

function setWeaponsReloadToFalse(weaponTarget){
	bossEnnemy.weaponsArray[weaponTarget].reload = true;
}

function moveBossToShip(){
	var iWeapon = freeWeapon();
	if(iWeapon === false)
	{
		if(bossEnnemy.weaponsArray[0].y + bossEnnemy.container.y > ship.rect.y + ship.rect.height)
		{bossEnnemy.vy = bossEnnemy.speedUp;}
		else if(bossEnnemy.weaponsArray[bossEnnemy.weaponsArray.length-1].y + bossEnnemy.container.y < ship.rect.y)
		{bossEnnemy.vy = bossEnnemy.speedDown;}
		else
		{bossEnnemy.vy = 0;}
	}
	else
	{
		if(bossEnnemy.weaponsArray[iWeapon].y + bossEnnemy.container.y < ship.rect.y)
		{bossEnnemy.vy = bossEnnemy.speedDown;}
		else
		{bossEnnemy.vy = bossEnnemy.speedUp;}
	}
}

function bossAvoidShoots(){
	for(var iShoot = 0; iShoot < shootsArray.length; iShoot++)
	{
		for(var iRect = 0; iRect < bossEnnemy.rectArray.length; iRect++)
		{		
			if(bossEnnemy.rectArray[iRect].x < renderer.width)
			{
				var distance = (bossEnnemy.rectArray[iRect].x - (shootsArray[iShoot].x + shootsArray[iShoot].width)) / 10;
				var shootY = shootsArray[iShoot].y + (shootsArray[iShoot].acceleration * distance);
				
				if(shootY > bossEnnemy.rectArray[iRect].y - 3 && 
					 shootY < bossEnnemy.rectArray[iRect].y + bossEnnemy.rectArray[iRect].height + 3)
				{	
					if(bossEnnemy.rectArray[iRect].y + bossEnnemy.rectArray[iRect].height/2 < shootY)
					{bossEnnemy.vy = bossEnnemy.speedUp;}
					else
					{bossEnnemy.vy = bossEnnemy.speedDown;}
					return false;	 
				}	
			}
		}
	}
	return true;
}