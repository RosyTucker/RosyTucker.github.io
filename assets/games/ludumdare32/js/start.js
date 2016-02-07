$(function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas-container', null, false, false);
    var preloader = new Preloader(game);
    game.state.add('preloader', preloader);
    game.state.start('preloader');
});