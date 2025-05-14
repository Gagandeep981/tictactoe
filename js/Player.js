class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(5);
    }


    get unusedTokens() {
        return this.tokens.filter(token => !token.played);
    }

    get activeToken() {
        return this.unusedTokens[0];
    }

    /**
     * Creates the specified number of tokens for the player.
     * @param {number} count - Number of tokens to create.
     * @returns {Token[]} Array of Token objects.
     */
    createTokens(count) {
        return Array.from({ length: count }, (_, i) => new Token(this, i));
    }
}
