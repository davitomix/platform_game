import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.madeText = 'Created by: davitomix\nMusic by: Juhani Junkala\nArt by: Kenney.nl\nSounds by: Kenney.nl\nBomb sound by: RustLTD';
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.madeByText = this.add.text(0, 0, this.madeText, {
      fontSize: '26px',
      fill: '#fff',
    });
    this.zone = this.add.zone(
      config.scale.width / 2,
      config.scale.height / 2,
      config.scale.width,
      config.scale.height,
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function complete() {
        // eslint-disable-next-line
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}
