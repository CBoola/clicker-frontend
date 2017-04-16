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

  /*clicked(index) {

  }*/
}
