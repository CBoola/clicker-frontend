import {Component, OnInit} from '@angular/core';
import {GameState} from '../gamestate/gamestate';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  constructor(public gs: GameState ) {
  
	this.gs.structureBought.subscribe( val => { this.boughtStructure(val)});
  
  }

  isAchieved(index: number)
  {
	var achId= parseInt(this.gs.achievements[index].system_id+"");
	var date = this.gs.dateOfAchievement(achId);
	return (date != "");
  }
  
  achievementDate(index: number)
  {
	var achId= parseInt(this.gs.achievements[index].system_id+"");
	return this.gs.dateOfAchievement(achId);
  }
  
  onMouseover(event: MouseEvent, index: number) 
  { 
	$("#infoBox").css("display", "inline");
	$("#infoTitle").html(this.gs.achievements[index].name+"");
	$("#infoDescription").html(this.gs.achievements[index].description+"");
  }
  
  onMouseout(event: MouseEvent) 
  { 
	$("#infoBox").css("display", "none");
  }
  
  onMousemove(event: MouseEvent) 
  { 
	var ofs= $('#achievementsMain').offset();
	var posX = event.clientX - ofs.left +5;
	var posY = event.clientY - ofs.top -75;
	
	var infoBox= $("#infoBox");
	infoBox.css("left", posX);
	infoBox.css("top", posY);
  }
  
  boughtStructure(structureId: number)
  {
	var structNum = this.gs.numOfStructure(structureId);
	
	for(var ach of this.gs.achievements)
	{
		var achId = parseInt(ach.system_id+"");
		if( this.gs.dateOfAchievement( achId) != ""  ) //gained achievement
			continue;
		
		if(ach.type == "BOUGHT_STRUCTURES")
		{
			if( parseInt(ach.related_system_id+"")  == structureId )
			{
				if( structNum >= ach.threshold )
				{					
					this.gainAchievement(achId);
				}
			}
		}
	}
  }
  
  gainAchievement(achId: number)
  {
	console.log(achId);
  }
  
  
  ngOnInit() {
  }

}
