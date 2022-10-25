import { CustomEventData } from '../../../Shared/CustomEventData';

export class TroopData extends CustomEventData {
  initialize(color) {
    super.initialize();
    this.page.image.direction = 2;
    this.page.image.characterIndex = 0;
    this.page.priorityType = 1;
    this.page.moveFrequency = 5;
    this.page.moveSpeed = 4;
    this.page.walkAnime = false;
    this.page.stepAnime = true;
    this.page.directionFix = true;
    this.page.moveType = 3;
    if (color === 'blue') {
      this.page.callScriptOrCommonEvent('this.character(0).selectTroop();');
      this.page.end();
    }
    this.animation = {
      framesBetweenChanges: 6,
      list: [
        { pattern: 0 },
        { pattern: 1 },
        { pattern: 2 },
        { pattern: 3 },
        { pattern: 4 },
        { pattern: 5 },
      ]
    };
    this.yOffset = 64;
  }
}