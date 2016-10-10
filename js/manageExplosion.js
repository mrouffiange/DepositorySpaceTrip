var textureExplosionArray = [], explosionImages = ["images/explosion/1.png","images/explosion/2.png","images/explosion/3.png","images/explosion/4.png","images/explosion/5.png","images/explosion/6.png","images/explosion/7.png","images/explosion/8.png","images/explosion/9.png","images/explosion/10.png","images/explosion/11.png","images/explosion/12.png","images/explosion/13.png","images/explosion/14.png","images/explosion/15.png","images/explosion/16.png","images/explosion/17.png","images/explosion/18.png","images/explosion/19.png","images/explosion/20.png"];

function fillExplosionArray(){
	
	for(var i = 0; i < explosionImages.length; i++)
	{
		 var texture;
		 texture = new Sprite(resources[explosionImages[i]].texture);
		 texture.time = 15;
		 textureExplosionArray.push(texture);
	}
}

function ExplosionMovie(){
	
	this.mc = new PIXI.extras.MovieClip(textureExplosionArray);
	this.mc.loop = false;
	
	this.containerExplosion = new Container();
	this.containerExplosion.visible = false;
	this.containerExplosion.addChild(this.mc);
	gameScene.addChild(this.containerExplosion);
}

function createNewExplosionMovie(){
	return elmt = new ExplosionMovie();
}

function explode(elmt, x, y){
	gameScene.removeChild(elmt.containerExplosion);
	gameScene.addChild(elmt.containerExplosion);
	elmt.containerExplosion.visible = true;
	elmt.containerExplosion.x = x;
	elmt.containerExplosion.y = y;
	elmt.mc.gotoAndPlay(0);
}