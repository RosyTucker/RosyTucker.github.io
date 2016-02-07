
WebFontConfig = {
    google: {
        families: ['Open Sans']
    }

};

MenuState = function(game){
    this.totalKills = 0;
    this.game = game;
};

MenuState.prototype.preload = function(){
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
};

MenuState.prototype.create = function(){
    this.game.stage.setBackgroundColor('#1d1a16');
    this.createText();
};

MenuState.prototype.update = function (){
    if(this.game.input.activePointer.isDown){
        this.game.state.start('inGame');
    }
};

MenuState.prototype.render = function() {
};

MenuState.prototype.createText = function () {
    var text = this.game.add.text(410,300, 'You\'re Toast! \n Click to Play!');
    text.anchor.setTo(0.5);
    text.fill = '#cd6871';
    text.font = 'Open Sans';
    text.fontWeight = 600;
    text.fontSize = 60;
    text.align = 'center';
};
