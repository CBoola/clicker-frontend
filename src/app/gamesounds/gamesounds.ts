import {Injectable} from '@angular/core';
import {GameState} from '../gamestate/gamestate';

@Injectable()
export class GamesoundsService {

  prefix: String = '/game/assets/';
   //prefix: String = '/assets/';

  achievementsSounds: string = 'wygranko.mp3';
  
  musicSounds: string = 'piosenka.mp3';
  isMusicPlay = false;
  sndAudio = null;

  constructor(public gs: GameState) {
	this.gs.structuresUpdated.subscribe( res => { this.loadStructuresSounds() });
	this.gs.upgradesUpdated.subscribe( res => { this.loadUpgradesSounds() });
	new Audio(this.prefix+this.achievementsSounds+"");
	
	this.sndAudio = new Audio(this.prefix+this.musicSounds+"");
	if (typeof this.sndAudio.loop == 'boolean')
	{
		this.sndAudio.loop = true;
	}
	else
	{
		this.sndAudio.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	
	setInterval(() => {
      this.playMusic();
    }, 500);
  }

  loadStructuresSounds() {   
    for (var structure of this.gs.structures) {
		if(structure.sound+"" != "null")
			new Audio(structure.sound+"");
    }
  }

  loadUpgradesSounds() {   
    for (var upgrade of this.gs.upgrades) {
		if(upgrade.sound+"" != "null")
			new Audio(upgrade.sound+"");
    }
  }
  
  canPlay(): boolean {
    return $('#sndOn').css('display') !== 'none';
  }

  playStructureSound(index: number) {
    if (!this.canPlay()) {
      return;
    } 
	  const patch = this.gs.structures[index].sound+"";
	  if(patch != "null")
	  {
		const snd = new Audio(this.gs.structures[index].sound+"");
		snd.play();
	  }
  }

  playUpgradeSound(index: number) {
    if (!this.canPlay()) {
      return;
    } 
	  const patch = this.gs.upgrades[index].sound+"";
	  if(patch != "null")
	  {
		const snd = new Audio(this.gs.upgrades[index].sound+"");
		snd.play();
	  }
  }
  
  playAchievementSound()
  {
	if (!this.canPlay()) {
      return;
    }
		const snd = new Audio(this.prefix+this.achievementsSounds+"");
		snd.play();
  }
  
  playMusic()
  {
	var btnOn = $('#musicOn').css('display') !== 'none';
	if(btnOn == this.isMusicPlay)
		return;
		
	if(btnOn)
	{
		this.sndAudio.play();
	}
	else
	{
		this.sndAudio.pause();
	}
	this.isMusicPlay= btnOn;
  }
}
