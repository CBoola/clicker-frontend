import {Component, OnInit} from '@angular/core';
import {GameState} from '../gamestate/gamestate';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  constructor(public gs: GameState ) {
  }

  //@HostListener('mouseover', ['$event'])
  onMouseover(event: MouseEvent) 
  { 
	console.log("najechganie");
  }
  
  
  ngOnInit() {
  }

}
