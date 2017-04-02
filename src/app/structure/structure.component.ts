import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {GameState} from '../gamestate/gamestate';

/*
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
*/



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
