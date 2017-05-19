import {Injectable, EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import 'jquery';

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

function appleDetection() {
  if (window.navigator.userAgent.indexOf('Mac') !== -1) {
    return true;
  } else if (window.navigator.userAgent.indexOf('iOS') !== -1) {
    return true;
  }
  return false;
}

interface Structure {
  name: String;
  system_id: number;
  icon: String;
  sound: String;
  description: String;
  base_prize: number;
  production_rate: number;
}

interface Upgrade {
  name: String;
  system_id: number;
  icon: String;
  sound: String;
  description: String;
  base_prize: number;
  multiplier: number;
}

interface Achievement {
	system_id: String;
	type: String;
	related_system_id: String;
	name: String;
	description: String;
	icon: String;
	treshold: Number;
}

class Statistics {
  cash_from_clicks = 0;
  number_of_clicks = 0;
  spent_cash = 0;
  collected_cash = 0;
  created_time: String = '';
}

@Injectable()
export class GameState {

  upgrades: Array<Upgrade> = [];
  structures: Array<Structure> = [];
  numberOfStructures = [];
  boughtUpgrades = [];
  statisticsValue: Statistics = new Statistics();
  
  structuresUpdated:EventEmitter<number> = new EventEmitter<number>();
  upgradesUpdated:EventEmitter<number> = new EventEmitter<number>();

  player_id = -1;
  onions = 0;
  onionPerSecond = 0.;
  onionMultiplier = 1.;
  appleMultiplier = 1;
  stateRead = false;

  intervalsPerSecond = 20;

  constructor(private http: Http) {

    this.readPlayerId();

    this.http.get('http://51.255.167.114/api/structure/?format=json')
      .subscribe(data => {
        this.structures = data.json();
		this.structuresUpdated.emit(0);
        this.updateAll();
      });

    this.http.get('http://51.255.167.114/api/upgrade/?format=json')
      .subscribe(data => {
        this.upgrades = data.json();
		this.upgradesUpdated.emit(0);
        this.updateAll();
      });

    setInterval(() => {
      this.addGeneratedOnion();
    }, 1000 / this.intervalsPerSecond);

    setInterval(() => {
      this.sendState();
    }, 30000);

    if (appleDetection()) {
      this.appleMultiplier = 3;
    }

  } // constructor

  addGeneratedOnion() {
    const productionStep = this.onionPerSecond / this.intervalsPerSecond;
    this.onions += productionStep;
    this.statisticsValue.collected_cash += productionStep;
  }

  printOnions(value: number) {
    return this.formatedOnionValue(Math.round(value));
  }

  readPlayerId() {
    this.http.get('http://51.255.167.114/api/player/is_logged')
      .subscribe(data => {
        const res = data.json();
        if (res.hasOwnProperty('player_id')) {
          this.player_id = res.player_id;
          this.readState();
        } else {
          // return;
          this.player_id = 3;
          this.readState();
        }

      });
  }

  readState() {
    this.http.get('http://51.255.167.114/api/player/' + this.player_id + '/?format=json')
      .subscribe(data => {
        const res = data.json();
        if (!res.hasOwnProperty('current_state')) {
          this.onions = 0;
          return;
        }
        // onion number
        this.onions = res.current_state.cash;

        // structures
        res.structures.forEach(str => {
          this.numberOfStructures[parseInt(str.system_id, 10)] = str.amount;
        });

        // upgrades
        res.upgrades.forEach(str => {
          this.boughtUpgrades.push(parseInt(str.system_id, 10));
        });

        // statistics
        const res_statistics = res.statistics;
        this.statisticsValue.number_of_clicks = res_statistics.number_of_clicks;
        this.statisticsValue.cash_from_clicks = res_statistics.cash_from_clicks;
        this.statisticsValue.spent_cash = res_statistics.spent_cash;
        this.statisticsValue.collected_cash = res_statistics.collected_cash;
        this.statisticsValue.created_time = res.created_time;

        this.updateAll();
        this.stateRead = true;
      });
  }

  onionsPerSecond() {
    let onionPerSec = 0;
    for (const str of this.structures) {
      onionPerSec += this.numOfStructure(str.system_id) * str.production_rate;
    }
    this.onionPerSecond = onionPerSec;
  }

  mutiplierValue() {
    let multi = 1;
    for (const upgrade of this.upgrades) {
      if (upgrade.system_id && this.boughtUpgrades.includes(parseInt(upgrade.system_id + '', 10))) {
        multi *= upgrade.multiplier;
      }
    }
    this.onionMultiplier = multi;
    this.onionMultiplier
  }

  numOfStructure(structureId: number) {
    const num = this.numberOfStructures[structureId];
    if (num === undefined) {
      this.numberOfStructures[structureId] = 0;
      return 0;
    }
    return num;
  }

  numOfAllStructures() {
    let number = 0;
    for (const num of this.numberOfStructures) {
      if (num > 0) {
        number += num;
      }
    }
    return number;
  }

  numOfAllUpgrades() {
    return this.boughtUpgrades.length;
  }

  getStartDate() {
    const startDate = new Date(Date.parse(this.statisticsValue.created_time + ''));

    let stringTime = '';
    stringTime += ( startDate.getHours() < 10 ) ? '0' : '';
    stringTime += startDate.getHours() + ':';
    stringTime += ( startDate.getMinutes() < 10 ) ? '0' : '';
    stringTime += startDate.getMinutes();

    let stringDate = '';
    stringDate += ( startDate.getDate() < 10 ) ? '0' : '';
    stringDate += startDate.getDate() + '.';
    stringDate += ( startDate.getMonth() < 10 ) ? '0' : '';
    stringDate += startDate.getMonth() + '.';
    stringDate += startDate.getFullYear();

    return stringDate + ' ' + stringTime;
  }

  updateAll() {
    this.onionsPerSecond();
    this.mutiplierValue();
  }


  sendState() {
    if (!this.stateRead) {
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

    for (const upg of this.boughtUpgrades) {
      const strObj = {
        'system_id': upg + ''
      };
      state.upgrades.push(strObj);
    }

    state.statistics = {};
    state.statistics.collected_cash = parseInt(this.statisticsValue.collected_cash + '', 10);
    state.statistics.cash_from_clicks = this.statisticsValue.cash_from_clicks;
    state.statistics.spent_cash = this.statisticsValue.spent_cash;
    state.statistics.number_of_clicks = this.statisticsValue.number_of_clicks;

    const stateJson = JSON.stringify(state);
    console.log(stateJson);

    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      url: 'http://51.255.167.114/api/player/' + this.player_id + '/?format=json',
      type: 'PATCH',
      crossDomain: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      data: stateJson,
      success: function () {
        // alert('works');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('The following error occured: ' + textStatus, errorThrown);
      }
    });
  }

  formatedOnionValue(input: number) {
    const suffixes = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'kY', 'MY', 'GY', 'TY', 'PY', 'EY', 'ZY', 'YY', 'kYY', 'MYY'];
    const decimals = 2;
    if (input < 1000) {
      return input + '';
    }
    const exp = Math.floor(Math.log(input) / Math.log(1000));
    return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
  }


}
