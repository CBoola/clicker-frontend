import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {GameState} from '../gamestate/gamestate';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css'],
  providers: [GameState]
})
export class StructureComponent implements OnInit {

  constructor(private gs: GameState) 
  {    
  }
  
  ngOnInit() {
  }

}
