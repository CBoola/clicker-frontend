import {Component, OnInit} from '@angular/core';
import {GameState} from '../gamestate/gamestate';
import {GamesoundsService} from '../gamesounds/gamesounds';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  constructor(public gs: GameState, public snd: GamesoundsService) {

    this.gs.structureBought.subscribe(val => {
      this.boughtStructure(val);
    });
    this.gs.upgradeBought.subscribe(val => {
      this.boughtUpgrade(val);
    });

    setInterval(() => {
      this.onionsState();
    }, 1000);
  }

  isAchieved(index: number) {
    return (this.gs.dateOfAchievement(parseInt(this.gs.achievements[index].system_id + '', 10)) !== '');
  }

  achievementDate(index: number) {
    return this.gs.getFormattedDate(this.gs.dateOfAchievement(parseInt(this.gs.achievements[index].system_id + '', 10)));
  }

  onMouseover(event: MouseEvent, index: number) {
    const isAch = this.isAchieved(index);
    if (!isAch) {
      return;
    }

    $('#infoBox').css('display', 'inline');
    $('#infoTitle').html((isAch) ? this.gs.achievements[index].name + '' : '?????????');
    // $("#infoDescription").html( (isAch)? this.gs.achievements[index].description+"" : "?????");
    $('#infoDate').html((isAch) ? 'Zdobyto: ' + this.achievementDate(index) : '');
  }

  onMouseout(event: MouseEvent) {
    $('#infoBox').css('display', 'none');
  }

  onMousemove(event: MouseEvent) {
    const offset = $('#achievementsMain').offset();
    const infoBox = $('#infoBox');

    infoBox.css('left', event.pageX - offset.left - parseInt(infoBox.css('width'), 10) / 2);
    infoBox.css('top', event.pageY - offset.top - 90);
  }

  boughtStructure(structureId: number) {
    const structNum = this.gs.numOfStructure(structureId);

    for (const ach of this.gs.achievements) {
      const achId = parseInt(ach.system_id + '', 10);
      if (this.gs.dateOfAchievement(achId) !== '') { // gained achievement
        continue;
      }

      if (ach.type === 'BOUGHT_STRUCTURES') {
        if (parseInt(ach.related_system_id + '', 10) === structureId) {
          if (structNum >= ach.threshold) {
            this.gainAchievement(achId);
          }
        }
      } else if (ach.type === 'SPENT_CASH') {
        if (this.gs.statisticsValue.spent_cash >= ach.threshold) {
          this.gainAchievement(achId);
        }
      }
    }
  }

  boughtUpgrade(upgradeId: number) {

    for (const ach of this.gs.achievements) {
      const achId = parseInt(ach.system_id + '', 10);
      if (this.gs.dateOfAchievement(achId) !== '') { // gained achievement
        continue;
      }

      if (ach.type === 'SPENT_CASH') {
        if (this.gs.statisticsValue.spent_cash >= ach.threshold) {
          this.gainAchievement(achId);
        }
      }
    }
  }

  structureNameFilter(name: string) {
    if (name.length <= 12) {
      return name;
    }
    return name.substr(0, 10) + '.';
  }

  onionsState() {
    for (const ach of this.gs.achievements) {
      const achId = parseInt(ach.system_id + '', 10);
      if (this.gs.dateOfAchievement(achId) !== '') { // gained achievement
        continue;
      }

      if (ach.type === 'MAXIMUM_CASH') {
        if (this.gs.onions >= ach.threshold) {
          this.gainAchievement(achId);
        }
      }
    }
  }

  gainAchievement(achId: number) {
    // console.log(achId);
    this.gs.achievedAchievements[achId] = (new Date()).toISOString();

    this.showAchievedInfo(achId);
  }

  showAchievedInfo(achId: number) {
    let achiev = null;
    for (const ach of this.gs.achievements) {
      if (parseInt(ach.system_id + '', 10) === achId) {
        achiev = ach;
        break;
      }
    }

    $('#newAchTitle').html(achiev.name);
    $('#newAchIcon').attr('src', achiev.icon);

    $('#newAchievement').css('display', 'inline');

    setTimeout(() => {
      $('#newAchievement').css('display', 'none');
    }, 3000);

    this.snd.playAchievementSound();
  }


  ngOnInit() {
  }

}
