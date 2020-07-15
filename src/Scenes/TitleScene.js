import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.gameButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
    );

    this.optionsButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    this.creditsButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.model = this.sys.game.globals.model;
    this.jumpSound = this.sound.add('jumpSound', { volume: 0.6 });
    this.downSound = this.sound.add('downSound', { volume: 0.6 });
    this.catchStar = this.sound.add('catchStar', { volume: 1 });
    this.bombSound = this.sound.add('bombSound', { volume: 1 });

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.05, loop: true });

      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.sys.game.globals.jumpSound = this.jumpSound;
      this.sys.game.globals.downSound = this.downSound;
      this.sys.game.globals.catchStar = this.catchStar;
      this.sys.game.globals.bombSound = this.bombSound;
    }

    if (!this.model.soundOn) {
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
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.scale.width / 2,
        config.scale.height / 2 - offset * 100,
        config.scale.width,
        config.scale.height,
      ),
    );
  }

  // eslint-disable-next-line
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
