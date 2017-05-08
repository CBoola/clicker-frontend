import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function japcokDetection()
{
	if( window.navigator.userAgent.indexOf("Mac") != -1 )
		return true;
	if( window.navigator.userAgent.indexOf("iOS") != -1 )
		return true;
	return false;
}

interface Structure {
  name: String;
  system_id: number;
  icon: String;
  description: String;
  base_prize: number;
  production_rate: number;
}

interface Upgrade {
  name: String;
  system_id: number;
  icon: String;
  description: String;
  base_prize: number;
  multiplier: number;
}

class Statistics
{
	cach_from_clicks: number = 0;
    number_of_clicks: number = 0;
    spent_cash: number =  0;
    collected_cash: number = 0;
	created_time: String = "";
}

@Injectable()
export class GameState {

  upgrades: Array<Upgrade> = [];
  structures: Array<Structure> = [];
  numberOfStructures = [];
  boughtUpgrades = [];
  statisticsValue: Statistics = new Statistics();
  
  player_id = -1;
  onions = 0;
  onionPerSecond = 0.;
  onionMultipler = 1.;
  japcokMultipler = 1;
  stateReaded = false;

  intervalsPerSecond = 20;

  constructor(private http: Http) 
  {

    this.readPlayerId();

    this.http.get('http://51.255.167.114/api/structure/?format=json')
      .subscribe(data => {
        this.structures = data.json();
        this.updateAll();
      });

    this.http.get('http://51.255.167.114/api/upgrade/?format=json')
      .subscribe(data => {
        this.upgrades = data.json();
        this.updateAll();
      });

    setInterval(() => {
      this.addGeneratedOnion();
    }, 1000 / this.intervalsPerSecond);

    setInterval(() => {
      this.sendState();
    }, 30000);
	
	if( japcokDetection() )
		this.japcokMultipler= 3;
	
  }//constructor
  
  addGeneratedOnion() {
    var productionStep = this.onionPerSecond / this.intervalsPerSecond
	this.onions += productionStep;
	this.statisticsValue.collected_cash += productionStep;
  }

  printOnions(value: number) {
    return Math.round(value);
  }

	readPlayerId()
	{
	  this.http.get('http://51.255.167.114/api/player/is_logged')
      .subscribe(data => {
        const res = data.json();
        if (res.hasOwnProperty('player_id')) 
		{
			this.player_id = res.player_id;
			this.readState();
		}
		else
		{
          //return;
		  this.player_id = 3;
		  this.readState();
        }
         
      });
	}
  
  readState() {
    this.http.get('http://51.255.167.114/api/player/'+this.player_id+'/?format=json')
      .subscribe(data => {
        const res = data.json();
        if (!res.hasOwnProperty('current_state')) {
		  this.onions= 0;
          return;
        }
        // onion number
        this.onions = res.current_state.cash;

        // structures
        const res_structures = res.structures;
        res_structures.forEach(str => {
          this.numberOfStructures[parseInt(str.system_id, 10)] = str.amount;
        });

        // upgrades
		const res_upgrades = res.upgrades;
		res_upgrades.forEach(str => {
          this.boughtUpgrades.push( parseInt(str.system_id) );
        });
		
		//statistics
		const res_statistics = res.statistics;
		this.statisticsValue.number_of_clicks = res_statistics.number_of_clicks;
		this.statisticsValue.cach_from_clicks = res_statistics.cach_from_clicks;
		this.statisticsValue.spent_cash = res_statistics.spent_cash;
		this.statisticsValue.collected_cash = res_statistics.collected_cash;
		this.statisticsValue.created_time = res.created_time;
		
        this.updateAll();
        this.stateReaded = true;
      });
  }

  onionsPerSecond() {
    let onionPerSec = 0;
    for (const str of this.structures) {
      const structureId = str.system_id;
      const num = this.numOfStructure(structureId);
      onionPerSec += num * str.production_rate;
    }
    this.onionPerSecond = onionPerSec;
  }

  mutiplerValue(){
	let mult = 1;
	for(const upg of this.upgrades)
	{
		if( !upg.hasOwnProperty("system_id") )
			continue;
		const upgradeId = upg.system_id;
		if( this.boughtUpgrades.includes( parseInt(upgradeId+"")  ) )
		{
			mult *= upg.multiplier;
		}
		
	}
	this.onionMultipler = mult;
  }
  
  numOfStructure(structureId: number) {
    const num = this.numberOfStructures[structureId];
    if (num === undefined) {
      this.numberOfStructures[structureId] = 0;
      return 0;
    }
    return num;
  }
  
  numOfAllStructures()
  {
	var number = 0;
	for(let num of this.numberOfStructures )
	{
		if( num > 0)
			number += num;
	}
	return number;
  }
  
  numOfAllUpgrades()
  {
	return this.boughtUpgrades.length;
  }
  
  getStartDate()
  {
	var startDate =new Date(Date.parse(this.statisticsValue.created_time+""));

	var stringTime = "";
	stringTime += ( startDate.getHours() < 10 ) ? "0" : "";
	stringTime += startDate.getHours()+":";
	stringTime += ( startDate.getMinutes() < 10 ) ? "0" : "";
	stringTime += startDate.getMinutes();
	
	var stringDate = "";
	stringDate += ( startDate.getDate() < 10 ) ? "0" : "";
	stringDate += startDate.getDate()+".";
	stringDate += ( startDate.getMonth() < 10 ) ? "0" : "";
	stringDate += startDate.getMonth()+".";
	stringDate += startDate.getFullYear();
	
	return stringDate+" "+stringTime;
  }
  
  updateAll() {
    this.onionsPerSecond();
	this.mutiplerValue();
  }


  sendState() {
    if (!this.stateReaded) {
      return;
    }

    const state: any = {};
    state.current_state = {};
    state.current_state.cash = Math.round(this.onions);

    state.structures = [];
	state.upgrades = [];

    for (const index in this.numberOfStructures) {
      const value = this.numberOfStructures[index];
      // your code goes here

      if (value > 0) {
        const strObj = {
          'system_id': index + '',
          'amount': value
        };
        state.structures.push(strObj);
      }
    }

	for(const upg of this.boughtUpgrades)
	{
		const strObj = {
          'system_id': upg + ''
        };
		state.upgrades.push(strObj);
	}
	
	state.statistics = {};
	state.statistics.collected_cash = parseInt(this.statisticsValue.collected_cash+"");
	state.statistics.cach_from_clicks = this.statisticsValue.cach_from_clicks;
	state.statistics.spent_cash = this.statisticsValue.spent_cash;
	state.statistics.number_of_clicks = this.statisticsValue.number_of_clicks;
	
    const stateJson = JSON.stringify(state);
    console.log(stateJson);

    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      url: 'http://51.255.167.114/api/player/'+this.player_id+'/?format=json',
      type: 'PATCH',
      crossDomain: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      data: stateJson,
      success: function () {
        //alert('works');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('The following error occured: ' + textStatus, errorThrown);
      }
    });
  }
}
