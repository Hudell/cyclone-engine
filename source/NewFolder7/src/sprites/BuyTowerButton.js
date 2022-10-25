import { TurnButton } from './TurnButton';

export class BuyTowerButton extends TurnButton {
  updateFrame() {
    if (CycloneNewFolder7.gold >= CycloneNewFolder7.getTowerPrice('blue')) {
      return super.updateFrame(this);
    }

    this.setFrame(0, 48, 48, 48);
  }
}