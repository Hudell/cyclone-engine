import { TroopData } from './Troop';

export class PawnData extends TroopData {
  initialize() {
    super.initialize();
    this.name = 'pawn';
    this.page.image.characterName = 'Troops/Pawn[6,6]/Pawn_Blue';
  }

}