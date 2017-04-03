import { Component, OnInit } from '@angular/core';
import {GameState} from '../gamestate/gamestate';
import * as $ from 'jquery';

@Component({
  selector: 'app-onion',
  templateUrl: './onion.component.html',
  styleUrls: ['./onion.component.css']
})
export class OnionComponent implements OnInit {

  constructor(public gs: GameState) {
 
  }

  clicked(event) {
	this.gs.onions+= this.gs.onionMultipler;
  }
  mousedown(event) {
	$("#mainOnion").css("width", 610).css("height", 610).css("left", 0).css("top", 0);
  }
  mouseup(event){
	$("#mainOnion").css("width", 600).css("height", 600).css("left", 5).css("top", 5);
  }
  
  ngOnInit() {
  }

}
