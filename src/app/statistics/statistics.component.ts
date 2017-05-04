import { Component, OnInit } from '@angular/core';
import {GameState} from "../gamestate/gamestate";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(public gs: GameState) { }

  ngOnInit() {
  }

}
