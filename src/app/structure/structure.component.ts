import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {GameState} from '../gamestate/gamestate';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  constructor(public gs: GameState) 
  {    
  }
  
  clicked( index) 
  {
	var structureId = this.gs.structures[index].system_id;
	var price:number = this.priceForLevel(index);
	var onions:number = this.gs.onions;
	//console.log(price+" "+onions);
	if( price <= this.gs.onions )
	{
		this.gs.onions-= price;
		this.gs.numberOfStructures[structureId]++;
	}
	this.onionsPerSecond();
  }

  onionsPerSecond()
  {
	var onionPerSec = 0;
	for (let str of this.gs.structures)
	{
		var structureId = str.system_id;
		var num = this.numberOfStructure(structureId);
		var gen = num * str.production_rate;
		onionPerSec += gen;
	}
	this.gs.onionPerSecond = onionPerSec;
  }
  
  priceForLevel2(structureIndex: number, boughtLevels: number)
  {
	var price = this.gs.structures[structureIndex].base_prize * 1.4 * (boughtLevels+1);
	return price;
  }
  
  priceForLevel(structureIndex: number)
  {
	var structureId = this.gs.structures[structureIndex].system_id;
	var price = this.priceForLevel2(structureIndex, this.numberOfStructure(structureId));
	return price;
  }
  
  numberOfStructure(structureId: number)
  {
	var num = this.gs.numberOfStructures[structureId];
	if( num == undefined )
	{
		this.gs.numberOfStructures[structureId]= 0;
		return 0;
	}
	return num;
  }
  
  ngOnInit() {
  }

}
