import {Component, OnInit} from "@angular/core";
import {GameState} from "../gamestate/gamestate";
import * as $ from "jquery";

@Component({
  selector: 'app-onion',
  templateUrl: './onion.component.html',
  styleUrls: ['./onion.component.css']
})

export class OnionComponent implements OnInit {

  body: JQuery = $('body');

  constructor(public gs: GameState) {
  }

  clicked(event) {
    this.gs.onions += this.gs.onionMultipler;
    const posX = event.pageX + 10;
    const posY = event.pageY - 20;

    this.body.append($('<div style="top:' + posY + 'px;left:' + posX + 'px" step="0" startX="' + posX +
      '" startY="' + posY + '" class="plusLabel noselect"><img class="plusClick" src="assets/plus.svg" />' +
      this.gs.onionMultipler + '</div>'));

  }

  /*
   mousedown(event) {
   $("#mainOnion").css("width", 610).css("height", 610).css("left", 0).css("top", 0);
   }

   mouseup(event) {
   $("#mainOnion").css("width", 600).css("height", 600).css("left", 5).css("top", 5);
   }*/

  ngOnInit() {
  }

}
