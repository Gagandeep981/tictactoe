class Board {
    #rows;
    #cols;
    #spacesMap; 

    constructor(rows = 3, cols = 3) {
        this.#rows = rows;
        this.#cols = cols;
        this.spaces = this.#createSpaces(); 
        this.#spacesMap = this.#mapSpacesById(); 
    }

    /**
     * Creates a 2D array of Space objects
     * @returns {Space[][]} - Matrix of Space instances
     */
    #createSpaces() {
        const spaces = [];
        for (let x = 0; x < this.#cols; x++) {
            const col = [];
            for (let y = 0; y < this.#rows; y++) {
                col.push(new Space(x, y));
            }
            spaces.push(col);
        }
        return spaces;
    }

    /**
     * Prepares a map for quick access to Space by ID
     * @returns {Map<string, Space>}
     */
    #mapSpacesById() {
        const map = new Map();
        for (const col of this.spaces) {
            for (const space of col) {
                map.set(space.id, space);
            }
        }
        return map;
    }


    renderHTMLBoard() {
        for (const col of this.spaces) {
            for (const space of col) {
                space.renderHTMLSpace();
            }
        }
    }

    /**
     * Find a Space object by its DOM ID
     * @param {string} spaceId - DOM id of the target space
     * @returns {Space | undefined}
     */
    findSpace(spaceId) {
        return this.#spacesMap.get(spaceId);
    }
}
