import {Component, OnInit} from "@angular/core";
import {GameState} from "../gamestate/gamestate";
import {GamesoundsService} from "../gamesounds/gamesounds";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(public gs: GameState, public snd: GamesoundsService) {
  }

  ngOnInit() {
  }

  clicked(index) {
	const upgradeId:number = parseInt(this.gs.upgrades[index].system_id+"");
	if( this.gs.boughtUpgrades.includes(upgradeId)  )
	{
		return;
	}
	const prize = this.boughtPrize( this.gs.upgrades[index].base_prize );
	if( this.gs.onions >= prize )
	{
		this.gs.boughtUpgrades.push(upgradeId);
		this.gs.onions -= prize;
		this.gs.mutiplerValue();
		this.gs.statisticsValue.spent_cash += prize;
		
		this.snd.playUpgradeSound(index);
	}
	
  }
  
  boughtPrize(basePrize: number)
  {
	return basePrize*this.gs.japcokMultipler;
  }
  
  isBoughtById(upgradeId: number)
  {
	return this.gs.boughtUpgrades.includes(parseInt(upgradeId+""));
  }
  
  isBoughtByIndex(index: number)
  {
	const upgradeId = this.gs.upgrades[index].system_id;
	return this.isBoughtById(upgradeId);
  }
  
  showUpgrade(index: number)
  {
	if(index == 0)
		return true;
	return this.isBoughtByIndex(index-1);
  }
  
}
