var car, speed, wall, weight;
var wallImage, damage, resetImage;
var gamestate , PLAY, END, reset, rating;
PLAY = 0;
END = 1;
rating = "-";
function preload()
{
  wallImage = loadImage("wall.png");
  resetImage = loadImage("restart.png")
}
function setup() 
{
  createCanvas(1600,400);
  reset = createSprite(620, 200);
  reset.addImage(resetImage);
  weight = Math.round(random(400, 1500));
  speed = Math.round(random(55, 90));
  car = createSprite(50, 200, 50, 50);
  car.x = 50;
  car.velocityX = speed;
  car.shapeColor = "white";
  gamestate = PLAY;
  wall = createSprite(1500, 200, 60, window.height/2);
  wall.addImage(wallImage);
}

function draw() 
{
  background(0);
  if (gamestate == PLAY)
  {
    car.shapeColor = "white";
    car.velocityX = speed;
    reset.visible = false;
    if (wall.x - car.x < (car.width + wall.width)/2)
    {
      car.velocityX = 0;
      gamestate = END;
    } 
  }
  if (gamestate == END)
  {
    reset.visible = true;
    if (mousePressedOver(reset))
    {
      speed = Math.round(random(55, 90));
      weight = Math.round(random(400, 1500));
      gamestate = PLAY;
      car.x = 50;
      car.shapeColor = "white";
    }
    damage = Math.round((0.5 * weight * speed ** 2) /22500);
    if (damage < 100)
    {
      car.shapeColor =  "green";
      rating = "A";
    }
    else if (damage > 100 && damage <= 180)
    {
      car.shapeColor = "yellow";
      rating = "B";
    }
    else if (damage > 180)
    {
      car.shapeColor = "red";
      rating = "C";
    }   
  }
  drawSprites();
  stroke("white");
  fill("yellow");
  text("SPEED: " + speed + " km/h", 350, 380);
  text("WEIGHT: " + weight + " kgs", 470, 380);
  if (gamestate === END)
  {
    stroke("white");
    fill("yellow");
    text("THE DAMAGE WAS: " + damage, 600, 380);
    text("RATING: " + rating, 770, 380);
    //text("RERUN TEST", 600, 200);
  }
}