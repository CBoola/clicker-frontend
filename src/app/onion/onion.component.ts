import { Component, OnInit } from '@angular/core';
import {GameState} from '../gamestate/gamestate';

@Component({
  selector: 'app-onion',
  templateUrl: './onion.component.html',
  styleUrls: ['./onion.component.css'],
  providers: [GameState]
})
export class OnionComponent implements OnInit {

  constructor(private gs: GameState) {

  }

  clicked(event) {
	this.gs.onions++;
  }
  
  ngOnInit() {
  }

}
