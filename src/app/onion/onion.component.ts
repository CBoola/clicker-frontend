import {Component, OnInit} from '@angular/core';
import {GameState} from '../gamestate/gamestate';

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
    this.gs.onions += this.gs.onionMultiplier;
    this.gs.statisticsValue.number_of_clicks++;
    this.gs.statisticsValue.collected_cash += this.gs.onionMultiplier;
    this.gs.statisticsValue.cash_from_clicks += this.gs.onionMultiplier;

    const posX = event.pageX + 20;
    const posY = event.pageY - 20;

    this.body.append($('<div style="top:' + posY + 'px;left:' + posX + 'px" class="plusLabel noselect jumpOut">' +
      '<img class="plusClick" src="assets/plus.svg" />' + this.gs.formatedOnionValue(this.gs.onionMultiplier) + '</div>')
      .one('translateend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
        $(this).remove();
      }));
  }

  ngOnInit() {
  }

}
