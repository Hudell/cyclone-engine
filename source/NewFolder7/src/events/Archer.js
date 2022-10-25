import { TroopData } from './Troop';

export class ArcherData extends TroopData {
  initialize() {
    super.initialize();
    this.name = 'archer';
    this.page.image.characterName = 'Troops/Archer[8,7]/Archer_Blue';
  }

}