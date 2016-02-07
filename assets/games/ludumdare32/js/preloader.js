function Preloader(game)
{
    this.game = game;
}

Preloader.prototype.preload = function() {
    var menuState = new MenuState(this.game);
    var gameState = new GameState(this.game);
    var gameOverState = new GameOverState(this.game);
    menuState.preload();
    gameState.preload();
    gameOverState.preload();
    this.game.state.add('menu', menuState);
    this.game.state.add('inGame', gameState);
    this.game.state.add('gameOver', gameOverState);
};

Preloader.prototype.create = function() {
    if(!this.music) {
        this.music = this.game.add.audio('music');
        this.music.play('', 0, 0.5, true);
    }
    this.game.state.start('menu');
};