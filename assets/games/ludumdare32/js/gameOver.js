
WebFontConfig = {
    google: {
        families: ['Open Sans']
    }

};

GameOverState = function(game){
    this.totalKills = 0;
    this.game = game;
};

GameOverState.prototype.preload = function(){
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
};

GameOverState.prototype.create = function(){
    this.game.stage.setBackgroundColor('#1d1a16');
    this.createText();
};

GameOverState.prototype.update = function (){
    if(this.game.input.activePointer.isDown){
        this.game.state.start('inGame');
    }
};

GameOverState.prototype.render = function() {
};

GameOverState.prototype.createText = function () {
    var text = this.game.add.text(400,300, "Game Over \n You Scored: " + this.totalKills + '\n\n Click to play again!');
    text.anchor.setTo(0.5);
    text.fill = '#cd6871';
    text.font = 'Open Sans';
    text.fontWeight = 600;
    text.fontSize = 60;
    text.align = 'center';
};
