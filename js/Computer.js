
class Computer extends Player {
    constructor(...args) {
        super(...args);
    }

    makeMove() {
        const availableSpaces = this.#getAvailableSpaces();
        if (availableSpaces.length === 0) return; // Safety check

        const randomIndex = Math.floor(Math.random() * availableSpaces.length);
        const selectedSpace = availableSpaces[randomIndex];
        selectedSpace.click(); // Triggers the same event as a human move
    }

    /**
     * Finds and returns an array of unfilled space DOM elements.
     * @returns {HTMLElement[]} Array of available space elements
     */
    #getAvailableSpaces() {
        const boardSpaces = document.querySelectorAll('ul.boxes > li');
        return Array.from(boardSpaces).filter(space =>
            !space.classList.contains('box-filled-1') &&
            !space.classList.contains('box-filled-2')
        );
    }
}
