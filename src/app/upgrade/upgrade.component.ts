import {Component, OnInit} from "@angular/core";
import {GameState} from "../gamestate/gamestate";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(public gs: GameState) {
  }

  ngOnInit() {
  }

  clicked(index) {
	const upgradeId = this.gs.structures[index].system_id;
	if( this.gs.boughtUpgrades.includes(upgradeId)  )
	{
		return;
	}
	const prize = this.gs.structures[index].base_prize;
	if( this.gs.onions >= prize )
	{
		this.gs.boughtUpgrades.push(upgradeId);
		this.gs.onions -= prize;
		this.gs.mutiplerValue();
	}
	
  }
  
  isBoughtById(upgradeId: number)
  {
	return this.gs.boughtUpgrades.includes(upgradeId);
  }
  
  isBoughtByIndex(index: number)
  {
	const upgradeId = this.gs.structures[index].system_id;
	return this.isBoughtById(upgradeId);
  }
  
  displayBought(upgradeId: number)
  {
	if( this.isBoughtById(upgradeId) )
		return "style=\"display: inline\"";
	else
		return "style=\"display: none\"";
  }
  
}
