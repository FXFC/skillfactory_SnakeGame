//создаем поле для игры
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const field = new Image();
field.src = "field.png";

const food = new Image();
food.src = "food.png";

//в качестве единицы измерение для координат задаем одну клетку (размер 37пкс)
let box = 37;

//задаем очки

let score = 0;

let highestScore = 0;
    if (localStorage.getItem("bestScore")) {
    	highestScore = localStorage.getItem("bestScore");
    }

//задаем рандомное появление еды    

let berry = {
	x: Math.floor((Math.random() * 20)) * box,
	y: Math.floor((Math.random() * 20)) * box
};

//создаем змейку

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 9 * box
};


//навешиваем обработчик на нажатие стрелок
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode === 37 && dir != "right") {
       dir = "left";
	} else if(event.keyCode === 38 && dir != "down") {
       dir = "up";
	} else if(event.keyCode === 39 && dir != "left") {
       dir = "right";
	} else if(event.keyCode === 40 && dir != "up") {
       dir = "down";
	}
}

//создаем функцию конца игры при поедании змейкой хвоста

function eatTail(head, arr) {
   for (let i = 0; i < arr.length; i++) {
   	   if (head.x === arr[i].x && head.y === arr[i].y) {
   	   	clearInterval(game);
   	   }
   }
}


//отрисовка игры
function drawGame() {
	ctx.drawImage(field, 0, 0);

	ctx.drawImage(food, berry.x, berry.y);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = "green";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}
   
   ctx.fillStyle = "white";
	ctx.font = "30px Bruno Ace SC";
	ctx.fillText("Score: ", 0, box * 22);

	ctx.fillStyle = "white";
	ctx.font = "30px Bruno Ace SC";
	ctx.fillText(score, box * 5, box * 22);

	ctx.fillStyle = "white";
	ctx.font = "30px Bruno Ace SC";
	ctx.fillText("Highest score: ", box * 9, box * 22);

	ctx.fillStyle = "white";
	ctx.font = "30px Bruno Ace SC";
	ctx.fillText(highestScore, box * 18, box * 22);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

//процесс появления еды в новом месте и увеличения очков
	if (snakeX == berry.x && snakeY == berry.y) {
		   score++;
         berry = {
			x: Math.floor((Math.random() * 20)) * box,
	      y: Math.floor((Math.random() * 20)) * box
		};
         
	} else {
		snake.pop();
	}

//остановка игры при уходе змейки за пределы поля
    if (snakeX < 0 || snakeX > (box * 20) || snakeY < 0 || snakeY > (box * 18)) {
    	clearInterval(game);
    }	

//отрисовка передвижения змейки
	if (dir === "left") snakeX -= box;
	if (dir === "right") snakeX += box;
	if (dir === "up") snakeY -= box;
	if (dir === "down") snakeY += box;

//прирастание змейки
	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);

//запись самого большоего результата в память	

	if (score > highestScore) {
		localStorage.setItem("bestScore", score);
	}

} 

let game = setInterval(drawGame, 100);



