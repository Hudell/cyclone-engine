import { TroopData } from './Troop';

export class WarriorData extends TroopData {
  initialize(color) {
    super.initialize(color);
    this.name = 'warrior';

    switch (color) {
      case 'red':
        this.page.image.characterName = 'Troops/Warrior[6,8]/Warrior_Red';
        break;
      case 'yellow':
        this.page.image.characterName = 'Troops/Warrior[6,8]/Warrior_Yellow';
        break;
      case 'purple':
        this.page.image.characterName = 'Troops/Warrior[6,8]/Warrior_Purple';
        break;
      default:
        this.page.image.characterName = 'Troops/Warrior[6,8]/Warrior_Blue';
        break;
    }

  }

}