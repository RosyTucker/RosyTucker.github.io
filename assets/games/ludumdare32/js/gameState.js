WorldConfig = {
    WIDTH: 1600,
    HEIGHT: 1200
};

GameState = function(game) {
    var PATH_TO_ASSETS="../../../assets/games/ludumdare32/assets/";
    var FIRE_RATE = 175;
    var currentSpeed, numLoops, nextFire, kills, enemiesAlive = 0;
    var shuffleFX, fireFX, splodgeFX, hitFX;
    var cursors;
    var ground, enemies, worktops, player, playerWeapons, playerAnimation, enemyWeapons, explosions;

    this.preload = function () {
        game.load.image('sink', PATH_TO_ASSETS + 'sink.png');
        game.load.image('bin', PATH_TO_ASSETS + 'bin.png');
        game.load.image('cabinet2', PATH_TO_ASSETS + 'cabinet2.png');
        game.load.image('fridge', PATH_TO_ASSETS + 'fridge.png');
        game.load.image('drainingBoard', PATH_TO_ASSETS + 'drainingBoard.png');
        game.load.image('cabinet', PATH_TO_ASSETS + 'cabinet.png');
        game.load.image('cabinet3', PATH_TO_ASSETS + 'cabinet3.png');
        game.load.atlas('player', PATH_TO_ASSETS + 'player/player.png', PATH_TO_ASSETS + 'player/player.json');
        game.load.image('logo', PATH_TO_ASSETS + 'logo.png');
        game.load.image('oven', PATH_TO_ASSETS + 'oven.png');
        game.load.image('toast', PATH_TO_ASSETS + 'toast.png');
        game.load.image('broccoli', PATH_TO_ASSETS + 'broccoli.png');
        game.load.image('explosion', PATH_TO_ASSETS + 'jamExplosion.png');
        game.load.image('enemy', PATH_TO_ASSETS + 'fryingPan.png');
        game.load.image('ground', PATH_TO_ASSETS + 'ground.png');
        game.load.audio('splodge', PATH_TO_ASSETS + 'sounds/splodge.m4a');
        game.load.audio('fire', PATH_TO_ASSETS + 'sounds/fire.m4a');
        game.load.audio('shuffle', PATH_TO_ASSETS + 'sounds/shuffle.m4a');
        game.load.audio('hit', PATH_TO_ASSETS + 'sounds/hit.m4a');
        game.load.audio('music', PATH_TO_ASSETS + 'sounds/music.m4a');
    };

    this.create = function () {
        kills = numLoops = currentSpeed =  nextFire = 0;
        enemies = [];
        game.world.setBounds(0, 0, WorldConfig.WIDTH, WorldConfig.HEIGHT);
        cursors = game.input.keyboard.createCursorKeys();
        createSounds();
        createGround();
        createPlayer();
        createWorkTops();
        createEnemyAmmo();
        createPlayerAmmo();
        createExplosions();
        addEnemies(10);
        game.camera.follow(player);
        game.camera.focusOnXY(0, 0);

        function createSounds() {
            splodgeFX = game.add.audio('splodge');
            fireFX = game.add.audio('fire');
            shuffleFX = game.add.audio('shuffle');
            hitFX = game.add.audio('hit');
        }

        function createGround () {
            ground = game.add.tileSprite(0, 0, WorldConfig.WIDTH, WorldConfig.HEIGHT, 'ground');
            ground.fixedToCamera = true;
        }

        function createEnemyAmmo () {
            enemyWeapons = game.add.group();
            enemyWeapons.enableBody = true;
            enemyWeapons.physicsBodyType = Phaser.Physics.ARCADE;
            enemyWeapons.createMultiple(30, 'broccoli');
            enemyWeapons.setAll('anchor.x', 0.5);
            enemyWeapons.setAll('anchor.y', 0.5);
            enemyWeapons.setAll('outOfBoundsKill', true);
        }

        function createWorkTops () {
            worktops = game.add.group(undefined, 'group', false, true, Phaser.Physics.ARCADE);
            var cabinet = worktops.create(0, 0, 'cabinet');
            cabinet.body.immovable = true;
            worktops.create(cabinet.width, 0, 'sink').body.immovable = true;
            worktops.create(cabinet.width, 0, 'sink').body.immovable = true;
            worktops.create((cabinet.width * 2), 0, 'drainingBoard').body.immovable = true;
            worktops.create((cabinet.width * 3), 0, 'cabinet').body.immovable = true;
            worktops.create((cabinet.width * 4), 0, 'cabinet2').body.immovable = true;
            worktops.create((cabinet.width * 5), 0, 'oven').body.immovable = true;
            worktops.create((cabinet.width * 6), 0, 'cabinet').body.immovable = true;
            worktops.create(0, cabinet.height, 'cabinet').body.immovable = true;
            worktops.create(0, (cabinet.height * 2), 'cabinet').body.immovable = true;
            worktops.create(0, (cabinet.height * 3), 'fridge').body.immovable = true;
            worktops.create(0, (cabinet.height * 4), 'bin').body.immovable = true;
            worktops.create((cabinet.width * 3), (cabinet.height * 3), 'cabinet').body.immovable = true;
            worktops.create((cabinet.width * 4), (cabinet.height * 4), 'cabinet').body.immovable = true;
            worktops.create((cabinet.width * 4), (cabinet.height * 3), 'cabinet3').body.immovable = true;
            worktops.create((cabinet.width * 5), (cabinet.height * 4), 'cabinet').body.immovable = true;
            worktops.create((cabinet.width * 5), (cabinet.height * 3), 'cabinet').body.immovable = true;
            worktops.create((cabinet.width * 3), (cabinet.height * 4), 'cabinet').body.immovable = true;
        }

        function createPlayer () {
            player = game.add.sprite(0, 0, 'player', 'player1.png');
            player.anchor.setTo(0.5, 0.5);
            playerAnimation = player.animations.add('toast', ['player1.png', 'player1.png', 'player1.png',
                'player2.png', 'player2.png', 'player2.png', 'player2.png', 'player2.png',
                'player3.png', 'player4.png', 'player5.png', 'player6.png',
                'player7.png', 'player8.png', 'player9.png', 'player10.png',
                'player11.png', 'player12.png', 'player13.png', 'player14.png',
                'player15.png', 'player16.png', 'player17.png', 'player18.png',
                'player19.png', 'player20.png', 'player21.png', 'player22.png',
                'player23.png', 'player24.png', 'player25.png', 'player26.png',
                'player27.png', 'player27.png', 'player27.png', 'player27.png',
                'player27.png', 'player27.png', 'player27.png', 'player27.png'], 5, true);
            game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.drag.set(0.2);
            player.body.maxVelocity.setTo(400, 400);
            player.position = new Phaser.Point(600, 250);
            player.health = 20;
            player.friction = 0.2;
            player.body.collideWorldBounds = true;
            player.body.setSize(player.width, player.height * 2 + 20);
            player.scale.setTo(0.8, 0.8);
            player.play('toast');
        }

        function createPlayerAmmo(){
            playerWeapons = game.add.group();
            playerWeapons.enableBody = true;
            playerWeapons.physicsBodyType = Phaser.Physics.ARCADE;
            playerWeapons.createMultiple(10, 'toast', 0, false);
            playerWeapons.setAll('anchor.x', 0.5);
            playerWeapons.setAll('anchor.y', 0.5);
            playerWeapons.setAll('outOfBoundsKill', true);
            playerWeapons.setAll('checkWorldBounds', true);
        }

        function createExplosions() {
            explosions = game.add.group();
            explosions.createMultiple(10, 'explosion');
        }
    };


    this.update = function () {
        enemiesAlive = 0;
        ground.tilePosition.x = -game.camera.x;
        ground.tilePosition.y = -game.camera.y;
        moveEnemies();
        checkForPlayerHit();
        movePlayer();
        moveWeapons();
        changeLevelIfNeeded();
        endGameIfNeeded();

        function moveEnemies() {
            enemies.forEach(function(enemy){
                if(!enemy.alive) return;
                enemiesAlive ++;
                game.physics.arcade.collide(worktops, enemy.sprite);
                game.physics.arcade.collide(player, enemy.sprite);
                game.physics.arcade.overlap(playerWeapons, enemy.sprite, enemyHitByPlayer, null, this);
                enemy.update();

                function enemyHitByPlayer(enemyBody, playerWeapon){
                    playerWeapon.kill();
                    var destroyed = enemy.damage();
                    if (destroyed) {
                        kills++;
                        var explosion = explosions.getFirstExists(false);
                        explosion.scaleXY = 0.1;
                        explosion.alpha = 1;
                        explosion.reset(enemyBody.x, enemyBody.y);
                        var tween = game.add.tween(explosion).to({scaleXY: 1, alpha: 0}, 1000,
                            Phaser.Easing.Sinusoidal.Out).start();
                        splodgeFX.play('', 0, 0.7, false);
                        tween.onComplete.add(function () {
                            explosion.kill();
                        })
                    } else {
                        hitFX.play('', 0, 0.7, false);
                    }
                }
            });
        }

        function checkForPlayerHit() {
            game.physics.arcade.collide(player, worktops);
            game.physics.arcade.overlap(enemyWeapons, player, function (player, ammo) {
                ammo.kill();
                hitFX.play('', 0, 0.7, false);
                var tween = game.add.tween(player).to({alpha: 0.6}, 100,
                    Phaser.Easing.Circular.InOut).start();
                tween.onComplete.add(function () {
                    player.alpha = 1;
                });
                player.health = Math.max(0, player.health - 1);
            }, null, this);
        }

        function moveWeapons() {
            game.physics.arcade.overlap(enemyWeapons, playerWeapons,  function (playerWeapon, enemyWeapon) {
                playerWeapon.kill();
                enemyWeapon.kill();
            }, null, this);

            playerWeapons.forEachAlive(function (weapon) {
                killWeaponIfNeeded(weapon, enemyWeapons);
            }, this);

            enemyWeapons.forEach(function (weapon) {
                killWeaponIfNeeded(weapon, playerWeapons);
            }, this);
        }

        function endGameIfNeeded() {
            if (player.health === 0) {
                game.state.states['gameOver'].totalKills = kills;
                game.state.start('gameOver');
            }
        }

        function changeLevelIfNeeded() {
            if (enemiesAlive === 0 && player.health > 0) {
                addEnemies(3);
                enemies.forEach(function (enemy, index) {
                    enemy.reset(enemies.length, enemy.speed * 1.5, index);
                });
            }
        }

        function movePlayer(){
            if (cursors.left.isDown) {
                player.angle -= 4;
            } else if (cursors.right.isDown) {
                player.angle += 4;
            }

            if (cursors.up.isDown) {
                currentSpeed = 300;
            } else if (currentSpeed > 0) {
                currentSpeed -= 4;
            }

            if (currentSpeed > 0) {
                game.physics.arcade.velocityFromRotation(player.rotation, currentSpeed, player.body.velocity);
                shuffleFX.play('', 0, 0.4, false, false);
            } else {
                shuffleFX.pause();
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                fire();
            } else if (playerAnimation.loopCount > numLoops) {
                numLoops++;
                fire();
            }
        }

        function fire() {
            if (game.time.now > nextFire && playerWeapons.countDead() > 0) {
                nextFire = game.time.now + FIRE_RATE;
                var weapon = playerWeapons.getFirstExists(false);
                fireFX.play('', 0, 0.15, false);
                weapon.reset(player.x, player.y);
                weapon.lifespan = 2000;
                weapon.rotation = player.rotation;
                game.physics.arcade.velocityFromRotation(player.rotation, 400, weapon.body.velocity);
            }
        }
    };

    this.render = function () {
        game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemies.length +
            '    Health: ' + player.health + '     Total Kills: ' + kills, 32, 32);
    };

    function killWeaponIfNeeded (weapon) {
        if (game.physics.arcade.collide(weapon, worktops)) {
            var tween = game.add.tween(weapon).to({alpha: 0}, 300).start();
            tween.onComplete.add(function () {
                weapon.kill();
                weapon.alpha = 1;
            })
        }
    }

    function addEnemies (number) {
        var initialLength = enemies.length;
        for (var i = initialLength; i < initialLength + number; i++) {
            enemies.push(new Enemy(initialLength + number, i, game, player, enemyWeapons));
        }
    }
};

Object.defineProperty(Phaser.Sprite.prototype, 'scaleXY', {
    get: function() {
        return this.scale.x;
    },
    set: function(v) {
        this.scale.set(v, v);
    }
});