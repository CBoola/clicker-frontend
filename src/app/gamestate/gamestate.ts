import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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
	stateReaded = false;
	
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
    
	setInterval(() => {
		this.sendState();
	}, 30000);
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
			this.stateReaded= true;
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
  
 
  sendState()
  {
	if(!this.stateReaded)
		return;
		
	var state:any = {};
	state.current_state= {};
	state.current_state.cash = Math.round(this.onions);
	
	state.structures = [];
	for (var index in this.numberOfStructures) 
	{
        var value = this.numberOfStructures[index];
		// your code goes here
		if(value > 0)
		{
			var strObj = {
				"system_id" : index+"",
				"amount" : value
			}
			state.structures.push(strObj);
		}
	}
	
	var stateJson = JSON.stringify(state);
	//console.log(stateJson);

	$.ajax({
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
			
            url : 'http://51.255.167.114/api/player/3/?format=json',
            type : 'PATCH',
			crossDomain: true,
			beforeSend: function (xhr) {
                         xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
                    },
            data : stateJson,
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        });

  }
}