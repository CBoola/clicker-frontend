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

@Injectable()
export class GameState {

  upgrades: Array<Upgrade> = [];
  structures: Array<Structure> = [];
  numberOfStructures = [];

  player_id = -1;
  onions = 0;
  onionPerSecond = 0.;
  onionMultipler = 1.;
  stateReaded = false;

  intervalsPerSecond = 20;

  constructor(private http: Http) {

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
  }

  addGeneratedOnion() {
    this.onions += this.onionPerSecond / this.intervalsPerSecond;
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

  numOfStructure(structureId: number) {
    const num = this.numberOfStructures[structureId];
    if (num === undefined) {
      this.numberOfStructures[structureId] = 0;
      return 0;
    }
    return num;
  }

  updateAll() {
    this.onionsPerSecond();
  }


  sendState() {
    if (!this.stateReaded) {
      return;
    }

    const state: any = {};
    state.current_state = {};
    state.current_state.cash = Math.round(this.onions);

    state.structures = [];

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

    const stateJson = JSON.stringify(state);
    // console.log(stateJson);

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
        alert('works');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('The following error occured: ' + textStatus, errorThrown);
      }
    });
  }
}
