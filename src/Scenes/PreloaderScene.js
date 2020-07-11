import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    const creator = this.add.text(100, 100, 'Created by davitomix', { fill: '#0f0' });
    creator.setOrigin(- 1, - 1);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', value => {
      percentText.setText(`${parseInt(value * 100, 0)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', file => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      creator.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(1000, this.ready, [], this);

    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');

    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('dragonblack', 'assets/dragonblack.png');
    this.load.image('blueCrystal', 'assets/blueCrystal.png');
    this.load.image('pinkCrystal', 'assets/pinkCrystal.png');
    this.load.image('yellowCrystal', 'assets/yellowCrystal.png');
    this.load.image('background', 'assets/background.png');

    this.load.image('ground', 'assets/ground.png');
    this.load.image('platforms', 'assets/platforms.png');
    this.load.spritesheet('soldier', 'assets/soldier.png', {
      frameWidth: 17,
      frameHeight: 23,
    });

    this.load.audio('bgMusic', ['assets/gameMusic.mp3']);
    this.load.audio('jumpSound', ['assets/phaserUp4.mp3']);
    this.load.audio('downSound', ['assets/phaserDown2.mp3']);
    this.load.audio('catchStar', ['assets/catchStar.mp3']);
    this.load.audio('bombSound', ['assets/8bit_bomb_explosion.wav']);
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
