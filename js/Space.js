
class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
        this.token = null;
    }


    get htmlSpace() {
        return document.getElementById(this.id);
    }

    get owner() {
        return this.token ? this.token.owner.name : null;
    }

    renderHTMLSpace() {
        const spaceElement = document.createElement('li');
        spaceElement.className = "box";
        spaceElement.id = this.id;
        document.querySelector("ul.boxes").appendChild(spaceElement);
    }

    /**
     * Marks this space as occupied by a token.
     @param {Token} token - The token occupying this space.
     */
    mark(token) {
        this.token = token;
    }
}
