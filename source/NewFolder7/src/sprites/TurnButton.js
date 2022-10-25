import { TEAMS } from '../consts';

export class TurnButton extends Sprite_Button {
  update() {
    super.update(this);

    this.visible = CycloneNewFolder7.currentTeam === TEAMS.blue;
  }
}
