import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

interface Structure
{
	name:String;
	system_id:number;
	icon:String;
	description:String;
	base_prize:number;
	production_rate:number;
}

@Injectable()
export class GameState {

	structures:Array<Structure> = [];

  constructor(private http: Http) 
  { 

	this.http.get('http://51.255.167.114/api/structure/?format=json')
		.subscribe(data => this.structures = data.json() );
		
	//Console.log("aaaa");
    
  }
}