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
	this.gs.upgradeBought.subscribe( val => { this.boughtUpgrade(val)});
  
	setInterval(() => {
      this.onionsState();
    }, 1000);
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
	
	return this.gs.getFormattedDate( this.gs.dateOfAchievement(achId) );
  }
  
  onMouseover(event: MouseEvent, index: number) 
  { 
	var isAch =this.isAchieved(index);
	if(!isAch)
		return;
	
	$("#infoBox").css("display", "inline");
	$("#infoTitle").html( (isAch)? this.gs.achievements[index].name+"" : "?????????" );
	//$("#infoDescription").html( (isAch)? this.gs.achievements[index].description+"" : "?????");
	
	$("#infoDate").html( (isAch)? "Zdobyto: "+this.achievementDate(index) : "");
  }
  
  onMouseout(event: MouseEvent) 
  { 
	$("#infoBox").css("display", "none");
  }
  
  onMousemove(event: MouseEvent) 
  { 
	var ofs= $('#achievementsMain').offset();
	var infoBox= $("#infoBox");
	var width= parseInt(infoBox.css("width"))/2;
	
	var posX = event.pageX - ofs.left -width;
	var posY = event.pageY - ofs.top -90;
	
	
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
		else if(ach.type == "SPENT_CASH")
		{
			if( this.gs.statisticsValue.spent_cash >= ach.threshold)
			{					
				this.gainAchievement(achId);
			}
		}
	}
  }
  
  boughtUpgrade(upgradeId: number)
  {
	
	for(var ach of this.gs.achievements)
	{
		var achId = parseInt(ach.system_id+"");
		if( this.gs.dateOfAchievement( achId) != ""  ) //gained achievement
			continue;
		
		if(ach.type == "SPENT_CASH")
		{
			if( this.gs.statisticsValue.spent_cash >= ach.threshold)
			{					
				this.gainAchievement(achId);
			}
		}
	}
  }
  
  structureNameFilter(name: string)
  {
	if( name.length <= 12)
		return name;
	return name.substr(0, 10)+".";
  }
  
  onionsState()
  {
	for(var ach of this.gs.achievements)
	{
		var achId = parseInt(ach.system_id+"");
		if( this.gs.dateOfAchievement( achId) != ""  ) //gained achievement
			continue;
		
		if(ach.type == "MAXIMUM_CASH")
		{
			if( this.gs.onions >= ach.threshold)
			{					
				this.gainAchievement(achId);
			}
		}
	}
  }
  
  gainAchievement(achId: number)
  {
	//console.log(achId);
	var dateStr = (new Date()).toISOString();
	this.gs.achievedAchievements[achId] = dateStr;
	
	this.showAchievedInfo(achId);
  }
  
  showAchievedInfo(achId: number)
  {
	var achiev = null;
	for( var ach of this.gs.achievements)
	{
		if( parseInt(ach.system_id+"") == achId )
		{
			achiev = ach;
			break;
		}
	}
	
	$("#newAchTitle").html(achiev.name);
	$("#newAchIcon").attr("src", achiev.icon);
	
	$("#newAchievement").css("display", "inline");
	
	setTimeout(() => {
      $("#newAchievement").css("display", "none");
    }, 3000);
  }
  
  
  ngOnInit() {
  }

}
