

class ImageManager {

  static HUE_DICKS;
  static HEART_EMOJIS;

  static preload(dir) {
    this.HUE_DICKS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map(n => loadImage(`${dir}/cock-hue-12/cock-hue-${n}_12.png`));

    this.HEART_EMOJIS = [
      'red', 'orange', 'yellow',
      'green', 'blue', 'purple', 'black'
    ].map(c => loadImage(`${dir}/emojis/heart-${c}.png`));

    this.HEARTS_BACKGROUND = ['red', 'green', 'purple'];
    this.HEARTS_BACKGROUND = [
      this.HEART_EMOJIS[0],
      this.HEART_EMOJIS[3],
      this.HEART_EMOJIS[5],
    ]

    this.HEARTS_FOREGROUND = ['blue', 'yellow', 'orange'];
    this.HEARTS_FOREGROUND = [
      this.HEART_EMOJIS[1],
      this.HEART_EMOJIS[2],
      this.HEART_EMOJIS[4],
    ]

    this.HEART_YELLOW = [this.HEART_EMOJIS[2]];
    this.HEART_GREEN = [this.HEART_EMOJIS[3]];
    this.HEART_ORANGE = [this.HEART_EMOJIS[1]];

    this.FLOWER_EMOJIS = [
      'pink', 'red', 'yellow'
    ].map(c => loadImage(`${dir}/emojis/flower-${c}.png`));


    this.WHIPLASH = [
      'blue', 'green', 'purple', 'yellow'
    ].map(o => loadImage(`./images/whiplash/jk-s-${o}.png`));

  }
}