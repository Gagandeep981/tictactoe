class Game {
    constructor(vsComputer = false) {
        this.vsComputer = vsComputer;
        this.board = new Board();
        this.players = this.createPlayers();
        this.win = false;
        this.turns = 0;
        this._ready = false;
    }

    get activePlayer() {
        return this.players.find(player => player.active);
    }

    get ready() {
        return this._ready;
    }

    set ready(val) {
        this._ready = val;
    }

    createPlayers() {
        const player1Input = document.getElementById("player-1-name").value.trim();
        const player1Name = player1Input || "Player 1";
        const p1Active = Math.random() < 0.5;

        const player2 = this.vsComputer
            ? new Computer("Computer", "player2", "#3688C3", !p1Active)
            : new Player(
                document.getElementById("player-2-name").value.trim() || "Player 2",
                "player2",
                "#3688C3",
                !p1Active
            );

        return [
            new Player(player1Name, "player1", "#FFA000", p1Active),
            player2
        ];
    }

    playerTurn() {
        this.ready = true;

        this.players.forEach(player => {
            document.getElementById(player.id).classList.toggle('active', player.active);
        });

        if (this.activePlayer.name === 'Computer') {
            this.activePlayer.makeMove();
        }
    }

    switchPlayers() {
        this.players.forEach(player => player.active = !player.active);
    }

    gameOver(message, result) {
        const finish = document.getElementById('finish');
        const winnerTally = document.querySelector(`.${this.activePlayer.id}-wins span.win-num`);
        const board = document.getElementById('board');

        board.style.display = 'none';
        finish.classList.remove("screen-win-tie", "screen-win-one", "screen-win-two");

        const isDraw = result === 'draw';
        const screenStyle = isDraw 
            ? 'screen-win-tie' 
            : (this.activePlayer.id === 'player1' ? 'screen-win-one' : 'screen-win-two');
        
        finish.style.backgroundColor = isDraw ? '#54D17A' : this.activePlayer.color;
        finish.classList.add(screenStyle);
        finish.style.display = 'block';
        document.querySelector('p.message').textContent = message;

        if (!isDraw && winnerTally) {
            winnerTally.textContent = parseInt(winnerTally.textContent, 10) + 1;
        }
    }

    checkForDraw() {
        return !this.win && this.turns === 9;
    }

    checkForWinner(target) {
        const { x, y } = target;
        const { spaces } = this.board;
        const owner = target.owner;

        const isMatch = (a, b, c) => a === owner && b === owner && c === owner;

        // Vertical
        if (x <= 0 && isMatch(spaces[x][y].owner, spaces[x + 1][y].owner, spaces[x + 2][y].owner)) return true;

        // Horizontal
        if (y <= 0 && isMatch(spaces[x][y].owner, spaces[x][y + 1].owner, spaces[x][y + 2].owner)) return true;

        // Diagonal: top-left to bottom-right
        if (x === 0 && y === 0 && isMatch(spaces[0][0].owner, spaces[1][1].owner, spaces[2][2].owner)) return true;

        // Diagonal: top-right to bottom-left
        if (x === 0 && y === 2 && isMatch(spaces[0][2].owner, spaces[1][1].owner, spaces[2][0].owner)) return true;

        return false;
    }

    updateGameState(token, targetSpace) {
        this.turns++;
        targetSpace.mark(token);
        token.played = true;

        const isWin = this.checkForWinner(targetSpace);
        const isDraw = this.checkForDraw();

        if (isWin) {
            this.win = true;
            this.gameOver(`${this.activePlayer.name} wins!`, 'win');
        } else if (isDraw) {
            this.gameOver("It's a draw!", 'draw');
        } else {
            this.switchPlayers();
            this.playerTurn();
        }
    }

    isBoxFilled(el) {
        return el.classList.contains('box-filled-1') || el.classList.contains('box-filled-2');
    }

    getFillClass() {
        return this.activePlayer.id === 'player1' ? 'box-filled-1' : 'box-filled-2';
    }

    handleMouseOver(e) {
        if (!this.ready || !e.target.classList.contains('box') || this.isBoxFilled(e.target)) return;
        e.target.style.backgroundImage = `url(${this.activePlayer.activeToken.tokenPath})`;
    }

    handleMouseOut(e) {
        if (!this.ready || !e.target.classList.contains('box') || this.isBoxFilled(e.target)) return;
        e.target.style.backgroundImage = "";
    }

    handleClick(e) {
        if (!this.ready || !e.target.classList.contains('box') || this.isBoxFilled(e.target)) return;

        this.ready = false;
        const fillClass = this.getFillClass();
        e.target.classList.add(fillClass);

        const token = this.activePlayer.activeToken;
        const targetSpace = this.board.findSpace(e.target.id);

        this.updateGameState(token, targetSpace);
    }

    startGame() {
        this.board.renderHTMLBoard();

        const [p1, p2] = this.players;
        const p1Card = document.querySelector(".player1-name");
        const p2Card = document.querySelector(".player2-name");

        p1Card.textContent = p1.name;
        p1Card.style.color = p1.color;
        p2Card.textContent = p2.name;
        p2Card.style.color = p2.color;

        this.playerTurn();
    }
}
