let nodeSize = 26;
let mapSize = 21;
let map = [];
let xMove = true;
let movesCount = 0;
let score;
let gameOver = false;

function setup() {
  createCanvas(mapSize * nodeSize, mapSize * nodeSize);
  
  for (var i = 0; i < mapSize; i++) {
  	map.push([]);
  	for (var j = 0; j < mapSize; j++) {
  		map[i].push(-1);
  	}
  }

  score = createElement('h4', (movesCount++) + ' moves');

  drawMap();
}

function drawMap() {
	fill('white');
	stroke('black');
    strokeWeight(1);

	for (var i = 0; i < mapSize; i++)
		for (var j = 0; j < mapSize; j++) {
            if (map[i][j] == -1) 
            	isOpen(i, j) ? fill(128, 255, 128) : fill('white');
            else
            	fill('white');

			rect(i * nodeSize, j * nodeSize, nodeSize, nodeSize);

			if (map[i][j] != -1)
				map[i][j] == 1 ? drawX(i, j) : drawO(i, j);
		}		
}

function drawX(x, y) {
	line(x * nodeSize + 4, y * nodeSize + 4, x * nodeSize + nodeSize - 4, y * nodeSize + nodeSize - 4);
	line(x * nodeSize + 4, y * nodeSize + nodeSize - 4, x * nodeSize + nodeSize - 4, y * nodeSize + 4);
}

function drawO(x, y) {
	//
	ellipse(x * nodeSize + nodeSize / 2, y * nodeSize + nodeSize / 2, nodeSize - 4, nodeSize - 4);
}

function mouseClicked() {
	if(!gameOver) {
		let i = Math.floor(mouseX / nodeSize);
		let j = Math.floor(mouseY / nodeSize);

	    if (map[i][j] == -1 && isOpen(i, j)) {
	    	map[i][j] = xMove ?  1 : 0;
	    	xMove = !xMove;

	    	score.remove();
	    	score = createElement('h4', (movesCount++) + ' moves');
	    	
	    	if (checkWinner(i, j, map[i][j])) {
	    		gameOver = true;

	    		let winner = 'X';
	    		if (xMove)
	    			winner = 'O';
	    	    createElement('h4', 'WINNER: ' + winner);
	    	}

	    	drawMap();
	    }
	}
}

function checkWinner(x, y, playerValue) {
	let count = 0;

    // vertical
	for (var i = y - 1; i > y - 5; i--)
		if (i >= 0 && i < mapSize) {
			if (map[x][i] == playerValue)
				count++;
			else
				break;
		}
	for (var i = y; i < y + 5; i++)
		if (i >= 0 && i < mapSize) {
			if (map[x][i] == playerValue)
				count++;
			else
				break;
		}
	
	if (count >= 5)
		return true;

    // horizontal
	count = 0; 
	for (var i = x - 1; i > x - 5; i--)
		if (i >= 0 && i < mapSize) {
			if (map[i][y] == playerValue)
				count++;
			else
				break;
		}
	for (var i = x; i < x + 5; i++)
		if (i >= 0 && i < mapSize) {
			if (map[i][y] == playerValue)
				count++;
			else
				break;
		}

	if (count >= 5)
		return true;

	// main diagonal
	count = 0; 
	for (var i = 1; i < 5; i++)
		if (x >= i && y >= i) {
			if (map[x - i][y - i] == playerValue)
				count++;
			else
				break;
		}	
	for (var i = 0; i < 4; i++)
		if (x + i < mapSize && y + i <= mapSize) {
			if (map[x + i][y + i] == playerValue)
				count++;
			else
				break;
		}

	if (count >= 5)
		return true;

	// anti diagonal
	count = 0; 
	for (var i = 1; i < 5; i++)
		if (x - i < mapSize && y >= i) {
			if (map[x + i][y - i] == playerValue)
				count++;
			else
				break;
		}		
	for (var i = 0; i < 4; i++)
		if (y - i < mapSize && x >= i) {
			if (map[x - i][y + i] == playerValue)
				count++;
			else
				break;
		}

	if (count >= 5)
		return true;

	return false;
}

function isOpen(x, y) {

	if (x == Math.floor(mapSize / 2) && y == Math.floor(mapSize / 2))
		return true;

	for (var i = x - 1; i <= x + 1; i ++)
		for (var j = y - 1; j <= y + 1; j++)
			if ((i != x || j != y) && i >= 0 && i < mapSize && j >= 0 && j < mapSize)
				if (map[i][j] != -1)
					return true;
	return false;
}