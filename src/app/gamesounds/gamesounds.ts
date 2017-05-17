import {Injectable} from '@angular/core';

@Injectable()
export class GamesoundsService {

  prefix: String = '/game/assets/';
  // prefix: String = '/assets/';

  structureSounds: string[] = [
    'cash_register0.mp3',
    'cash_register1.mp3',
    'cash_register2.mp3',
    'cash_register3_short.mp3',
    'cash_coin.mp3',
    'coin_flipper.mp3',
    'get_coin.mp3'
  ];

  upgradeSounds: string[] = [
    'kradniesz_cebule.mp3'
  ];

  hallelujah = 'hallelujah.mp3';

  constructor() {
    this.loadAllSounds();
  }

  loadAllSounds() {
    new Audio(this.prefix + this.hallelujah);
    for (const str of this.structureSounds) {
      new Audio(this.prefix + str);
    }
    for (const str of this.upgradeSounds) {
      new Audio(this.prefix + str);
    }
  }

  canPlay(): boolean {
    return ($('#soundsBtn').html() === 'Dźwięki: Wł');
  }

  playStructureSound(index: number) {
    if (!this.canPlay()) {
      return;
    } else if (index === 10) {
      const snd = new Audio(this.prefix + this.hallelujah);
      snd.play();
    } else {
      const snd = new Audio(this.prefix + this.structureSounds[index % this.structureSounds.length]);
      snd.play();
    }
  }

  playUpgradeSound(index: number) {
    if (!this.canPlay()) {
      return;
    }
    const snd = new Audio(this.prefix + this.upgradeSounds[index % this.upgradeSounds.length]);
    snd.play();
  }

}
