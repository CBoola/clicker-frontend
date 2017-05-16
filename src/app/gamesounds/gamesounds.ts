import { Injectable } from '@angular/core';

@Injectable()
export class GamesoundsService {

  stryctureSounds = [
	"../../assets/buyStr1.mp3",
	"../../assets/buyStr1.mp3"
  ];
  
  constructor() { }
  
  playStructureSound(index: number)
  {
		var snd = new Audio(this.stryctureSounds[0]);
		snd.play();
  }
  
}
