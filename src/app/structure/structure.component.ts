import {Component, OnInit} from '@angular/core';
import {GameState} from '../gamestate/gamestate';
import {GamesoundsService} from '../gamesounds/gamesounds';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  constructor(public gs: GameState, public snd: GamesoundsService) {
  }

  clicked(index) {
    const structureId = this.gs.structures[index].system_id;
    const price: number = this.priceForLevel(index);
    // console.log(price+" "+onions);
    if (price <= this.gs.onions) {
      this.gs.onions -= price;
      this.gs.numberOfStructures[structureId]++;
      this.gs.statisticsValue.spent_cash += price;

      this.snd.playStructureSound(index);
    }
    this.gs.onionsPerSecond();
  }

  priceForLevel2(structureIndex: number, boughtLevels: number) {
    return Math.round(this.gs.structures[structureIndex].base_prize * Math.pow(1.15, boughtLevels)) * this.gs.appleMultiplier;
  }

  priceForLevel(structureIndex: number) {
    const structureId = this.gs.structures[structureIndex].system_id;
    return this.priceForLevel2(structureIndex, this.gs.numOfStructure(structureId));
  }

  showStructure(index: number) {
    if (index === 0) {
      return true;
    }
    return this.gs.numOfStructure(index) > 0;
  }

  ngOnInit() {
  }

}
