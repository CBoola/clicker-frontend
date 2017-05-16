import { Injectable } from '@angular/core';

@Injectable()
export class GamesoundsService {

  stryctureSounds = [
	"../../assets/cash_register0.mp3",
	"../../assets/cash_register1.mp3",
  "../../assets/cash_register2.mp3",
  "../../assets/cash_register3_short.mp3",
  "../../assets/cash_coin.mp3",
  "../../assets/coin_flipper.mp3",
  "../../assets/get_coin.mp3",
  "../../assets/halleluya.mp3",
  "../../assets/kradniesz_cebule.mp3",
  ];
  
  constructor() { }
  
  playStructureSound(index: number)
  {
		var snd = new Audio(this.stryctureSounds[0]);
		snd.play();
  }
  
}
