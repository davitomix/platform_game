import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

const get = () => JSON.parse(localStorage.getItem('Score'));
const set = value => {
  localStorage.setItem('Score', value);
  return get();
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player = null;
    this.blueCrystals = null;
    this.pinkCrystals = null;
    this.yellowCrystals = null;
    this.bombs = null;
    this.dragons = null;
    this.platforms = null;
    this.cursors = null;
    this.scoreText = null;
    this.highScoreText = null;
    this.score = null;
    this.gameRound = null;
    this.gameOver = null;
    this.highScore = null;
    this.playerName = null;
    this.soundOn = null;
  }

  create() {
    this.score = 0;
    this.gameRound = 1;
    this.gameOver = false;
    this.soundOn = this.sys.game.globals.model.soundOn;

    this.highScore = this.sys.game.globals.highScore;
    this.playerName = this.sys.game.globals.playerName;

    this.add.image(400, 300, 'background');
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 580, 'ground');

    this.platforms.create(96, 464, 'platforms');
    this.platforms.create(96, 314, 'platforms');
    this.platforms.create(96, 164, 'platforms');

    this.platforms.create(398, 389, 'platforms');
    this.platforms.create(398, 239, 'platforms');

    this.platforms.create(704, 464, 'platforms');
    this.platforms.create(704, 314, 'platforms');
    this.platforms.create(704, 164, 'platforms');

    this.player = this.physics.add.sprite(0, 0, 'king').setScale(1.3);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('king', { start: 14, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'king', frame: 0 }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'swoosh',
      frames: this.anims.generateFrameNumbers('king', { start: 8, end: 12 }),
      frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.bgMusic = this.sys.game.globals.bgMusic;

    this.jumpSound = this.sys.game.globals.jumpSound;
    this.downSound = this.sys.game.globals.downSound;
    this.catchStar = this.sys.game.globals.catchStar;
    this.bombSound = this.sys.game.globals.bombSound;
    this.soundOn = this.sys.game.globals.model.soundOn;
    if (!this.soundOn) {
      this.jumpSound.mute = true;
      this.downSound.mute = true;
      this.catchStar.mute = true;
      this.bombSound.mute = true;
    } else {
      this.jumpSound.mute = false;
      this.downSound.mute = false;
      this.catchStar.mute = false;
      this.bombSound.mute = false;
    }

    this.blueCrystals = this.physics.add.group({
      key: 'blueCrystal',
      repeat: 2,
      setXY: { x: 450, y: 0, stepX: 50 },
    });

    this.blueCrystals.children.iterate(child => {
      child.setBounce(1);
      child.setCollideWorldBounds(true);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      child.allowGravity = false;
    });

    this.bombs = this.physics.add.group();
    this.dragons = this.physics.add.group();
    this.pinkCrystals = this.physics.add.group();
    this.yellowCrystals = this.physics.add.group();

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    this.highscoreText = this.add.text(380, 16, `High Score: ${this.highScore}`, {
      fontSize: '32px',
      fill: '#000',
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.blueCrystals, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.dragons, this.platforms);
    this.physics.add.collider(this.dragons, this.blueCrystals);
    this.physics.add.collider(this.dragons, this.pinkCrystals);
    this.physics.add.collider(this.dragons, this.yellowCrystals);
    this.physics.add.collider(this.pinkCrystals, this.platforms);
    this.physics.add.collider(this.yellowCrystals, this.platforms);
    this.physics.add.collider(this.bombs, this.dragons);
    this.physics.add.collider(this.bombs);
    this.physics.add.collider(this.blueCrystals);
    this.physics.add.collider(this.pinkCrystals);
    this.physics.add.collider(this.yellowCrystals);
    this.physics.add.collider(this.blueCrystals, this.pinkCrystals);
    this.physics.add.collider(this.blueCrystals, this.yellowCrystals);
    this.physics.add.collider(this.pinkCrystals, this.yellowCrystals);

    this.physics.add.overlap(this.player, this.blueCrystals, this.collectCrystals, null, this);

    this.physics.add.overlap(this.player, this.pinkCrystals, this.specialCrystals, null, this);

    this.physics.add.overlap(this.player, this.yellowCrystals, this.specialCrystals, null, this);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    this.physics.add.overlap(this.player, this.dragons, this.takePoints, null, this);
  }

  update(delta) {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-190 - this.gameRound * 10);
      if (this.player.anims.currentAnim.key !== 'swoosh') this.player.anims.play('run', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(190 + this.gameRound * 10);
      if (this.player.anims.currentAnim.key !== 'swoosh') this.player.anims.play('run', true);
      this.player.flipX = false;
    } else if (!this.player.anims.isPlaying) {
      this.player.setVelocityX(0);
      this.player.anims.play('turn', true);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.space.isDown) {
      if (delta > 18) {
        this.player.anims.play('swoosh');
      }
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-390);
      this.jumpSound.play();
    }

    if (this.cursors.down.isDown && !this.player.body.touching.down) {
      if (!this.downSound.isPlaying) {
        this.downSound.play();
      }
      this.player.setVelocityY(390);
      this.player.setBounceY(0.1);
    }
  }

  collectCrystals(player, crystal) {
    crystal.disableBody(true, true);

    this.catchStar.play();

    this.score += 40;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.score > this.highScore) {
      this.sys.game.globals.highScore = this.score;
      set(this.score);
    }

    const x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    if (this.blueCrystals.countActive(true) === 0) {
      this.gameRound += 1;
      this.blueCrystals.children.iterate(child => {
        child.enableBody(true, x, 100, true, true);
        child.setBounce(1);
        child.setCollideWorldBounds(true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
        child.allowGravity = false;
      });

      const dragon = this.dragons.create(x, 16, 'dragonblack');
      dragon.setBounce(1);
      dragon.setCollideWorldBounds(true);
      dragon.setVelocity(Phaser.Math.Between(-200, 200), 20);
      dragon.allowGravity = false;

      if (this.gameRound % 2 === 0) {
        const yellowCrystal = this.yellowCrystals.create(x, 16, 'yellowCrystal');
        yellowCrystal.setBounce(1);
        yellowCrystal.setCollideWorldBounds(true);
        yellowCrystal.setVelocity(Phaser.Math.Between(-200, 200), 20);
        yellowCrystal.allowGravity = false;

        const bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-25, 25), 20);
        bomb.allowGravity = false;
      }

      if (this.gameRound % 5 === 0) {
        const pinkCrystal = this.pinkCrystals.create(x, 16, 'pinkCrystal');
        pinkCrystal.setBounce(1);
        pinkCrystal.setCollideWorldBounds(true);
        pinkCrystal.setVelocity(Phaser.Math.Between(-200, 200), 20);
        pinkCrystal.allowGravity = false;
      }
    }
  }

  hitBomb(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    this.bombSound.play();
    player.anims.play('turn');

    if (this.score > this.highScore) {
      this.sys.game.globals.highScore = this.score;
      set(this.score);
    }
    this.gameOver = true;

    this.restartButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2,
      'blueButton1',
      'blueButton2',
      'Restart',
      'Game',
    );

    this.restartButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title',
    );
  }

  takePoints(player, dragon) {
    if (this.player.anims.currentAnim.key === 'swoosh') {
      dragon.destroy();
    } else {
      const x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      dragon.x = x;
      this.score -= 50;
      this.scoreText.setText(`Score: ${this.score}`);
    }
  }

  specialCrystals(player, crystal) {
    crystal.destroy();
    this.catchStar.play();
    if (crystal.texture.key === 'pinkCrystal') {
      this.score += 100;
    } else {
      this.score += 60;
    }

    this.scoreText.setText(`Score: ${this.score}`);
  }
}
