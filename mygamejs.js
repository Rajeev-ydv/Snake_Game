		var mycanvas = document.getElementById("myCanvas");
		var ccontext = mycanvas.getContext("2d");

		food = [];
		food.radius = 5;
		food.x = Math.floor(Math.random()*(myCanvas.width - food.radius));
		food.y = Math.floor(Math.random()*(myCanvas.height - food.radius));

		var snakeSize = 1;
		var snakeBlockWidth = 10;
		var snakeBlockHeight = 10;
		var snakeDir = "left";
		var snakePos = [];
		var snakeHead =	[];
		snakeHead.x = mycanvas.width/2;
		snakeHead.y = mycanvas.height/2;
		snakePos.push(snakeHead);

		var score = 0;

		var collision = false;
		
		

		document.addEventListener("keydown", keyDownListener, false);

		function keyDownListener(e)
		{
			if(e.keyCode == 39 && snakeDir!="left")
			{
				snakeDir = "right";
			}
			else if(e.keyCode == 37 && snakeDir!="right")
			{
				snakeDir =  "left";
			}
			else if(e.keyCode == 38 && snakeDir!="down")
			{
				snakeDir = "up";
			}
			else if(e.keyCode == 40 && snakeDir!="up")
			{
				snakeDir = "down";
			}
		}

		function drawCircle()
		{
			ccontext.beginPath();
			ccontext.arc(food.x, food.y, food.radius, 0, Math.PI*2, true);
			ccontext.fillStyle="#FF0000";
			ccontext.fill();
			ccontext.closePath();
		}

		function drawSnake()
		{
			ccontext.beginPath();
			snakePos.forEach(function(position){
				ccontext.rect(position.x, position.y, snakeBlockWidth, snakeBlockHeight);
			});
			ccontext.fillStyle="#0000ff";
			ccontext.fill();
			ccontext.closePath();
		}
		
		function moveSnake()
		{
			var temp = snakePos[0];
			var newhead = [];
			if(snakeDir=="left")
			{
				newhead.x = temp.x - snakeBlockWidth/2;
				newhead.y = temp.y;
			}
			else if(snakeDir=="up")
			{
				newhead.x = temp.x;
				newhead.y = temp.y - snakeBlockHeight/2;
			}
			else if(snakeDir=="right")
			{
				newhead.x = temp.x  + snakeBlockWidth/2;
				newhead.y = temp.y;
			}
			else if(snakeDir=="down")
			{
				newhead.x = temp.x;
				newhead.y = temp.y + snakeBlockHeight/2;
			}
			
			snakePos.unshift(newhead);
			var distance = Math.sqrt(Math.pow(snakePos[0].x-food.x, 2) + Math.pow(snakePos[0].y-food.y, 2)); 
			if(distance <= 5)
			{
				console.log("collision detected")
				collision = true;
				score++;
				snakeSize++;
			}
			else
				snakePos.pop();
		}

		function detectCollision()
		{
			for(var i=1;i<snakePos.length;i++)
			{
				temp = snakePos[i];
				if(temp.x==snakePos[0].x && temp.y==snakePos[0].y)
				{
					
					alert("Refresh The Page to start");
					window.location = 'mygame.html'
				}
			}
			if(snakePos[0].x<0)
				snakePos[0].x=mycanvas.width;
			if(snakePos[0].y<0)
				snakePos[0].y=mycanvas.height;
			if(snakePos[0].x>mycanvas.width)
				snakePos[0].x=0;
			if(snakePos[0].y>mycanvas.height)
				snakePos[0].y=0;
			drawSnake();
		}
	
		function printScore()
		{
			ccontext.font = "20px Verdana";
			ccontext.fillStyle = "#651FFF";
			ccontext.fillText("Score: "+score, 10, 20);
		}

		function draw()
		{
			ccontext.clearRect(0, 0, mycanvas.width, mycanvas.height);
			drawCircle();
			 drawSnake();
			 moveSnake();
			 detectCollision();
			 printScore();

			 if(collision==true)
			 {
				 food.x = Math.floor(Math.random()*(mycanvas.width-food.radius));
				 food.y = Math.floor(Math.random()*(mycanvas.height-food.radius));
				 drawCircle();
				 collision = false;
			 }
		}

		setInterval(draw, 50);
