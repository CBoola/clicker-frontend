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
	numberOfStructures = [];
	onions:number = 0;
	onionPerSecond:number = 0;
	onionMultipler = 1;
	
	intervalsPerSecond = 20;

  constructor(private http: Http) 
  { 

	this.readState();
  
	this.http.get('http://51.255.167.114/api/structure/?format=json')
		.subscribe(data => {
			this.structures = data.json() 
			this.updateAll();
		});
		
	setInterval(() => {
                this.addGeneratedOnion(); 
                }, 1000 / this.intervalsPerSecond);
    
  }
  
  addGeneratedOnion()
  {
	this.onions += this.onionPerSecond / this.intervalsPerSecond;
  }
  
  printOnions(value:number)
  {
	var num = Math.round(value);
	return num;
  }
  
  readState()
  {
	this.http.get('http://51.255.167.114/api/player/3/?format=json')
		.subscribe(data => {
			var res = data.json();
			if(!res.hasOwnProperty("current_state"))
			{
				return;
			}
			//onion number
			var res_onion =  res.current_state.cash;
			this.onions = res_onion;
			
			//structures
			var res_structures = res.structures;
			res_structures.forEach( str => {
				this.numberOfStructures[ parseInt(str.system_id) ] = str.amount;
			
			});
			this.updateAll();
		} );
  }
  
  onionsPerSecond()
  {
	var onionPerSec = 0;
	for (let str of this.structures)
	{
		var structureId = str.system_id;
		var num = this.numOfStructure(structureId);
		var gen = num * str.production_rate;
		onionPerSec += gen;
	}
	this.onionPerSecond = onionPerSec;
  }
  
  numOfStructure(structureId: number)
  {
	var num = this.numberOfStructures[structureId];
	if( num == undefined )
	{
		this.numberOfStructures[structureId]= 0;
		return 0;
	}
	return num;
  }
  
  updateAll()
  {
	this.onionsPerSecond();
  }
}