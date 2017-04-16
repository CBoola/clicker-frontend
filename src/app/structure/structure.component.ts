import {Component, OnInit} from "@angular/core";
import {GameState} from "../gamestate/gamestate";

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  constructor(public gs: GameState) {
  }

  clicked(index) {
    const structureId = this.gs.structures[index].system_id;
    const price: number = this.priceForLevel(index);
    // console.log(price+" "+onions);
    if (price <= this.gs.onions) {
      this.gs.onions -= price;
      this.gs.numberOfStructures[structureId]++;
    }
    this.gs.onionsPerSecond();
  }

  priceForLevel2(structureIndex: number, boughtLevels: number) {
    return Math.round(this.gs.structures[structureIndex].base_prize * Math.pow(1.15, boughtLevels));
  }

  priceForLevel(structureIndex: number) {
    const structureId = this.gs.structures[structureIndex].system_id;
    return this.priceForLevel2(structureIndex, this.gs.numOfStructure(structureId));
  }

  ngOnInit() {
  }

}
