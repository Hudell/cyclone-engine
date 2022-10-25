import { CustomEventData } from '../../../Shared/CustomEventData';

export class TreeData extends CustomEventData {
  initialize() {
    super.initialize();
    this.name = 'tree';
    this.page.image.direction = 2;
    this.page.image.characterName = '!$tree';
    this.page.image.characterIndex = 0;
    this.page.priorityType = 1;
    this.page.moveFrequency = 5;
    this.page.moveSpeed = 6;
    this.page.walkAnime = false;
    this.page.stepAnime = true;
    this.page.directionFix = true;
    this.page.moveType = 3;
    this.page.animation = {
      framesBetweenChanges: 6,
      list: [
        { pattern: 0, direction: 2 },
        { pattern: 1, direction: 2 },
        { pattern: 2, direction: 2 },
        { pattern: 0, direction: 4 },
      ],
    };

    this.page.callScriptOrCommonEvent('this.character(0).setTreeHitAnimation();');
    this.page.end();

    this.changePage(0);
  }
}