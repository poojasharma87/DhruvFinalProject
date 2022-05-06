var PLAY =1
var END =0

var gameState=PLAY

function preload()
{
	capjump=loadAnimation('/assets/capjump_1.png','/assets/capjump_2.png','/assets/capjump_3.png','/assets/capjump_4.png','/assets/capjump_5.png')
	capwalk=loadAnimation('/assets/capwalk_1.png','/assets/capwalk_2.png','/assets/capwalk_3.png','/assets/capwalk_4.png','/assets/capwalk_5.png','/assets/capwalk_6.png','/assets/capwalk_7.png')
	cappunch=loadAnimation('/assets/cappunch_1.png','/assets/cappunch_2.png','/assets/cappunch_3.png','/assets/cappunch_4.png','/assets/cappunch_5.png','/assets/cappunch_6.png','/assets/cappunch_7.png','/assets/cappunch_8.png')
	coinmoving=loadAnimation('/assets/coin_1.png','/assets/coin_2.png','/assets/coin_3.png','/assets/coin_4.png','/assets/coin_5.png')
	backgroundImage=loadImage('/assets/bg.png')
	soldiermoving=loadAnimation('/assets/hs_1.png','/assets/hs_2.png','/assets/hs_3.png','/assets/hs_4.png')
	redskullfire=loadAnimation('/assets/rs_1.png','/assets/rs_2.png','/assets/rs_3.png','/assets/rs_4.png')
	redskullImage=loadImage('assets/rs.png')
	theendImage=loadImage('assets/THE END.png')
	capdamage=loadImage('assets/damage.png')
    bullet1=loadImage('assets/hsbullet.png')
	bullet2=loadImage('assets/rsbullet.png')
	
	capjump.looping=false
}   

function setup() {
	createCanvas(1400, 600);
	//Create the Bodies Here.
	bg= createSprite(900,300,2000,600);
	
	bg.addImage(backgroundImage);
	bg.velocityX=-2;
	bg.scale = 4.5;
	

	captainA = createSprite(100,380,20,50);
	
	captainA.addAnimation("walking", capwalk);
	captainA.addAnimation("punching", cappunch);
	captainA.addAnimation("jumping", capjump)
	captainA.scale = 0.25;
	
	
	
	invisibleGround = createSprite(700,590,1400,10);
	invisibleGround.visible = false;
	invisibleGround.velocityX=-2;
	
	obstaclesGroup = new Group();
	
	score = 0;

	

	


	
  
}


function draw() {
 
  background(0);
   //trex.debug = true;
   fill("white")
   
   text("Score: "+ score, 1200,50);
   
   if (gameState===PLAY){
	 score = score + Math.round(getFrameRate()/60);
     if (keyDown("z")){
		captainA.changeAnimation("jumping")
		captainA.velocityY = -12;
	 }
	 captainA.velocityY = captainA.velocityY + 0.8
	 if(keyWentDown("space"))  {
	   captainA.changeAnimation("punching")
	  
	 }
	 
  
	 if(keyWentUp("space"))  {
		captainA.changeAnimation("walking")
	  }
	 
   
	 if (invisibleGround.x < 0){
		invisibleGround.x = invisibleGround.width/2;
	}
	if (bg.x < 0){
		bg.x = bg.width/2;
	}
    captainA.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(captainA)){
        gameState = END;

    }
  }
  else if (gameState === END) {
	
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    captainA.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the trex animation
    captainA.addImage(capdamage);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
   // if(mousePressedOver(restart)) {
 //     reset();
 //   }
  }
  
  
  drawSprites();
 
}

function spawnObstacles() {
	if(frameCount % 200 === 0) {
	  var obstacle = createSprite(1400,400,50,40);
	  obstacle.addAnimation("moving",soldiermoving)
	  //obstacle.debug = true;
	  obstacle.velocityX = -4;
	  obstacle.scale=0.1;
	 // obstacle.lifetime=200
	  obstaclesGroup.add(obstacle)
	
	 
	}
}
	  function reset(){
		gameState = PLAY;
		gameOver.visible = false;
		restart.visible = false;
		
		obstaclesGroup.destroyEach();
		cloudsGroup.destroyEach();
		
		trex.changeAnimation("running",trex_running);
		
		if(localStorage["HighestScore"]<score){
		  localStorage["HighestScore"] = score;
		}
		console.log(localStorage["HighestScore"]);
		
		score = 0;
		
	  }
