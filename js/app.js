class Player {
    constructor(name) {
        this.name = name;
    }

    makeMove() {
    }
}

class ComputerPlayer extends Player {
    constructor() {
        super("Computer");
    }

    makeMove(spaces) {
        const available = Array.from(spaces.children).filter(space => !space.classList.contains('box-filled-1') && !space.classList.contains('box-filled-2'));
        if (available.length > 0) {
            const move = available[Math.floor(Math.random() * available.length)];
            move.click();
        }
    }
}

class Game {
    constructor(vsComputer = false) {
        this.vsComputer = vsComputer;
        this.player1 = new Player(document.getElementById('player-1-name').value || "Player 1");
        this.player2 = vsComputer ? new ComputerPlayer() : new Player(document.getElementById('player-2-name').value || "Player 2");
        this.currentPlayer = this.player1;
        this.board = document.getElementById('board');
        this.finish = document.getElementById('finish');
        this.spaces = document.querySelector('ul.boxes');
    }

    startGame() {
        this.currentPlayer = this.player1;
        this.renderBoard();
    }

    renderBoard() {
        this.spaces.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const li = document.createElement('li');
            li.className = 'box';
            this.spaces.appendChild(li);
        }
    }

    handleMouseOver(e) {
        if (e.target.classList.contains('box') && !e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
            e.target.style.backgroundImage = this.currentPlayer === this.player1 ? 'url(img/o.svg)' : 'url(img/x.svg)';
        }
    }

    handleMouseOut(e) {
        if (e.target.classList.contains('box')) {
            e.target.style.backgroundImage = '';
        }
    }

    handleClick(e) {
        if (!e.target.classList.contains('box') || e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
            return;
        }

        e.target.classList.add(this.currentPlayer === this.player1 ? 'box-filled-1' : 'box-filled-2');

        if (this.checkWin()) {
            this.endGame(`${this.currentPlayer.name} wins!`);
        } else if (this.checkDraw()) {
            this.endGame("It's a draw!");
        } else {
            this.switchPlayer();

            if (this.vsComputer && this.currentPlayer instanceof ComputerPlayer) {
                setTimeout(() => this.currentPlayer.makeMove(this.spaces), 500);
            }
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    checkWin() {
        return false;
    }

    checkDraw() {
        return Array.from(this.spaces.children).every(space => space.classList.contains('box-filled-1') || space.classList.contains('box-filled-2'));
    }

    endGame(message) {
        this.finish.style.display = 'block';
        this.finish.querySelector('.message').textContent = message;
        this.board.style.display = 'none';
    }
}
