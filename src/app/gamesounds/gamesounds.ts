import { Injectable } from '@angular/core';

@Injectable()
export class GamesoundsService {

  stryctureSounds:string[] = [
	"../../assets/cash_register0.mp3",
	"../../assets/cash_register1.mp3",
	"../../assets/cash_register2.mp3",
	"../../assets/cash_register3_short.mp3",
	"../../assets/cash_coin.mp3",
	"../../assets/coin_flipper.mp3",
	"../../assets/get_coin.mp3"
  ];
  
  upgradeSounds:string[] = [
	"../../assets/kradniesz_cebule.mp3"
  ];
  
  halleluya:string = "../../assets/halleluya.mp3";
    
  constructor() { }
  
  canPlay():boolean
  {
	var sndVal = $("#soundsBtn").html();
	return (sndVal == "Dźwięki: Wł");
  }
  
  playStructureSound(index: number)
  {
	if( !this.canPlay() )
		return;
		
	if( index == 10 )
	{
		var snd = new Audio(this.halleluya);
		snd.play();
	}
	else
	{
		var snd = new Audio(this.stryctureSounds[index % this.stryctureSounds.length]);
		snd.play();
	}
  }
  
  playUpgradeSound(index: number)
  {
	if( !this.canPlay() )
		return;
	
	var snd = new Audio(this.upgradeSounds[index % this.upgradeSounds.length]);
	snd.play();
  }
  
}
