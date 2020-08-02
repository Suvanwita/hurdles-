class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
 

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      gameState=1;
    }

   
  }

 


  play(){
    form.hide();
    Player.getPlayerInfo();
   
   car1 = createSprite(100,200,20,20);
   car1.addImage("car1",car1Img);
   car2 = createSprite(300,200,20,20);
   car2.addImage("car2",car2Img);
   car3 = createSprite(500,200,20,20);
   car3.addImage("car3",car3Img);
   car4 = createSprite(700,200,20,20);
   car4.addImage("car4",car1Img);
   cars = [car1, car2, car3, car4];
 

   

    
    if(allPlayers !== undefined){
      background("cyan");
      image(trackImg,-displayWidth*4,0,displayWidth*5,displayHeight);
      var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 80;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in y direction
        y = y + 150;
        //use data form the database to display the cars in x direction
        x = displayWidth - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyDown(UP_ARROW) && player.index !== null && gameState===1){
      player.distance +=10
      player.update();
    }
   
    if(player.distance>4110){
       gameState=2;
       game.update(2);
    }

    drawSprites();
  }

  end(){
    console.log("game ended");
   
    text("Game Ended",camera.position.x,displayHeight/2);
  }
}
