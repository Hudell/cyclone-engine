import { CustomEventData } from '../../../Shared/CustomEventData';

export class TowerData extends CustomEventData {
  initialize(color) {
    super.initialize();
    this.name = 'tower';
    this.color = color;
    switch(color) {
      case 'purple':
        this.page.image.direction = 4;
        break;
      case 'red':
        this.page.image.direction = 6;
        break;
      case 'yellow':
        this.page.image.direction = 8;
        break;
      default:
        this.page.image.direction = 2;
        break;
    }
    this.page.image.characterName = '!$tower';
    this.page.image.characterIndex = 0;
    this.page.image.pattern = 1;
    this.page.priorityType = 1;
    this.page.moveFrequency = 5;
    this.page.moveSpeed = 4;
    this.page.walkAnime = false;
    this.page.stepAnime = false;
    this.page.directionFix = true;
    this.page.moveType = 0;
    this.yOffset = 20;
    this.xOffset = 32;
  }
}